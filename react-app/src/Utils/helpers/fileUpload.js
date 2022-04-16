import { useState } from "react";
import { create } from "ipfs-http-client";
import { web3, contract } from "../contract";

const IpfsUpload = () => {
  const [buffer, setBuffer] = useState([]);
  const [urls, setUrls] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [metadataCID, setMetadataCID] = useState([]);

  let accounts;

  const client = create("https://ipfs.infura.io:5001/api/v0");

  const convertToBuffer = (reader) => {
    const buffers = Buffer(reader.result);
    setBuffer((prev) => [...prev, buffers]);
  };

  const captureFile = (event, values) => {
    event.stopPropagation();
    event.preventDefault();
    const { files } = event.target;
    const fileArray = [];
    Object.keys(files).map((key) => {
      if (files[key].size < 2000000) {
        fileArray.push(files[key]);
        values.file = [...fileArray];
        return fileArray;
      } else {
        return alert("File too Big");
      }
    });

    fileArray.forEach((file) => {
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => convertToBuffer(reader);
    });
    console.log(fileArray);
  };

  const handleUpload = async (event, values, setValues, initial) => {
    event.preventDefault();
    const { name, description, visibility } = values;
    const newMetaData = [];
    accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);
    try {
      buffer?.map(async (buff, index) => {
        const { path } = await client.add(buff);
        const url = `https://ipfs.infura.io/ipfs/${path}`;
        console.log("deployed here:", url);
        const metaData = {
          name: name,
          description: description,
          visibility: visibility,
          cid: url,
        };
        newMetaData.push(metaData);
        setMetadata((prev) => [...prev, metaData]);
        // setUrls((prev) => [...prev, url]);
      });
      console.log("See: ", newMetaData);
      if (newMetaData.length > 0) await confirmTransaction(newMetaData);
      setValues(initial);
    } catch (error) {
      console.log(error);
    }
  };
  const confirmTransaction = async (metadata) => {
    console.log("netadata to be saved: ", metadata);
    try {
      const { path } = await client.add(JSON.stringify(metadata));

      const url = `https://ipfs.infura.io/ipfs/${path}`;
      console.log("Url to be saved on smart contract: ", url);

      await contract.methods._upload(metadataCID).send({
        from: accounts[0],
      });

      console.log("File successfully uploaded from " + accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return { captureFile, handleUpload, metadata, metadataCID };
  // console.log("Hashed url stored in state: ", metadataCID);
};

export default IpfsUpload;
