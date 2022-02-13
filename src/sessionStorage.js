const TODOS = "todos";

export function removeTodoFromSStorage(todoItem) {
  let todos = getTodosFromSStorage();
  const todoSelectWrapper = document.querySelector(".todo-select-wrapper");

  const todoText = Array.from(todoItem.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );

  if (todoText) {
    const filtredTodos = todos.filter(
      (item) => item.name !== todoText.innerText
    );
    console.log("filtredTodos", filtredTodos);
    if (filtredTodos.length === 0) {
      todoSelectWrapper.classList.add("todo-select-wrapper_disabled"); //selector disabled when empty todos
    }
    sessionStorage.setItem(TODOS, JSON.stringify(filtredTodos));
  }
}

export function saveTodoToSStorage(todo) {
  let todos = getTodosFromSStorage();

  todos.push(todo);

  sessionStorage.setItem(TODOS, JSON.stringify(todos));
}

export function getTodosFromSStorage() {
  const storageTodos = sessionStorage.getItem(TODOS);
  return storageTodos ? JSON.parse(storageTodos) : [];
}

// 5) Update status ToDo's
export function updateTodoToSStorage(todoItem, status) {
  let todos = getTodosFromSStorage();
  const todoText = Array.from(todoItem.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );

  const updatedTodo = todos.map((item) =>
    item.name === todoText.innerText ? { ...item, status: status } : item
  );
  sessionStorage.setItem(TODOS, JSON.stringify(updatedTodo));
}
