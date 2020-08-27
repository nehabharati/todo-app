export function deleteLocalStorageItem(e, localStorageList) {
  let index = e.currentTarget.getAttribute("data-key");
  let listValue = JSON.parse(localStorage.getItem("todo"));
  listValue.splice(index, 1);
  localStorage.setItem(localStorageList, JSON.stringify(listValue));
  return listValue;
}
