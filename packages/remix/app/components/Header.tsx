import type { User } from "@prisma/client";
import { Form } from "remix";
import GitHubLogo from "./GitHubLogo";

interface Props {
  title: string;
  user?: User;
}

const Header = ({ title, user }: Props) => {
  return (
    <nav className="flex content-end justify-between items-center mb-6 text-xl">
      <div className="mr-auto">
        <a href="/" className="hover:text-gray-400 text-3xl font-medium">
          {title}
        </a>
      </div>
      <div>
        {user ? (
          <Form action="/auth/logout" method="post">
            <button className="text-xs px-4 py-2 bg-gray-100 text-black font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 ">
              Sign out
            </button>
          </Form>
        ) : (
          <Form action="/auth/github" method="post">
            <button className="text-xs px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 flex items-center space-x-2">
              <GitHubLogo />
              <span>Sign in to Post</span>
            </button>
          </Form>
        )}
      </div>
    </nav>
  );
};

export default Header;
