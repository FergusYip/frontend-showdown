import type { Post, User } from "@prisma/client";
import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import PostCard from "../components/PostCard";

type LoaderData = { posts: Array<Post & { User: User }> };

export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    posts: await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        User: true,
      },
    }),
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
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div>
      <main>
        <Outlet />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
