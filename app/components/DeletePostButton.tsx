import React, { useEffect } from "react";
import { Form, useFetcher } from "remix";
import { DeletePostResponse } from "../routes/posts/delete.$id";
import TrashIcon from "./TrashIcon";

interface Props {
  postId: number;
}

const DeletePostButton = ({ postId }: Props) => {
  const fetcher = useFetcher<DeletePostResponse>();

  return (
    <Form action={`/posts/delete/${postId}`} method="post" className="contents" reloadDocument>
      <button className="text-gray-400 hover:text-gray-700 text-base px-2  rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-100">
        <TrashIcon />
      </button>
      <input type="hidden" name="location" value={window.location.href} />
    </Form>
  );
};

export default DeletePostButton;
