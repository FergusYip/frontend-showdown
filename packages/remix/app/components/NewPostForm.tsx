import Button from "./Button";

interface Props {}

const NewPostForm = (props: Props) => {
  return (
    <div className="w-full rounded-md border p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">New Post</h2>
      <textarea
        className="border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        name=""
        id=""
        rows={4}
      ></textarea>
      <div className="flex justify-end mt-2">
        <Button>Post</Button>
      </div>
    </div>
  );
};

export default NewPostForm;
