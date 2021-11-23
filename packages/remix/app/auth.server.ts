import { User } from "@prisma/client";
import { Authenticator, GitHubStrategy } from "remix-auth";
import { sessionStorage } from "~/session.server";
import { db } from "~/utils/db.server";

export const authenticator = new Authenticator<User>(sessionStorage);

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: process.env.GITHUB_CALLBACK_URL!,
  },
  async (accessToken, refreshToken, github, profile) => {
    return db.user.upsert({
      where: {
        email: profile.emails[0].value,
      },
      update: {},
      create: {
        email: profile.emails[0].value,
        username: profile.displayName,
        avatar: profile.photos[0].value,
      },
      select: {
        id: true,
        createdAt: true,
        username: true,
        updatedAt: true,
        email: true,
        avatar: true,
      },
    });
  }
);

authenticator.use(gitHubStrategy);
