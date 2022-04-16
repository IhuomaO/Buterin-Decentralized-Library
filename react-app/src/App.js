import "./App.css";
import Upload from "./Views/Upload";
import Layout from "./Components/Layout";
import { useState } from "react";
import LandingPage from "./Views/LandingPage";
import Ipfs from "./Utils/ipfs";
import Share from "./Views/Share";

function App() {
  const [page, setPage] = useState(0);
  const pageHandler = (index) => {
    setPage(index);
  };
  return (
    <Layout page={page} pageHandler={pageHandler} className=" items-center ">
      {/* {page === 1 ? <Upload /> : <LandingPage />} */}
      {page === 0 && <LandingPage />}
      {page === 1 && <Upload />}
      {page === 2 && <Share />}
    </Layout>
  );
}

export default App;
