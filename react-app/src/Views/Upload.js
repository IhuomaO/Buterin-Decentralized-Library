import React from "react";
import Button from "../Components/Button";
import FileInput from "../Components/FileInput";
import Input from "../Components/Input";
import IpfsUpload from "../utils/helpers/fileUpload";
import useForm from "../Hooks/useForm";

const Upload = () => {
  const initialState = {
    file: [],
    description: "",
    name: "",
    cid: "",
    status: "",
  };
  const { values, onChange, setValues } = useForm(initialState);

  const { captureFile, handleUpload } = IpfsUpload();
  return (
    <form
      className=" h-4/5 text-white flex"
      onSubmit={(e) => handleUpload(e, values, setValues, initialState)}
    >
      <div className=" bg-red-700 min-h-[230px] w-[800px] p-10 shadow flex flex-col justify-center space-y-2 my-auto mx-auto rounded-lg">
        <FileInput captureFile={(event) => captureFile(event, values)} />
        <Input
          label="File name"
          name={"name"}
          value={values.name}
          onChange={onChange}
        />
        <div>
          <label
            htmlFor="status"
            className="form-label inline-block mb-1 text-white-700"
          >
            Status
          </label>
          <div className="form-control block w-full">
            <select
              className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              onChange={onChange}
              name="status"
              value={values.status}
            >
              <option value="Set status">Set status</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="form-label inline-block mb-1 text-white-700"
          >
            Description
          </label>
          <textarea
            className="
        form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={values.description}
            name="description"
            onChange={onChange}
            id="description"
            rows="3"
            placeholder="Your message"
          ></textarea>
        </div>

        <Button className="mx-auto text-white" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Upload;
