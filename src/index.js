import "../styles/index.css";
import "../index.html";

import { getTodoItem } from "./addTodoItem";
import { saveTodoToSStorage, getTodosFromSStorage } from "./sessionStorage";
import { filterTodoItems, SELECT_OPTIONS } from "./filterTodoItems";
import {
  clearTodoInput,
  getTodoInputItems,
  validateTodoInput,
  onFocusInput,
} from "./todoInput";

const todoInputWrapper = document.querySelector(".todo-input-wrapper");
const { todoInput, todoButton, todoHelper } =
  getTodoInputItems(todoInputWrapper);
const todoList = document.querySelector(".todo-list");
const todoSelect = document.querySelector(".todo-select");
const todoSelectWrapper = document.querySelector(".todo-select-wrapper");

document.addEventListener("DOMContentLoaded", onDOMLoaded);
todoInput.addEventListener("input", () => validateTodoInput(todoInputWrapper));
todoButton.addEventListener("click", addTodo);
todoSelect.addEventListener("change", filterTodos);
todoInput.addEventListener("focus", () => onFocusInput(todoInputWrapper));
todoInput.addEventListener("blur", () => {
  todoHelper.classList.remove("todo-helper_visible"); // 3) delete helper info
});

function onDOMLoaded() {
  renderTodosFromSStorage();
  validateTodoInput(todoInputWrapper);
}

function renderTodosFromSStorage() {
  let todos = getTodosFromSStorage();

  if (todos.length === 0) {
    todoSelectWrapper.classList.add("todo-select-wrapper_disabled"); // 1) selector disabled when empty todos
  }

  todos.forEach((todoValue) => {
    const todoItem = getTodoItem(todoValue);
    // Add todo item to list
    todoList.appendChild(todoItem);
  });
}

function addTodo(event) {
  event.preventDefault();

  // 2) add condition to check input value when press Enter
  if (todoInput.value.length >= 3) {
    // 4) Save to session storage with TODO with status
    const newToDo = {
      name: todoInput.value,
      status: SELECT_OPTIONS.UNCOMPLETED,
    };

    saveTodoToSStorage(newToDo);

    const todoItem = getTodoItem(todoInput.value);
    todoList.appendChild(todoItem);

    const todoItems = todoList.childNodes;

    if (todoItems.length) {
      todoSelectWrapper.classList.remove("todo-select-wrapper_disabled"); // 1) selector visible when have todos
    }

    clearTodoInput(todoInputWrapper);
  }
}

function filterTodos(e) {
  const todoItems = todoList.childNodes;

  filterTodoItems(todoItems, e.target.value);
}

// TODO fix bugs:
// 1. select should be disabled when no option is displayed
// 2. forbid form submit with enter key, when input value is less than 3 characters
// 3. when todoInput is not in focus, helper text should not be displayed
// 4. save to session storage todo state: completed, not completed - and update it
