import type { Post, User } from "@prisma/client";
import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { authenticator } from "../auth.server";
import PostCard from "../components/PostCard";

type LoaderData = { posts: Array<Post & { User: User }>; user?: User };

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

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

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { posts, user } = useLoaderData<LoaderData>();

  return (
    <div>
      <main>
        <Outlet />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
}
