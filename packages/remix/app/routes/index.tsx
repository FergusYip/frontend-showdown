import { ActionFunction, LoaderFunction, MetaFunction, useActionData } from "remix";
import { useLoaderData } from "remix";
import NewPostSection from "../components/NewPostSection";
import PostCard from "../components/PostCard";
import { db } from "~/utils/db.server";
import type { Post } from "@prisma/client";

type LoaderData = { posts: Array<Post> };

export let loader: LoaderFunction = async () => {
  return {
    posts: await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  };
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
  let data = useLoaderData<LoaderData>();

  return (
    <div>
      <main>
        <NewPostSection submissionError={actionData?.fieldErrors?.content} />
        <div className="space-y-4">
          {data.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
