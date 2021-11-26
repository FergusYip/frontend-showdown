import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PencilSquareIcon from "./PencilSquareIcon";

dayjs.extend(relativeTime);

interface Props {
  postedAt: Date;
  updatedAt: Date;
  username: string;
  avatar: string;
  isEditable?: boolean;
  onEdit: () => void;
}

const PostHeader = ({ postedAt, updatedAt, username, avatar, isEditable, onEdit }: Props) => {
  const isEdited = Math.abs(Number(postedAt) - Number(updatedAt)) / 1000 > 5;
  const editedText = isEdited ? " (edited)" : "";

  return (
    <div className="flex mb-4">
      <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
        <img src={avatar} alt={`Profile picture of ${username}`} />
      </div>
      <div className="flex items-baseline space-x-2">
        <a className="pt-1 ml-2 font-medium hover:underline" href={`/user/${username}`}>
          {username}
        </a>
        <span className="text-xs text-gray-600">{dayjs(updatedAt).fromNow() + editedText}</span>
      </div>
      {isEditable && (
        <button className="ml-auto text-gray-400 hover:text-gray-700" onClick={onEdit}>
          <PencilSquareIcon />
        </button>
      )}
    </div>
  );
};

export default PostHeader;
