const UP = -1;
const DOWN = 1;

export function moveItems(id, direction, stateList) {
  const position = stateList.findIndex((i) => i.id === id);
  if (position < 0) {
    throw new Error("Given item not found.");
  } else if (
    (direction === UP && position === 0) ||
    (direction === DOWN && position === stateList.length - 1)
  ) {
    return; // cannot move outside of array
  }
  const item = stateList[position]; // save item for later
  const newItems = stateList.filter((i) => i.id !== id); // remove item from array
  newItems.splice(position + direction, 0, item);
  return newItems;
}
