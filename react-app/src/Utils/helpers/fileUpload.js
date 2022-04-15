import { useState } from "react";
import { create } from "ipfs-http-client";
import { web3, contract } from "../contract";

const IpfsUpload = () => {
  const [buffer, setBuffer] = useState([]);
  const [urls, setUrls] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [metadataCID, setMetadataCID] = useState([]);

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

    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);
    try {
      buffer?.map(async (buff) => {
        const { path } = await client.add(buff);
        const url = `https://ipfs.infura.io/ipfs/${path}`;
        console.log("deployed here:", url);
        const metaData = {
          name,
          description,
          visibility,
          cid: url,
        };
        setMetadata((prev) => [...prev, [JSON.stringify(metaData)]]);
        // setUrls((prev) => [...prev, url]);
      });

      // const { path } = await client.add(metadata);
      const { path } = await client.add(metadata);
      const url = `https://ipfs.infura.io/ipfs/${path}`;

      console.log("Url to be saved on smart contract: ", url);

      setMetadataCID(url);
      await contract.methods._upload(metadataCID).send({
        from: accounts[0],
      });
      setValues(initial);

      console.log("File successfully uploaded from " + accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Hashed url stored in state: ", metadataCID);
  console.log("Metadata ", metadata);

  return { captureFile, handleUpload, metadata, metadataCID };
};

export default IpfsUpload;
