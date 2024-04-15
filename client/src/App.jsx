import "./style.css";
import * as React from "react";
import Inventory from "./components/inventory.jsx";
import DataVisualization from "./components/data-visualization.jsx";

export default function App() {
  const [activeTab, setActiveTab] = React.useState("data");

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-white">
      <nav className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={() => setActiveTab("data")}
          className="hover:bg-gray-800"
        >
          Data Visualization
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className="hover:bg-gray-800"
        >
          Inventory Management
        </button>
      </nav>
      {activeTab === "inventory" && <Inventory />}
      {activeTab === "data" && <DataVisualization />}
    </div>
  );
}
