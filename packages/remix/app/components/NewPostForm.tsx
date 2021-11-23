interface Props {
  onCancel: () => void;
}

const NewPostForm = ({ onCancel }: Props) => {
  return (
    <div className="w-full rounded-md border p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">New Post</h2>
      <textarea
        className="border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        name=""
        id=""
        rows={4}
      ></textarea>

      <div className="flex justify-end mt-2 space-x-2">
        <button
          className="text-base py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className="text-base py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 ">
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
