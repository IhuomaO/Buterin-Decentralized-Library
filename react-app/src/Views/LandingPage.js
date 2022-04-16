import React, { useEffect, useState } from "react";
import backstages from "../Assets/backstages.jpg";
import "../App.css";
import Button from "../Components/Button";
import { getListOfAllUploadedCIDS } from "../Utils/helpers/getUploadedCIDs";
import { requestAccount } from "../Utils/helpers/ConnectMetamask.helper";
import Card from "../Components/Card";
// import Card from "surge/lib/middleware/card";

function LandingPage() {
  const [metaCids, setMetaCids] = useState(null)
  const getCids = async () => {
    const cids = await getListOfAllUploadedCIDS()
    return setMetaCids(cids)
  }
  useEffect(() => {
    getCids()
  }, [])

  return (
    <div className="bg-gray-200">
      <section className="bg-gray-200 text-green-900 bottom-0 relative h-screen">
        <div
          className={`flex flex-col justify-center items-center text-white text-7xl font-serif uppercase reset-height multiply `}
          style={{ background: `url(${backstages}) rgba(0, 0, 0, 0.9) bottom`, backgroundBlendMode: 'multiply', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        >
          <div className=" w-[500px] mx-auto text-center leading-tight">
            File Upload Service
          </div>
          <div>
            <Button className='font-sans' onClick={() => requestAccount()}>Connect Wallet</Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-10 ">
        {
          metaCids?.map((metacid, index) => (
            <Card key={metacid} metacid={metacid}  />
          ))
        }
      </section>
    </div>
  );
}

export default LandingPage;
