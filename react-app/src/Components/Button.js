import React from 'react'

const Button = ({ className, children, ...props }) => {
  return (
    <button className={`${className} my-3 h-10 min-w-[130px] text-lg font-semibold shadow border-2 border-red-400 text-red-700 px-4 py-3 bg-red-300 rounded-full hover:bg-red-500 active:bg-red-400 hover:text-white transition duration-300 inline-flex items-center justify-center leading-snug`} {...props} >
      {children}
    </button >
  )
}

  export default Button
