import InventoryList from "./inventory-list";

export default function Inventory() {
  return (
    <div className="h-screen w-screen flex flex-col items-center mt-5">
      <h1 className="text-4xl text-black/80">List of all the Items</h1>
      <InventoryList />
    </div>
  );
}
