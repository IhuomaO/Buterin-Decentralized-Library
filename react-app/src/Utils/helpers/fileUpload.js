import { useState } from "react";
import { create } from "ipfs-http-client";
import { web3, contract } from "../contract";

const IpfsUpload = () => {
  const [buffer, setBuffer] = useState([]);
  const [metadataCID, setMetadataCID] = useState([]);
<<<<<<< HEAD
  const metadata = []
=======
  const metadata = [];
>>>>>>> feat-share-file

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
  };

  const handleUpload = async (event, values, setValues, initial) => {
    event.preventDefault();
    const { name, description, status } = values;

    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);
    try {
      for (let i = 0; i < buffer.length; i++) {
        const { path } = await client.add(buffer[i]);
        const url = `https://ipfs.infura.io/ipfs/${path}`;
        console.log("File", i + 1, "deployed at: ", url);
        const metaData = {
          name: name,
          description: description,
          status: status,
          cid: url,
        };
        metadata.push(JSON.stringify(metaData));
      }

      console.log("metadata array", metadata);
      const file = new File(metadata, "meta.json", {
        type: "application/json",
      });

      const { path } = await client.add(file);
      const metaUrl = `https://ipfs.infura.io/ipfs/${path}`;

      console.log("Metadata deployed at: ", metaUrl);

      setMetadataCID(metaUrl);
      await contract.methods._upload([metaUrl]).send({
        from: accounts[0],
      });
      setValues(initial);

      console.log("File successfully uploaded from " + accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return { captureFile, handleUpload, metadata, metadataCID };
};

export default IpfsUpload;
