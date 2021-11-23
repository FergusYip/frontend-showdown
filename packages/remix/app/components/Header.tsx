interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <nav className="flex content-end justify-between mb-4 text-xl">
      <div className="mr-auto">
        <a href="/" className="hover:text-gray-400 text-3xl font-medium">
          {title}
        </a>
      </div>
    </nav>
  );
};

export default Header;
