import React from "react";
import CouponSection from "../Sections/CouponSection";
import TransferToken from '../Sections/TransferToken';
import Balance from '../Sections/Balance';


const User = () => {
  return (
    <div className="md:p-10 space-y-20">
      <Balance />
      <TransferToken />
      <CouponSection />
    </div>
  );
};

export default User;
