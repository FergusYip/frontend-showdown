import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  postedAt: Date;
  updatedAt: Date;
  username: string;
  avatar: string;
}

const PostHeader = ({ postedAt, updatedAt, username, avatar }: Props) => {
  const isEdited = postedAt !== updatedAt;
  const editedText = isEdited ? "(Edited) " : "";

  return (
    <div className="flex mb-2">
      <a className="flex hover:underline" href={`/user/${username}`}>
        <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
          <img src={avatar} alt={`Profile picture of ${username}`} />
        </div>
        <span className="pt-1 ml-2 font-medium">{username}</span>
      </a>
      <div className="flex items-center ml-auto text-sm text-gray-600">
        <span>{editedText + dayjs(postedAt).fromNow()}</span>
      </div>
    </div>
  );
};

export default PostHeader;
