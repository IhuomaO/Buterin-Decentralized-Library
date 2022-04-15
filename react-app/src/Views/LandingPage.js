import React from "react";
import backstages from "../Assets/backstages.jpg";
import "../App.css";
import Button from "../Components/Button";

function LandingPage() {
  return (
    <section className="bg-red-200 text-green-900 bottom-0 relative h-screen">
      <div
        className={`flex flex-col justify-center items-center text-white text-7xl font-serif uppercase reset-height multiply `}
        style={{ background: `url(${backstages}) rgba(0, 0, 0, 0.9) bottom`, backgroundBlendMode: 'multiply', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >
        <div className=" w-[500px] mx-auto text-center leading-tight">
          File Upload Service
        </div>
        <div>
          <Button  className='font-sans'>Connect Wallet</Button>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
