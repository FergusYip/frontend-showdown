import type { User } from "@prisma/client";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { authenticator } from "~/auth.server";
import { db } from "~/utils/db.server";

type LoaderData = { user?: User };

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {});

  const data: LoaderData = {
    user: user ?? undefined,
  };
  return data;
};

export type NewPostResponse = {
  formError?: string;
  fieldErrors?: {
    content: string | undefined;
  };
  fields?: {
    content: string;
  };
};

export let action: ActionFunction = async ({ request }): Promise<Response | NewPostResponse> => {
  const user = await authenticator.isAuthenticated(request);

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
  return redirect("/home");
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
  const { user } = useLoaderData<LoaderData>();
  const transition = useTransition();
  const actionData = useActionData<NewPostResponse | undefined>();

  const error = actionData?.fieldErrors?.content;

  if (!user) {
    return null;
  }

  return (
    <div className="my-4">
      <div className="w-full rounded-md border p-4 shadow-md">
        <Form id="new-post" method="post">
          <label>
            <h2 className="text-lg font-semibold mb-4">New Post</h2>
            <textarea
              id="content"
              className={`border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none focus:ring-2 focus:border-transparent ${
                error ? "ring-2 ring-red-500" : "focus:ring-indigo-500 "
              }`}
              name="content"
              rows={4}
            />
            {error && <div className="text-red-500 px-1">{error}</div>}
          </label>
        </Form>
        <div className="flex justify-end mt-2 space-x-2">
          <a href="/home">
            <button className="text-base py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200">
              Cancel
            </button>
          </a>
          <button
            className="text-base py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 disabled:opacity-75"
            type="submit"
            disabled={Boolean(transition.submission)}
            form="new-post"
          >
            {transition.submission ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
