import { ActionFunction, Form, LoaderFunction, MetaFunction, useActionData } from "remix";
import { useLoaderData } from "remix";
import NewPostSection from "../components/NewPostSection";
import PostCard from "../components/PostCard";
import { db } from "~/utils/db.server";
import type { Post, User } from "@prisma/client";
import { authenticator } from "~/auth.server";

type LoaderData = { posts: Array<Post & { User: User }>; user?: User };

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {});

  const data: LoaderData = {
    posts: await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        User: true,
      },
    }),
    user: user ?? undefined,
  };
  return data;
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    content: string | undefined;
  };
  fields?: {
    content: string;
  };
};

export let action: ActionFunction = async ({ request }): Promise<Response | ActionData> => {
  const user = await authenticator.isAuthenticated(request, {});

  if (!user) {
    throw new Error("Not authenticated");
  }

  let form = await request.formData();
  let content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof content !== "string") {
    return { formError: `Form not submitted correctly.` };
  }

  const fields = { content };
  if (!content.trim().length) {
    return {
      fields,
      fieldErrors: { content: "Post cannot be empty" },
    };
  }

  await db.post.create({
    data: {
      content: content.trim(),
      userId: user.id,
    },
  });
  return {};
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const actionData = useActionData<ActionData | undefined>();
  const { user, posts } = useLoaderData<LoaderData>();

  return (
    <div>
      <main>
        {user && <NewPostSection submissionError={actionData?.fieldErrors?.content} />}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
