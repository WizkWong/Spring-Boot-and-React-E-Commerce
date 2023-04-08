import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";

function App() {
  const location = useLocation();
  const excludedPaths = ["/signup"];

  // check if the current path is in the excludedPaths list
  const shouldDisplayNavbar = !excludedPaths.includes(location.pathname);

  return (
    <>
        {shouldDisplayNavbar && <Navbar />}
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
    </>
  );
}

export default App;
