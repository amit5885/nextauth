import React from "react";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 lg:px-8 ">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <h2 className="mt-4 text-black bg-green-500 px-4 rounded">{params.id}</h2>
    </div>
  );
};

export default page;
