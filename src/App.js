
import './App.css';



import { Routes, Route } from "react-router-dom";

import { Login } from "./screen/login/login";
import { Home } from './screen/home/home';

function App() {
document.title = "Desafio Hit";
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;