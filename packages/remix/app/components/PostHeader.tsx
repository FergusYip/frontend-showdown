import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  postedAt: Date;
}

const PostHeader = ({ postedAt }: Props) => {
  return (
    <div className="flex mb-2">
      <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
        <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic" />
      </div>
      <span className="pt-1 ml-2 font-medium">braydoncoyer</span>
      <div className="flex items-center ml-auto text-sm text-gray-600">
        <span>{dayjs(postedAt).fromNow()}</span>
      </div>
    </div>
  );
};

export default PostHeader;
