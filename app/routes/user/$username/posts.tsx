import { Post } from "@prisma/client";
import { LoaderFunction } from "@remix-run/server-runtime";
import { db } from "~/utils/db.server";

export type UserPostsResponse = Post[];

export let loader: LoaderFunction = async ({
  params,
  request,
}): Promise<Response | UserPostsResponse> => {
  const username = params.username;
  if (!username) return [];

  const url = new URL(request.url);
  const afterId = Number(url.searchParams.get("after"));

  if (!afterId) return [];

  const posts = await db.post.findMany({
    where: {
      User: {
        username,
      },
    },
    cursor: {
      id: afterId + 1,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};
