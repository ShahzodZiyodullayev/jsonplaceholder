import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
