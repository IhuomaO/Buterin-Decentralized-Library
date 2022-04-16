import React from "react";

const Card = ({ metacid, ...props }) => {
  return (
    <div className="bg-white w-[400px] px-10 overeflow-wrap h-[200px] space-y-10 border shadow-md rounded-md flex items-center" {...props}>
      <p className="w-full break-words font-bold">CID: <span className="font-semibold" >{metacid}</span> </p> 
    </div>
  );
};

export default Card;
