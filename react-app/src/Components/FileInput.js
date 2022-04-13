import React from 'react'

const FileInput = () => {
  const handleFileChange = (e) => {
    if (e.target.files[0].size > 2097152) {
      alert("File is too big!");
      e.target.value = "";
    };
  };
  return (
    <div>
      <div className=" justify-center items-center flex space-x-10 ">
        <label htmlFor="file-upload" className='font-semibold'>Upload File: </label>
        <input type="file" id='file-upload' className='' onChange={handleFileChange} />
      </div>

    </div >
  )
}

export default FileInput