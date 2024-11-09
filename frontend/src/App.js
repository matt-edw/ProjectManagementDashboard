import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import RegisterProduct from "./pages/RegisterProduct/RegisterProduct";
import ViewProducts from "./pages/ViewProducts/ViewProducts";
import Header from "./pages/Header/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-product" element={<RegisterProduct />} />
          <Route path="/view-products" element={<ViewProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
