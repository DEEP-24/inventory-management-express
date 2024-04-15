import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DataVisualization from "./components/data-visualization.jsx";
import Inventory from "./components/inventory.jsx";
import "./style.css";

export default function App() {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col items-center bg-white">
        <nav className="flex items-center justify-center gap-4 mt-2">
          <Link
            to="/data-visualization"
            className="hover:bg-gray-800 text-white border-2 border-black p-2 rounded-md bg-gray-700"
          >
            Data Visualization
          </Link>
          <Link
            to="/inventory"
            className="hover:bg-gray-800 text-white border-2 border-black p-2 rounded-md bg-gray-700"
          >
            Inventory Management
          </Link>
        </nav>
        <Routes>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/data-visualization" element={<DataVisualization />} />
          <Route path="/" element={<div></div>} />
        </Routes>
      </div>
    </Router>
  );
}
