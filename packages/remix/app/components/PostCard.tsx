import { Post } from "@prisma/client";
import PostHeader from "./PostHeader";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="w-full rounded-md border p-4 shadow-md">
      <PostHeader postedAt={post.createdAt} />
      <div>{post.content}</div>
    </div>
  );
};

export default PostCard;
