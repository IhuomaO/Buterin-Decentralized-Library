import React, { useState } from 'react'
import Button from '../Components/Button'
import TransferToken from '../Sections/TransferToken'
import { isValidAddress } from '../Utils/helpers/CheckAddress'

const AdminDashboard = () => {
  const bal = 1000

  const [sendAddress, setSendAddress] = useState('')
  const [sendAmount, setSendAmount] = useState(0)
  const feedback = ''

  console.log(sendAddress);
  console.log(sendAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handlesubmit');
    if (isValidAddress(sendAddress)) return

  }
  return (
    <div className='py-10'>
      <div className='w-full font-semibold text-center text-4xl uppercase py-10'>
        Admin Dashboard
      </div>
      <div className='w-full text-center text-2xl capitalize my-10'>
        <p className='inline-flex space-x-10 mx-auto'>
          Tokens Available: <span className='font-semibold pl-5 pr-2'> {bal} </span> BTU
        </p>
        <br />
        <Button>Mint Token</Button>
        <br />
      </div>
      <TransferToken title='Add Loyal Customer'
        onChangeAddress={(e) => setSendAddress(() => e.target.value)}
        onChangeAmount={(e) => {
          if (isNaN(e.target.value)) return;
          setSendAmount(() => e.target.value)
        }}
        valueAddress={sendAddress}
        valueAmount={sendAmount}
        submit={handleSubmit}
        buttonText='Add'
      />
     
      <div>{feedback}</div>

    </div>
  )
}

export default AdminDashboard