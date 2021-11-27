import { PrismaClient } from "@prisma/client";
import faker from "faker";

const USERS_TO_CREATE = 20;
const POSTS_PER_USER = 20;

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    [...Array(USERS_TO_CREATE)].map(async () => {
      const createdAt = faker.date.past();
      const user = await db.user.create({
        data: {
          username: faker.internet.userName(),
          avatar: faker.internet.avatar(),
          email: faker.internet.email(),
          createdAt,
          updatedAt: createdAt,
        },
      });
      await Promise.all(
        [...Array(POSTS_PER_USER)].map(async () => {
          const postCreatedAt = faker.date.past();
          await db.post.create({
            data: {
              userId: user.id,
              content: faker.lorem.paragraph(),
              createdAt: postCreatedAt,
              updatedAt: postCreatedAt,
            },
          });
        })
      );
      console.log(`Created user ${user.username}`);
    })
  );
}

seed();
