// https://youtu.be/Ttf3CEsEwMQ
// Selectors

import '../styles/index.css'
import '../index.html'

const todoInput = document.querySelector('.todo-input');
const todoHelper = document.querySelector('.todo-helper');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);
todoInput.addEventListener('input', handleTodoInputChange)

// TODO HEADER: input, button, helper
if (todoInput.value.length < 3) {
    todoButton.classList.add('todo-button_disabled')
}

function clearTodoInput() {
    todoInput.value = '';
    todoButton.classList.add('todo-button_disabled');
    todoHelper.classList.add('todo-helper_visible');
}

function handleTodoInputChange() {
    if (todoInput.value.length >= 3) {
        todoButton.classList.remove('todo-button_disabled');
        todoHelper.classList.remove('todo-helper_visible');
    } else {
        todoButton.classList.add('todo-button_disabled');
        todoHelper.classList.add('todo-helper_visible');
    }
}

// TODO LIST ITEM
function addTodo(event) {
    event.preventDefault();

    // Create Todo Item
    const todoItem = document.createElement('li');
    todoItem.classList.add("todo-item");

    // Create and add Todo Text
    const todoText = document.createElement('span');
    todoText.innerText = todoInput.value;
    todoText.classList.add('todo-text');
    todoItem.appendChild(todoText);

    // Create and add Check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('todo-check-button');
    checkButton.addEventListener('click', toggleCheckButton(todoItem));
    todoItem.appendChild(checkButton);

    // Create and add Remove button
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add('todo-remove-button');
    removeButton.addEventListener('click', removeTodoItem(todoItem))
    todoItem.appendChild(removeButton);

    // Add todo item to list
    todoList.appendChild(todoItem);

    // Clear input
    clearTodoInput();
}

function removeTodoItem(todoItem) {
    return () => todoItem.remove();
}

function toggleCheckButton(todoItem) {
    return (e) => {
        e.preventDefault();
        todoItem.classList.toggle('todo-item_completed')
    }
}