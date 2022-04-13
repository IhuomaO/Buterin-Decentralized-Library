import React from 'react'
import Button from '../Components/Button';
import FileInput from '../Components/FileInput';
import Input from '../Components/Input';


const Home = () => {
  return (
    <div className=' h-4/5 text-white flex '>
      <div className= ' bg-red-700 min-h-[230px] w-[800px] p-10 shadow flex flex-col justify-center space-y-10 my-auto mx-auto rounded-lg'>
        <FileInput />
        <Input label='Name of file' /> 
        <textarea >

        </textarea>
        <Button className= 'mx-auto text-white'>Submit</Button>
      </div>
    </div>
  )
}

export default Home