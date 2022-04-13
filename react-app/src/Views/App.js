import { useState} from "react";
import "./App.css";
import Layout from "./Components/Layout";
import UserDashboard from "./Views/UserDashboard";
import AdminDashboard from './Views/AdminDashboard';
// import Web3 from "web3";
// import LandingPage from "./Components/LandingPage";

function App() {
  const [page, setPage] = useState(0);
  const pageHandler = (index) => {
    setPage(index)
  }
  const NotCreated = () => <div>Not Created yet</div>

  return (
    <Layout page={page} pageHandler={pageHandler} className='font-nunito'>
      {page === 0 && <NotCreated />}
      {page === 1 && <AdminDashboard />}
      {page === 2 && <UserDashboard />}

    </Layout>
  );
}

export default App;
