import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";

export default function InventoryList() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get("/api/inventory/getAllItems");
        setItems(result.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  React.useEffect(() => {
    if (!isLoading && items.length === 0) {
      window.alert("The inventory is empty.");
    }
  }, [items, isLoading]);

  const handleDelete = async (id) => {
    await axios
      .post(`/api/inventory/deleteItem/${id}`)
      .then(() => {
        setItems(items.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full p-10 mb-4">
      <div className="flex items-center justify-center mb-4">
        <Link
          to="/add-item-form"
          className="border-2 text-white text-xl bg-black w-[25%] hover:bg-gray-800 flex items-center justify-center rounded-md h-full p-1"
        >
          Add Item
        </Link>
      </div>
      {items.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-black">Image</th>
              <th className="border p-2 text-black">Name</th>
              <th className="border p-2 text-black">Quantity</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                </td>
                <td className="border p-2 text-black w-auto">
                  <div className="flex items-center justify-center">
                    {item.name}
                  </div>
                </td>
                <td className="border p-2 text-black w-auto">
                  <div className="flex items-center justify-center">
                    {item.quantity}
                  </div>
                </td>
                <td className="border p-2 w-auto">
                  <div className="flex items-center justify-center">
                    <Link
                      to={`/edit-item-form/${item._id}`}
                      className="mr-2 bg-blue-500 hover:bg-blue-200 text-white font-bold py-1 px-2 rounded w-full flex items-center justify-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-full"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-black text-base">
            No items found in the inventory
          </p>
        </div>
      )}
    </div>
  );
}
