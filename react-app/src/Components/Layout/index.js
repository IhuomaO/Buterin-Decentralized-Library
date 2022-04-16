import React from "react";
import Nav from "./Nav";

const index = ({ className, children, page, pageHandler, address, connectWallet, ...props }) => {
  return (
    <div className={`${className} h-screen`} {...props}>
      <Nav
        page={page}
        pageHandler={pageHandler}
        address={address}
        connectWallet={connectWallet}
      />
      {children}
    </div>
  );
};

export default index;
