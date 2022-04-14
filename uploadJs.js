document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-upload").onclick = upload;
const fileInput = document.getElementById("file")

//initialize Moralis on Kovan
// const serverUrl = "https://ghjgxkww1yf8.usemoralis.com:2053/server" 
// const appId = "t1kItXq2md7xjulnjHy92qgo69WvWFIJIOFSN5M3"
// Moralis.start({ serverUrl, appId });

//initialize Moralis on RRRinkeby
const serverUrl = "https://ujwb1som3llq.usemoralis.com:2053/server" 
const appId = "TPzse1a4T6YsxrbB5Em4weILu5cR0AUplKU43QsZ"
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        await Moralis.enableWeb3();
        user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
  
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

//function RUNING THE MAIN PROCESSS
async function upload(){
    await Moralis.authenticate({ signingMessage: "Log in using Moralis" })//authenticate
    const walletBalance = await viewBalance() //get the wallet balance of this wallet //a SC view function
    console.log("Wallet Balance gotten")
    const cidsToUploadArray = []
    if (walletBalance > 0){
        console.log("Sufficient Funds")
        const ipfsDetails = await uploadImage() //get the cid & hash of the uploaded file
        console.log("Image uploaded to IPFS")
        const imageIpfsCID = ipfsDetails[0]
        const imageIpfsHash = ipfsDetails[1]
        const cidToUpload = await uploadMetadata(imageIpfsCID, imageIpfsHash) //get the cid of the metadata
        console.log("Metadata uploaded to IPFS")
        cidsToUploadArray.push(cidToUpload) //push the hash of the metadata into an array
    } else {
        console.log("error")
    }
    const bool = await isAnUploader() //check if this address has uploaded before //a SC view function
    if (bool) {
        console.log("Existing User")
        await _subsequentUpload(cidsToUploadArray) //upload //a SC action function
    } else {
        console.log("New User")
        await _upload(cidsToUploadArray) //upload //a SC action function
    }
    console.log("Successfully Uploaded")
}

//HELPER Function 01
//get the wallet balance of this wallet
//a SC view function
async function viewBalance() {
    const ABI = [{"inputs":[],"name":"viewBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
    const options = {
        chain: "rinkeby", //update
        address: "0x3f8c5Ceb89b4E363aCCB7B9771F48E277E3Cc4e1", //update
        function_name: "viewBalance", //check
        abi: ABI,
    };
    return await Moralis.Web3API.native.runContractFunction(options);
}

//HELPER Function 02
//This function uploads files to ipfs and returns the cid/hash of the doc
async function uploadImage(){
    // Save file input to IPFS
    const data = fileInput.files[0]
    const file = new Moralis.File(data.name, data)
    await file.saveIPFS();
    // console.log(file.ipfs())
    const ipfsDetails = [file.ipfs(),file.hash()]
    return ipfsDetails//get the CID hash of the uploaded file
}

//HELPER Function 03
//This function uploads creeates a metadata and uploads metadata to ipfs
async function uploadMetadata(imageIpfsCID, imageIpfsHash){
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const status = document.getElementById("status").value
    const metadata = {
        "name": name,
        "description": description,
        "ipfsCID": imageIpfsCID,
        "ipfsHash": imageIpfsHash,
        "status": status
    }
    const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(metadata))});
    await file.saveIPFS();
    // console.log(file.ipfs(), file.hash())//get the CID hash of the uploaded metadata
    return file.hash()
}

//HELPER Function 04
async function isAnUploader(){
    let user = Moralis.User.current();
    const address = user.get("ethAddress") //get the address of wwallet calling function
    const ABI = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isAnUploader","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];  //update

    const options = {
        chain: "rinkeby", //update
        address: "0x3f8c5Ceb89b4E363aCCB7B9771F48E277E3Cc4e1", //update
        function_name: "isAnUploader", //check
        abi: ABI,
        params:{
            _address: address
        }
    };
    return await Moralis.Web3API.native.runContractFunction(options);
}

async function _subsequentUpload(newCidsToUpload) {
    const ABI = [{"inputs":[{"internalType":"string[]","name":"_newCidsToUpload","type":"string[]"}],"name":"_subsequentUpload","outputs":[],"stateMutability":"nonpayable","type":"function"}]; 

    const options = {
        chain: "rinkeby",
        contractAddress: "0x3f8c5Ceb89b4E363aCCB7B9771F48E277E3Cc4e1",
        functionName: "_subsequentUpload",
        abi: ABI,
        params:{
            _newCidsToUpload: newCidsToUpload
        }
    };
    await Moralis.authenticate()
    await Moralis.executeFunction(options);
}

async function _upload(newCidsToUpload) {
    const ABI = [{"inputs":[{"internalType":"string[]","name":"_cidsToUpload","type":"string[]"}],"name":"_upload","outputs":[],"stateMutability":"nonpayable","type":"function"}]; 

    const options = {
        chain: "rinkeby",
        contractAddress: "0x3f8c5Ceb89b4E363aCCB7B9771F48E277E3Cc4e1",
        functionName: "_upload",
        abi: ABI,
        params:{
            _cidsToUpload: newCidsToUpload
        }
    };
    await Moralis.authenticate()
    await Moralis.executeFunction(options);
}