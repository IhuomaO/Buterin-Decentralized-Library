import React from "react";

const FileInput = ({ captureFile }) => {
  return (
    <div>
      <div className=" justify-center items-center flex space-x-10 ">
        <label htmlFor="file-upload" className="font-semibold">
          Upload File:{" "}
        </label>
        <input
          type="file"
          id="file-upload"
          className=""
          onChange={captureFile}
          multiple
        />
      </div>
    </div>
  );
};

export default FileInput;
