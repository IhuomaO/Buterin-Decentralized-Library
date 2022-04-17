import React from "react";

const Card = ({ metacid, ...props }) => {
  console.log(metacid);
  return (
    <div className=" max-w-[400px] font-inconsolat font-semibold text-gray-400 px-10 py-5 overeflow-wrap min-h-[200px] border shadow-md rounded-md flex flex-col justify-evenly  bg-red-700 items-center break-words " {...props}>
      <p className="w-full break-words ">Name: <span className="font-bold text-white" >{metacid?.name}</span> </p>
      <p className="w-full break-words">Address of Owner: <span className="font-bold text-white" >{metacid?.walletAddress}</span> </p>
      <p className="w-full break-words ">Description: <span className="font-normal text-white" >{metacid?.description}</span> </p>
      {
        metacid?.status.toLowerCase() === 'public' &&
        <p className="w-full break-words font-bold">Hash 2: <a href={metacid?.ipfsCID} className="underline text-xs text-blue-100 font-normal cursor-pointer" >{metacid?.ipfsHash}</a> </p>
      }

    </div>
  );
};

export default Card;
