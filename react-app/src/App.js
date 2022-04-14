import "./App.css";
import Upload from "./Views/Upload";
import Layout from "./Components/Layout";
import { useState } from "react";
import LandingPage from "./Views/LandingPage";
import Ipfs from "./Utils/ipfs";

function App() {
  const [page, setPage] = useState(0);
  const pageHandler = (index) => {
    setPage(index);
  };
  return (
    <Layout page={page} pageHandler={pageHandler} className=" items-center ">
      {page === 1 ? <Upload /> : <LandingPage />}
    </Layout>
  );
}

export default App;
