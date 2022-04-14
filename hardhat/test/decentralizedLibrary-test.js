const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Decentralized Library", function () {
  this.timeout(0);

  const owner = ethers.getSigners();

  let library, DecenLibrary, fileArr;

  beforeEach(async () => {
    DecenLibrary = await ethers.getContractFactory("DecenLibrary");

    library = await DecenLibrary.deploy();
  });

  it("should deploy", async () => {
    expect(library.address).to.be.a("string");
    expect(library.address.length).to.be.gt(0);
  });

  //   it("should get balance value", async () => {
  //       console.log(library.address)
  //     expect(await library.balanceOf(library.address[0])).to.eq(0);
  //   });

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
});
