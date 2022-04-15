import React, { useEffect, useState } from "react";
import { create } from "ipfs-http-client";
import { web3, contract } from "./contract";

const Ipfs = () => {
  const [buffer, setBuffer] = useState([]);
  const [urls, setUrls] = useState([]);
  const [cids, setCids] = useState([]);
  const [fileArr, setFileArr] = useState([]);

  useEffect(() => {
    uploadedCids();
  });

  const client = create("https://ipfs.infura.io:5001/api/v0");
  const convertToBuffer = (reader) => {
    const buffers = Buffer(reader.result);
    setBuffer((prev) => [...prev, buffers]);
  };

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const { files } = event.target;
    const fileArray = [];
    Object.keys(files).map((key) => {
      if (files[key].size < 2000000) {
        return fileArray.push(files[key]);
      } else {
        return alert("File too Big");
      }
    });
    console.log(files.fileList, "hhhh", fileArray.length);
    setFileArr(fileArray);

    fileArray.forEach((file) => {
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => convertToBuffer(reader);
    });
  };

  const shareFile = async (event, cids) => {
    event.preventDefault();

    const allow = await isUploader();
    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);
    try {
      if (allow === false) {
        await contract.methods._shareWithNew(cids, accounts[0]).send({
          from: accounts[0],
        });
      } else {
        await contract.methods._shareWithExisting(cids, accounts[0]).send({
          from: accounts[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _getSharedFiles = async () => {
    const accounts = await web3.eth.getAccounts();
    const cids = await contract.methods
      ._getListOfUploadedCIDS(accounts[0])
      .call();
    console.log(cids);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const allow = await isUploader();

    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);
    try {
      buffer?.map(async (buff) => {
        const _path = await client.add(buff);
        const url = `https://ipfs.infura.io/ipfs/${_path.path}`;
        fileArr.forEach(async (singleFile) => {
          const metadata = {
            name: singleFile.name,
            url,
          };
          const { path } = await client.add(JSON.stringify(metadata));
          setUrls((prev) => [...prev, path]);
        });
      });
    } catch (error) {
      console.log(error);
    }
    if (allow === false) {
      await contract.methods._upload(urls).send({
        from: accounts[0],
      });
    } else {
      await contract.methods._subsequentUpload(urls).send({
        from: accounts[0],
      });
    }
  };

  const uploadedCids = async () => {
    const allCids = await contract.methods._getListOfAllUploadedCIDS().call();
    console.log(allCids);
  };

  const userUploadedCids = async () => {
    const accounts = await web3.eth.getAccounts();
    const cids = await contract.methods
      ._getListOfUploadedCIDS(accounts[0])
      .call();
    console.log(cids);
  };

  const isUploader = async () => {
    const accounts = await web3.eth.getAccounts();
    const uploader = await contract.methods.isAnUploader(accounts[0]).call();
    return uploader;
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" multiple onChange={captureFile} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Ipfs;
