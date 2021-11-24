import { ActionFunction, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { authenticator } from "~/auth.server";
import { db } from "~/utils/db.server";
import { getSession, destroySession } from "../../session.server";

export let loader: LoaderFunction = async () => redirect("/settings");

export let action: ActionFunction = async ({ request }): Promise<Response> => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Error("Not authenticated");
  }

  await db.user
    .delete({
      where: {
        id: user.id,
      },
    })
    .catch((e) => console.error(e));

  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};
