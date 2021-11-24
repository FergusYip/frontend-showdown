import React from "react";
import { Form } from "remix";

interface Props {}

const settings = (props: Props) => {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4 border-b pb-2">Settings</h1>
      <section>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Delete your account</h2>
            <div>All of your data will be deleted</div>
          </div>
          <Form action="/settings/delete" method="post">
            <button className="text-sm px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200">
              Delete
            </button>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default settings;
