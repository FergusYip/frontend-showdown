import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/auth.server";
import { db } from "~/utils/db.server";
import { NewPostResponse } from "./home/post";

export let loader: LoaderFunction = () => redirect("/");

export let action: ActionFunction = async ({
  request,
  params,
}): Promise<Response | NewPostResponse> => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Error("Not authenticated");
  }

  const postId = Number(params.id);
  if (!postId) {
    throw new Error("No post ID");
  }

  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    throw new Error("Could not delete post");
  }

  return redirect("/home");
};
