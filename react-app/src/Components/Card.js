import React from "react";

const Card = ({ metacid, ...props }) => {
  return (
    <div className=" max-w-[400px] px-10 py-5 overeflow-wrap min-h-[200px] border shadow-md rounded-md flex flex-col justify-evenly text-white bg-red-700 items-center break-words " {...props}>
      <p className="w-full break-words font-bold">Address of Owner: <span className="font-semibold" >{metacid?.walletAddress}</span> </p>
      <p className="w-full break-words font-bold">Name: <span className="font-semibold" >{metacid?.name}</span> </p>
      <p className="w-full break-words font-bold">Description: <span className="font-normal" >{metacid?.description}</span> </p>
      {
        metacid.visibility === 'public' &&
        <p className="w-full break-words font-bold">Hash: <a href={metacid?.ipfsCID} className="underline text-red-600 cursor-pointer" >{metacid?.ipfsHash}</a> </p>
      }
      <p className="w-full break-words font-bold">Hash 2: <a href={metacid?.ipfsCID} className="underline text-xs text-gray-400 cursor-pointer" >{metacid?.ipfsHash}</a> </p>

    </div>
  );
};

export default Card;
