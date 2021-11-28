import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/auth.server";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = () => redirect("/");

export type EditPostResponse = {
  formError?: string;
  fieldErrors?: {
    content: string | undefined;
  };
  fields?: {
    content: string;
  };
};

export let action: ActionFunction = async ({
  request,
  params,
}): Promise<Response | EditPostResponse> => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Error("Not authenticated");
  }

  const postId = Number(params.id);
  if (!postId) {
    throw new Error("No post ID");
  }

  let form = await request.formData();
  let content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof content !== "string") {
    return { formError: `Form not submitted correctly.` };
  }

  const fields = { content };
  if (!content.trim().length) {
    return {
      fields,
      fieldErrors: { content: "Post cannot be empty" },
    };
  }

  try {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        content: content.trim(),
        userId: user.id,
      },
    });
  } catch (error) {
    throw new Error("Could not edit post");
  }

  return redirect("/");
};
