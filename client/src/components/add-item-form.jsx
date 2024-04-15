import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function AddItemForm() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newItem = { name, quantity, imageUrl };
      await axios.post("/api/inventory/addItem", newItem).then(() => {
        navigate("/inventory");
      });
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  return (
    <div className="h-screen w-screen p-10 mt-2">
      <div className="flex items-center justify-center">
        <h1 className="text-black text-xl font-semibold">
          Fill the form to add an item
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
