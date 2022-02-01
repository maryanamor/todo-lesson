// https://youtu.be/Ttf3CEsEwMQ
// Selectors

import '../styles/index.css'
import '../index.html'

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);

function addTodo(event) {
    event.preventDefault();

    console.log(event)
    const todoItem = document.createElement('li');
    todoItem.classList.add("todo-item");

    const todoText = document.createElement('span');
    todoText.innerText = todoInput.value;
    todoText.classList.add('todo-text');
    todoItem.appendChild(todoText);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('todo-check-button');
    checkButton.addEventListener('click', toggleCheckButton);
    todoItem.appendChild(checkButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add('todo-remove-button');
    removeButton.addEventListener('click', removeTodoItem(todoItem))
    todoItem.appendChild(removeButton);

    todoList.appendChild(todoItem);

    todoInput.value = '';
}

function removeTodoItem(todoItem) {
    return () => todoItem.remove();
}

function toggleCheckButton(e) {
    e.preventDefault();
}