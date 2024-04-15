import * as React from "react";
import axios from "axios";

export default function InventoryForm({ item, onSave }) {
  const [name, setName] = React.useState(item ? item.name : "");
  const [quantity, setQuantity] = React.useState(item ? item.quantity : 0);
  const [image, setImage] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("/api/inventory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSave(response.data);
    } catch (error) {
      console.error("Failed to submit the form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
