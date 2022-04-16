const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Decentralized Library", function () {
  this.timeout(0);

  let library, DecenLibrary, fileArr;

  beforeEach(async () => {
    DecenLibrary = await ethers.getContractFactory("DecentralizedLibrary");

    library = await DecenLibrary.deploy();
  });

  it("should deploy", async () => {
    expect(library.address).to.be.a("string");
    expect(library.address.length).to.be.gt(0);
  });

  it("should upload cid", async () => {
    let [owner] = await ethers.getSigners();
    fileArr = ["uploaded", "food", "book", "movies"];
    const upload = await library._upload(fileArr);
    upload.wait();
    console.log(`cid Uploaded from \n ${upload.from} \n  to ${upload.to}`);
    console.log(await library._getListOfUploadedCIDS(owner.address));
    expect(await library._getListOfUploadedCIDS(upload.from)).to.deep.equal(
      fileArr
    );
  });

  it("should upload and update cid", async () => {
    let [owner] = await ethers.getSigners();
    fileArr = ["music", "photo", "ebooks", "pdf"];
    const upload = await library._subsequentUpload(fileArr);
    upload.wait();
    console.log(await library._getListOfUploadedCIDS(owner.address));
    expect(await library._getListOfUploadedCIDS(upload.from)).to.deep.equal(
      fileArr
    );
  });

  it("should Share files with an existing customer", async () => {
    let [owner] = await ethers.getSigners();
    fileArr = ["book", "MacBook", "windows", "Linux"];
    const ShareFile = await library._shareWithExisting(fileArr, owner.address);
    ShareFile.wait();
    console.log("\n Checking test 4 \n");
    console.log("\n File share to: " + ShareFile.from + " \n");
    console.log(
      "\n File shared : " +
        (await library._getListOfUploadedCIDS(owner.address)) +
        " \n"
    );
    expect(await ShareFile.from).to.deep.equal(owner.address);
  });

  it("Should check if its an uploader", async () => {
    let [owner] = await ethers.getSigners();
    fileArr = ["uploaded", "food", "book", "movies"];
    const upload = await library._upload(fileArr);
    upload.wait();
    let uploader = await library.isAnUploader(owner.address);
    // uploader.wait();
    console.log(await uploader);
    expect(await uploader).to.deep.equal(true);
  });
});
