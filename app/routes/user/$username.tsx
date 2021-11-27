import { Post, User } from "@prisma/client";
import { useState } from "react";
import { LoaderFunction, MetaFunction, redirect, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { authenticator } from "../../auth.server";
import PostCard from "~/components/PostCard";

type LoaderData = {
  profile: User & {
    posts: (Post & {
      User: User;
    })[];
  };
  user?: User;
};

export let loader: LoaderFunction = async ({ params, request }) => {
  const username = params.username;
  if (!username) {
    return redirect("/");
  }

  const getProfile = db.user.findUnique({
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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const [profile, user] = await Promise.all([getProfile, authenticator.isAuthenticated(request)]);

  if (!profile) {
    return redirect("/");
  }

  const data: LoaderData = {
    profile,
    user: user ?? undefined,
  };
  return data;
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = ({ data }) => {
  const { profile } = data as LoaderData;
  return {
    title: `${profile.username} @ Ritter`,
    description: `Ritter profile of ${profile.username}`,
  };
};

const User = () => {
  const { profile, user } = useLoaderData<LoaderData>();
  const [posts, setPosts] = useState(profile.posts);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const fetchMorePosts = () => {
    if (posts.length) {
      fetch(`/posts?user=${profile.username}&after=${posts[posts.length - 1].id}`)
        .then((res) => res.json())
        .then((newPosts: Post[]) => {
          setPosts((prev) => [...prev, ...newPosts.map((p: Post) => ({ ...p, User: profile }))]);
          if (newPosts.length < 10) {
            setCanLoadMore(false);
          }
        });
    }
  };

  return (
    <main>
      <h1 className="text-2xl mb-4 border-b pb-4">{profile.username}</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>
      {posts && canLoadMore && (
        <div className="flex justify-center mt-6">
          <button
            className="text-sm px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
            onClick={fetchMorePosts}
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
};

export default User;
