import * as React from "react";

export default function InventoryItem({ item, onUpdate, onDelete }) {
  return (
    <div>
      <img
        src={item.imageUrl}
        alt={item.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h3>{item.name}</h3>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => onUpdate(item)}>Update</button>
      <button onClick={() => onDelete(item._id)}>Delete</button>
    </div>
  );
}
