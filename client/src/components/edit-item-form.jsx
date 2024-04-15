import axios from "axios";
import * as React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EditItemForm() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/inventory/getItem/${itemId}`);
        const { name, quantity } = response.data;
        setName(name);
        setQuantity(quantity);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch item:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedItem = { name, quantity };
      await axios.put(`/api/inventory/updateItem/${itemId}`, updatedItem);
      navigate("/inventory");
    } catch (err) {
      console.error("Failed to update item:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen w-screen p-10 mt-2 flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        <h1 className="text-black text-xl font-semibold">
          Fill the details to update the item
        </h1>
      </div>
      <div className="flex items-center justify-center">
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
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
            <Link
              to="/inventory"
              className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
