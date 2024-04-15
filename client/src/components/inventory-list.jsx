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

  //   const handleDelete = async (id) => {
  //     await axios.delete(`/api/inventory/${id}`);
  //     setItems(items.filter((item) => item._id !== id));
  //   };

  return (
    <div>
      <div>
        <h1 className="text-black text-base">Hello this is Inventory List.</h1>
        <ul>
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item._id} className="text-black/50">
                {item.name} - Quantity: {item.quantity}
              </li>
            ))
          ) : (
            <p className="text-black">No items found</p>
          )}
        </ul>
      </div>
    </div>
  );
}
