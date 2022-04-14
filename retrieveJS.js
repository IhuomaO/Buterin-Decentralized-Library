const serverUrl = "https://ujwb1som3llq.usemoralis.com:2053/server" 
const appId = "TPzse1a4T6YsxrbB5Em4weILu5cR0AUplKU43QsZ"
Moralis.start({ serverUrl, appId });

document.getElementById("btn-retrieve").onclick = retrieve;

//function RUNING THE MAIN PROCESSS
async function retrieve(){
    const address = document.getElementById("address").value
    const uploadedCIDS = await _getListOfUploadedCIDS(address) //a SC view function //get the string array from SC
    console.log("CIDS retrieved")
    const metadataArray = [] //array to hold all the metadata foor this addrress
    for( let i = 0; i < uploadedCIDS.length; i++){
        const element = uploadedCIDS[i]
        const json = await getJSONfiles(element) //had to be like this because of await and async keyword. //it calls the Moralis IPFS link for each member of the array
        metadataArray.push(json) //push each object into the array
    }
    console.log("Metadata retrieved")
    metadataArray.forEach(element => displayLibrary(element))
    console.log("Items displayed")
}

async function _getListOfUploadedCIDS(address){
    const ABI = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"_getListOfUploadedCIDS","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"}]
    const options = {
        chain: "rinkeby", 
        address: "0x3f8c5Ceb89b4E363aCCB7B9771F48E277E3Cc4e1", 
        function_name: "_getListOfUploadedCIDS", 
        abi: ABI,
        params:{
            _address: address
        }
    };
    return await Moralis.Web3API.native.runContractFunction(options);
}

async function fetchIPFSDoc(ipfsHash) {
    const url = `https://gateway.moralisipfs.com/ipfs/${ipfsHash}`;
    const response = await fetch(url);
    return await response.json();
}

async function getJSONfiles(CidHashStr){
    return await fetchIPFSDoc(CidHashStr) 
}

function displayLibrary(metadata){
    const container = document.querySelector(".data")

    //create displayCard container
    const displayCard = document.createElement('div');
    displayCard.className = "displayCard";

    //create image element
    const image = document.createElement('img');
    image.src = "/FrontEnd/images/Screenshot (725).png"
    image.alt = "png-icon"
    //create nameTag container
    const nameTags = document.createElement('div');
    nameTags.className = "nameTags";
    //create h3 element
    const name = document.createElement('h3');
    name.textContent = metadata.name;
    //create h4 element
    const cid = document.createElement('h4');
    cid.textContent = metadata.ipfsCID;
    //create a element
    const hash = document.createElement('a');
    hash.href = metadata.ipfsCID;
    hash.target = "_blank"
    hash.textContent = metadata.ipfsHash;
    
    //append all nameTag elements to the nameTag container
    nameTags.append(name, cid, hash);

    //append all displayCard elements to the displayCard container
    displayCard.append(image, nameTags);

    //append the card to the dom element(i.e the container)
    container.append(displayCard)
}
