export function deleteLocalStorageItem(e, localStorageList) {
  let index = e.currentTarget.getAttribute("data-key");
  let listValue = JSON.parse(localStorage.getItem(localStorageList));
  listValue.splice(index, 1);
  localStorage.setItem(localStorageList, JSON.stringify(listValue));
  console.log(localStorageList);
  return listValue;
}
