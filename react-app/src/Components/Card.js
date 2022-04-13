import React from "react";
import Button from "./Button";

const Card = ({ id, bgImage, body, value, name, cardIds, setCardIds }) => {
  return (
    <div className="lg:w-1/4 w-full mb-6 lg:p-3 ">
      <div className="bg-gray-200 rounded-xl hover:shadow-xl transition duration-300 h-[500px]">
        <img
          src={bgImage}
          className="w-full rounded-t-xl  h-60"
          alt={bgImage}
        />
        <div className="px-6 pb-6 pt-3">
          <h2 className="text-xl font-bold mb-2 uppercase">{name}</h2>
          <p className="text-gray-600 leading-5 mb-4">{body}</p>
          <input type="hidden" value={id} />
          <p className="text-2xl font-thin mb-6">{value} BTR</p>
          <Button onClick={() => setCardIds([...cardIds, id])}>
            Get Reward
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
