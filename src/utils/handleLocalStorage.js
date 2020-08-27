export function handleLocalStorage() {
  console.log("hiiiii");
  const todo = JSON.parse(localStorage.getItem("todo")); // local storage
  const list = JSON.parse(localStorage.getItem("list")); // local storage
  let newSortedTodo = todo.sort(compare);
  let newSortedList = list.sort(compare);
  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  localStorage.setItem("todo", JSON.stringify(newSortedTodo));
  localStorage.setItem("list", JSON.stringify(newSortedList));
  console.log(newSortedTodo, newSortedList);
}
