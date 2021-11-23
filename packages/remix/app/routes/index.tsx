import type { LoaderFunction, MetaFunction } from "remix";
import { useLoaderData } from "remix";
import NewPostSection from "../components/NewPostSection";
import PostCard from "../components/PostCard";
import { db } from "~/utils/db.server";
import type { Post } from "@prisma/client";

type LoaderData = { posts: Array<Post> };

export let loader: LoaderFunction = async () => {
  return {
    posts: await db.post.findMany(),
  };
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
  let data = useLoaderData<LoaderData>();

  return (
    <div>
      <main>
        <NewPostSection />
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
}
