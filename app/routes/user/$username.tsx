import { Post, User } from "@prisma/client";
import { LoaderFunction, MetaFunction, redirect, useLoaderData } from "remix";
import PostCard from "../../components/PostCard";
import { db } from "~/utils/db.server";
import { authenticator } from "../../auth.server";

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

  return (
    <main>
      <h1 className="text-2xl mb-4 border-b pb-4">{profile.username}</h1>
      <div className="space-y-4">
        {profile.posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>
    </main>
  );
};

export default User;
