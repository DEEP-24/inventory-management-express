import axios from "axios";
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="quantity">Quantity:</label>
      <input
        id="quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}
