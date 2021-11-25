import { Post, User } from "@prisma/client";
import { LoaderFunction, MetaFunction, redirect, useLoaderData } from "remix";
import PostCard from "../../components/PostCard";
import { db } from "~/utils/db.server";

type LoaderData = { profile: User & { posts: (Post & { User: User })[] } };

export let loader: LoaderFunction = async ({ params, request }) => {
  const username = params.username;
  if (!username) {
    return redirect("/");
  }
  const profile = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      avatar: true,
      createdAt: true,
      email: true,
      id: true,
      updatedAt: true,
      username: true,
      posts: {
        include: {
          User: true,
        },
        take: 10,
      },
    },
  });
  if (!profile) {
    return redirect("/");
  }

  const data: LoaderData = {
    profile,
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

interface Props {}

const User = (props: Props) => {
  const { profile } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1 className="text-2xl mb-4 border-b pb-4">{profile.username}</h1>
      <div className="space-y-4">
        {profile.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default User;
