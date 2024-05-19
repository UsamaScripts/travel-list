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

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    addItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function Logo() {
  return <h1>Far Away</h1>;
}
function PackingList({ items, setItems, handleDelete, handleUpdateToggle }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;
  if (sortBy === "input") sortedItem = items;
  if (sortBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));

  function handleClearList() {
    if (items.length === 0) return window.alert("List Is Already Clear");

    const confrimed = window.confirm("Are you sure to clear the list");
    if (confrimed && items.length > 0) setItems((items = []));
  }
  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDelete={handleDelete}
            handleUpdateToggle={handleUpdateToggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input Order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>

        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Please add item to list</em>
      </p>
    );

  const itemNum = items.length;
  const packedItem = items.filter((item) => item.packed === true);
  const packedItemNumber = packedItem.length;
  const percetage = Math.floor((packedItemNumber / itemNum) * 100);
  return (
    <footer className="stats">
      <em>
        {percetage === 100
          ? "You have packed all the things you are ready to go"
          : `You have ${itemNum} item on your list and you have packed ${percetage}% of
        your Item`}
      </em>
    </footer>
  );
}
function Item({ item, handleDelete, handleUpdateToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleUpdateToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

export default App;
