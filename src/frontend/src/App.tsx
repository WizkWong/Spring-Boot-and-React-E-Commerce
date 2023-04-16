import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const excludedPaths: string[] = ["/signup", "/login"];

  // check if the current path is in the excludedPaths list
  const shouldDisplayNavbar: boolean = !excludedPaths.some((path) =>
    location.pathname.includes(path)
  );

  return (
    <>
      {shouldDisplayNavbar && <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* required login */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/profile" element={<h1>Your profile</h1>} />
          <Route path="/cart" element={<h1>Your cart</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
