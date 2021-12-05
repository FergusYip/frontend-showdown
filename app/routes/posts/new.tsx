import { Post } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/auth.server";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = () => redirect("/");

type NewPostSuccess = {
  post: Post;
  ok: true;
};
type NewPostError = {
  formError?: string;
  fieldErrors?: {
    content: string | undefined;
  };
  fields?: {
    content: string;
  };
  ok: false;
};

export type NewPostResponse = NewPostSuccess | NewPostError;

export let action: ActionFunction = async ({ request }): Promise<Response | NewPostResponse> => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Error("Not authenticated");
  }

  let form = await request.formData();
  let content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof content !== "string") {
    return { ok: false, formError: `Form not submitted correctly.` };
  }

  const fields = { content };
  if (!content.trim().length) {
    return {
      ok: false,
      fields,
      fieldErrors: { content: "Post cannot be empty" },
    };
  }

  const post = await db.post.create({
    data: {
      content: content.trim(),
      userId: user.id,
    },
  });
  return { ok: true, post };
};
