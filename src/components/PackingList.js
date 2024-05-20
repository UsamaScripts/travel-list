import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  items,
  setItems,
  handleDelete,
  handleUpdateToggle,
}) {
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
