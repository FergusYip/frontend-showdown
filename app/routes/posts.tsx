import { Post } from "@prisma/client";
import { LoaderFunction } from "@remix-run/server-runtime";
import { db } from "~/utils/db.server";

export type UserPostsResponse = Post[];

export let loader: LoaderFunction = async ({ request }): Promise<Response | UserPostsResponse> => {
  const url = new URL(request.url);
  const afterId = Number(url.searchParams.get("afterPost"));
  const afterTime = url.searchParams.get("afterTime");
  const username = url.searchParams.get("user");

  if (!afterId) return [];

  const posts = await db.post.findMany({
    where: {
      User: {
        username: username ?? undefined,
      },
      createdAt: afterTime
        ? {
            lt: afterTime,
          }
        : undefined,
    },
    cursor: {
      id: afterId - 1,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};
