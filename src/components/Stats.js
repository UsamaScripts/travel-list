export default function Stats({ items }) {
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
