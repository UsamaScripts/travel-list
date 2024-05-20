import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

// console.log(initialItems);
function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    // console.log(items);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    // console.log("function invoked");
  }

  function handleUpdateToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form addItem={handleAddItems} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handleUpdateToggle={handleUpdateToggle}
        setItems={setItems}
      />
      <Stats items={items} />
    </div>
  );
}
export default App;
