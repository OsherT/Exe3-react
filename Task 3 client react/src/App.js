import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Ingredient from "./Pages/Ingredient";
import Recipe from "./Pages/Recipe";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ToastContainer />
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ingredient" element={<Ingredient />} />
          <Route path="/Recipe" element={<Recipe />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
