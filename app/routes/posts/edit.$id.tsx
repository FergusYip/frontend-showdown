import { Post } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/auth.server";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = () => redirect("/");

type EditPostSuccess = {
  post: Post;
  ok: true;
};
type EditPostError = {
  formError?: string;
  fieldErrors?: {
    content: string | undefined;
  };
  fields?: {
    content: string;
  };
  ok: false;
};

export type EditPostResponse = EditPostSuccess | EditPostError;

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
    return { ok: false, formError: `Form not submitted correctly.` };
  }

  const trimmedContent = content.trim();
  const fields = { content };
  if (!trimmedContent.length) {
    return {
      ok: false,
      fields,
      fieldErrors: { content: "Post cannot be empty" },
    };
  }

  const uneditedPost = await db.post.findUnique({ where: { id: postId } });
  if (!uneditedPost) {
    throw new Error("Invalid post");
  }

  if (uneditedPost.content === trimmedContent) {
    return { ok: true, post: uneditedPost };
  }

  try {
    const post = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        content: trimmedContent,
        userId: user.id,
      },
    });
    return {
      ok: true,
      post,
    };
  } catch (error) {
    throw new Error("Could not edit post");
  }
};
