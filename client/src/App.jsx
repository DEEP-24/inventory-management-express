import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DataVisualization from "./components/data-visualization.jsx";
import Inventory from "./components/inventory.jsx";
import "./style.css";
import AddItemForm from "./components/add-item-form.jsx";
import EditItemForm from "./components/edit-item-form.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-white overflow-y-auto">
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
        <div>
          <Routes>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/data-visualization" element={<DataVisualization />} />
            <Route path="/add-item-form" element={<AddItemForm />} />
            <Route path="/edit-item-form/:itemId" element={<EditItemForm />} />
            <Route path="/" element={<div></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
