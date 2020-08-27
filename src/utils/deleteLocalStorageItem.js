export function deleteTodoLocalStorageItem(e) {
  let index = e.currentTarget.getAttribute("data-key");
  let listValue = JSON.parse(localStorage.getItem("todo"));
  listValue.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(listValue));
  return listValue;
}

export function deleteListLocalStorageItem(e) {
  let index = e.currentTarget.getAttribute("data-key");
  let listValue = JSON.parse(localStorage.getItem("list"));
  listValue.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(listValue));
  return listValue;
}
