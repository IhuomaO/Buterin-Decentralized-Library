import React, { useEffect, useState } from "react";
import backstages from "../Assets/backstages.jpg";
import "../App.css";
import Button from "../Components/Button";
import { getListOfAllUploadedCIDS } from "../Utils/helpers/getUploadedCIDs";
import { requestAccount } from "../Utils/helpers/ConnectMetamask.helper";
import Card from "../Components/Card";

function LandingPage() {
  const [metaDatas, setMetaDatas] = useState([])

  const account = localStorage.getItem("account")

  const getCids = async () => {
    const cids = await getListOfAllUploadedCIDS()
    for (let i = 0; i < cids.length; i++) {
      const url = `https://ipfs.infura.io/ipfs/${cids[i]}`;
      const response = await fetch(url);
      const json = await response.json()
      setMetaDatas((prev) => [...prev, json])
    }
  }

  useEffect(() => {
    requestAccount()
    getCids()
    // eslint-disable-next-line
  }, [])


  return (

    <div className="bg-gray-200">
      <section className="bg-gray-200 text-green-900 mb-32 h-max">
        <div
          className={`flex flex-col justify-center items-center text-white text-7xl font-serif uppercase reset-height multiply `}
          style={{ background: `url(${backstages}) rgba(0, 0, 0, 0.9) bottom`, backgroundBlendMode: 'multiply', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        >
          <div className=" w-[500px] font-nunito mx-auto text-center leading-tight">
            File Upload Service
          </div>
          <div>
            <Button className='' onClick={() => requestAccount()}> {account ? 'Connected' : 'Connect'}</Button>
          </div>
        </div>
      </section>

      <h2 className="text-4xl font-bold uppercase text-center p-10">List of all Files on our Platform</h2>
      <section className="grid grid-cols-3 gap-10 p-5  mx-auto max-w-max ">
        {
          metaDatas?.map((metacid, index) => (
            <Card key={index} metacid={metacid} />
          ))
        }
      </section>
    </div>
  );
}

export default LandingPage;
