import { Post, User } from "@prisma/client";
import PostHeader from "./PostHeader";

interface Props {
  post: Post & {
    User: User;
  };
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="w-full rounded-md border p-4 shadow-md">
      <PostHeader
        postedAt={post.createdAt}
        username={post.User.username}
        avatar={post.User.avatar}
      />
      <div>{post.content}</div>
    </div>
  );
};

export default PostCard;
