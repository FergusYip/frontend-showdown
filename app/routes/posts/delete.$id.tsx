import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/auth.server";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = () => redirect("/");

export type DeletePostResponse = { ok: boolean };

export let action: ActionFunction = async ({
  request,
  params,
}): Promise<Response | DeletePostResponse> => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Error("Not authenticated");
  }

  const form = await request.formData();
  const location = form.get("location");
  if (typeof location !== "string") {
    throw new Error("Form not submitted correctly.");
  }

  const postId = Number(params.id);
  if (!postId) {
    throw new Error("No post ID");
  }

  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    return redirect(location ?? "/");
    // throw new Error("Post doesn't exist")
  }

  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    return redirect(location ?? "/");
    // throw new Error("Could not delete post");
  }

  return redirect(location ?? "/");
};
