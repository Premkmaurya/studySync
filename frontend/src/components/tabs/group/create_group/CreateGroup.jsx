import React from "react";
import CreateGroupForm from "./components/CreateGroupForm";

const CreateGroup = () => {
  return (
    <div className="mx-auto max-w-[1400px] w-full bg-[#f6f5f4] text-[#000000] min-h-screen pt-28 sm:pt-36 md:pt-40 pb-16 px-5 sm:px-8 md:px-10 lg:px-12">
      <CreateGroupForm />
    </div>
  );
};

export default CreateGroup;
