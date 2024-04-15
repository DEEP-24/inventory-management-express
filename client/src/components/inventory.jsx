// import InventoryForm from "./inventory-form";
import InventoryList from "./inventory-list";

export default function Inventory() {
  return (
    <div className="h-screen w-screen flex flex-col items-center mt-5">
      <h1 className="text-5xl text-black/80">Inventory Management</h1>
      <InventoryList />
      {/* <InventoryForm onSave={(item) => console.log(item)} /> */}
    </div>
  );
}
