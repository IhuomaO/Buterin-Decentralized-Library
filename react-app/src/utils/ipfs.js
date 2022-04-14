import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { web3, contract } from "./contract";

const Ipfs = () => {
  const [buffer, setBuffer] = useState([]);
  const [urls, setUrls] = useState([]);

  const client = create("https://ipfs.infura.io:5001/api/v0");
  const convertToBuffer = (reader) => {
    const buffers = Buffer(reader.result);
    setBuffer((prev)=>[...prev, buffers]);
  };

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const {files} = event.target;
    const fileArray = []
    Object.keys(files).map(key => {

      if (files[key].size < 2000000) {
        return fileArray.push(files[key])
      } else {
        return alert('File too Big')
      }
    })
    
    fileArray.forEach((file) => {
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => convertToBuffer(reader);
    });
  };


  const handleUpload = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);
    try {
      buffer?.map( async buff => {

        const _path = await client.add(buff);
        const url = `https://ipfs.infura.io/ipfs/${_path.path}`
        setUrls((prev) => [...prev, url]);
      })
      
    } catch (error) {
      console.log(error);
    }
    
    await contract.methods._upload(urls).send({
      from: accounts[0],
    });
  };


  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" multiple onChange={captureFile} />
        <button type='submit' >Submit</button>
      </form>
    </div>
  );
};

export default Ipfs;
