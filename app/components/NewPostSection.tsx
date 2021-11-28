import { useState } from "react";
import NewPostCard from "./NewPostCard";

interface Props {}

const NewPostSection = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <div className="flex justify-end mb-4">
        <button
          className="text-sm px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
          onClick={() => setIsExpanded(true)}
        >
          New Post
        </button>
      </div>
    );
  }

  return <NewPostCard onCancel={() => setIsExpanded(false)} />;
};

export default NewPostSection;
