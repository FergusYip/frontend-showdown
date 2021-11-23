import PostHeader from "./PostHeader";

interface Props {}

const PostCard = (props: Props) => {
  return (
    <div className="w-full rounded-md border p-4 shadow-md">
      <PostHeader />
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam cupiditate dolore rem
        voluptate ad voluptatum quidem, aliquam enim facilis consequuntur ipsam doloremque sequi
        odio, quisquam labore maxime culpa quibusdam fuga!
      </div>
    </div>
  );
};

export default PostCard;
