import axios from "axios";
import * as React from "react";

export default function InventoryList() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get("/api/inventory/getAllItems");
        console.log("Fetched items", result.data);
        setItems(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItems();
  }, []);

  //   const handleUpdate = (item) => {
  //     // logic to update an item
  //   };

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
    <div className="w-full h-full p-10">
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
                <td className="border p-2 w-auto">
                  <div className="flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "50%",
                        height: "100%",
                        objectFit: "cover",
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
                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-full">
                      Edit
                    </button>
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
        <p>No items found</p>
      )}
    </div>
  );
}
