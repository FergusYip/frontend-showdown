import type { User } from "@prisma/client";
import { Form, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { authenticator } from "~/auth.server";

type LoaderData = { user?: User };

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {});

  const data: LoaderData = {
    user: user ?? undefined,
  };
  return data;
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

  if (!user) {
    return null;
  }
  return (
    <div className="flex justify-end mb-4">
      <Form action="/home/post" method="get">
        <button className="text-sm px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200">
          New Post
        </button>
      </Form>
    </div>
  );
}
