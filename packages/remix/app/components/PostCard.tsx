import { Post, User } from "@prisma/client";
import { useState } from "react";
import { Form, useTransition } from "remix";
import PostHeader from "./PostHeader";
import TrashIcon from "./TrashIcon";

interface Props {
  post: Post & {
    User: User;
  };
  user?: User;
}

const PostCard = ({ post, user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  let transition = useTransition();

  return (
    <div className="w-full rounded-md border p-4 shadow-md">
      <PostHeader
        postedAt={post.createdAt}
        updatedAt={post.updatedAt}
        username={post.User.username}
        avatar={post.User.avatar}
        isEditable={!isEditing && post.userId === user?.id}
        onEdit={() => setIsEditing(true)}
      />
      {isEditing && !transition.submission ? (
        <>
          <Form
            id="form-edit"
            method="post"
            action={`/posts/edit/${post.id}`}
            onSubmit={() => setIsEditing(false)}
          >
            <textarea
              id="content"
              className={`border border-gray-400 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-indigo-500 mt-2 `}
              name="content"
              rows={4}
              defaultValue={post.content}
            />
          </Form>

          {/* {error && <div className="text-red-500 px-1">{error}</div>} */}
          <div className="flex justify-end mt-2 space-x-2">
            <Form action={`/posts/delete/${post.id}`} method="post" className="contents">
              <button className="text-gray-400 hover:text-gray-700 text-base px-2  rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-100">
                <TrashIcon />
              </button>
            </Form>
            <button
              className="text-base py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="text-base py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 disabled:opacity-75"
              type="submit"
              id="form-edit"
              // disabled={Boolean(transition.submission)}
            >
              {/* {transition.submission ? "Posting..." : "Post"} */}
              Edit
            </button>
          </div>
        </>
      ) : (
        <div>{transition.submission?.formData.get("content") || post.content}</div>
      )}
    </div>
  );
};

export default PostCard;
