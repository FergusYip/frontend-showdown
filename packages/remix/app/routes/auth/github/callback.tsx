import { LoaderFunction } from "remix";
import { authenticator } from "~/auth.server";

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("github", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
