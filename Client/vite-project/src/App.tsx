import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
// ? -----------------------------------------------------COMPONENTS
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import NavBar from "./components/navBar/NavBar";
import Favorites from "./components/favorites/Favorites";
import Detail from "./components/detail/Detail";
import Footer from "./components/footer/Footer";

import About from "./components/about/About";

import Home from "./components/home/Home";

// ? -----------------------------------------------------STYLES
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" ? <NavBar /> : ""}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* <Route path="/about" element={<About />} /> */}

        <Route path="/detail" element={<Detail />} />
        <Route path="/hotels" element={<Home />} />
      </Routes>
      {location.pathname !== "/login" ? <Footer /> : ""}
    </>
  );
}

export default App;

