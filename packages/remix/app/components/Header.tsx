import type { User } from "@prisma/client";
import { Fragment } from "react";
import { Form } from "remix";
import { classNames } from "../utils/helpers";
import GitHubLogo from "./GitHubLogo";
import { Menu, Transition } from "@headlessui/react";

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
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                  <img src={user.avatar} alt={`Profile picture of ${user.username}`} />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none text-right">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Form action="/auth/logout" method="post">
                        <button
                          type="submit"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block w-full px-4 py-2 text-sm"
                          )}
                        >
                          Sign out
                        </button>
                      </Form>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
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
