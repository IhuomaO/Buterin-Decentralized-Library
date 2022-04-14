import React from "react";
import Button from "../Components/Button";
import FileInput from "../Components/FileInput";
import Input from "../Components/Input";
import IpfsUpload from "../Utils/helpers/fileUpload";

const Upload = () => {
  const { captureFile, handleUpload } = IpfsUpload();
  return (
    <form className=" h-4/5 text-white flex" onSubmit={handleUpload}>
      <div className=" bg-red-700 min-h-[230px] w-[800px] p-10 shadow flex flex-col justify-center space-y-10 my-auto mx-auto rounded-lg">
        <FileInput captureFile={captureFile} />
        <Input label="Name of file" />
        <textarea></textarea>
        <Button className="mx-auto text-white" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Upload;
