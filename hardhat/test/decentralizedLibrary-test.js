const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Decentralized Library", function () {
  this.timeout(0);

  let library, DecenLibrary, fileArr;
  fileArr = [
    {
      name: "Bg Nft",
      description: "This is my NFT",
      image: "../img/bg.png",
    },

    {
      name: "download NFT",
      description: "This is my NFT",
      image: "../img/download.png",
    },

    {
      name: "possibilities NFT",
      description: "This is my NFT",
      image: "../img/possibilities1.jpg",
    },
  ];

  beforeEach(async () => {
    DecenLibrary = await ethers.getContractFactory("DecentralizedLibrary");

    library = await DecenLibrary.deploy();
  });

  it("should deploy", async () => {
    expect(library.address).to.be.a("string");
    expect(library.address.length).to.be.gt(0);
  });


  it("should upload cid", async () => {
    fileArr = ["uploaded", "food", "book", "movies"];
    const upload = await library._upload(fileArr);
    upload.wait();
    console.log(`cid Uploaded from \n ${upload.from} \n  to ${upload.to}`);
    console.log(await library._getListOfUploadedCIDS(upload.from));
    expect(await library._getListOfUploadedCIDS(upload.from)).to.deep.equal(
      fileArr
    );
  });

  it("should upload and update cid", async () => {
    fileArr = ["mango", "apple", "cherry", "banana"];
    const upload = await library._subsequentUpload(fileArr);
    upload.wait();
    console.log(await library._getListOfUploadedCIDS(upload.from));
    expect(await library._getListOfUploadedCIDS(upload.from)).to.deep.equal(
      fileArr
    );
  });
});
