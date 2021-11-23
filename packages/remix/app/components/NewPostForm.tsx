import { useEffect } from "react";
import { Form, useTransition } from "remix";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  error?: string;
}

const NewPostForm = ({ onSubmit, onCancel, error }: Props) => {
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === "loading") {
      onSubmit();
    }
  }, [transition.state]);

  return (
    <div className="w-full rounded-md border p-4 shadow-md">
      <Form method="post">
        <label>
          <h2 className="text-lg font-semibold mb-4">New Post</h2>
          <textarea
            id="content"
            className={`border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none focus:ring-2 focus:border-transparent ${
              error ? "ring-2 ring-red-500" : "focus:ring-indigo-500 "
            }`}
            name="content"
            rows={4}
          />
          {error && <div className="text-red-500 px-1">{error}</div>}
        </label>
        <div className="flex justify-end mt-2 space-x-2">
          <button
            className="text-base py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="text-base py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 disabled:opacity-75"
            type="submit"
            disabled={Boolean(transition.submission)}
          >
            {transition.submission ? "Posting..." : "Post"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NewPostForm;
