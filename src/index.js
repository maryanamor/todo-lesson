// https://youtu.be/Ttf3CEsEwMQ
// Selectors

import '../styles/index.css'
import '../index.html'

const todoInput = document.querySelector('.todo-input');
const todoHelper = document.querySelector('.todo-helper');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoSelect = document.querySelector('.todo-select');

// Event listeners
document.addEventListener('DOMContentLoaded', getTodosFromSStorage);
todoButton.addEventListener('click', addTodo);
todoInput.addEventListener('input', handleTodoInputChange)
todoSelect.addEventListener('change', filterTodos);

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

    // Save todo to session storage
    saveTodoToSStorage(todoInput.value);

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
    return (e) => {
        e.preventDefault();
        todoItem.classList.add('todo-item_fall');
        todoItem.addEventListener('transitionend', function () {
            removeTodoFromSStorage(todoItem)
            todoItem.remove();
        });
    };
}

function toggleCheckButton(todoItem) {
    return (e) => {
        e.preventDefault();
        todoItem.classList.toggle('todo-item_completed')
    }
}

// TODO SELECT
const SELECT_OPTIONS = {
    COMPLETED: 'completed',
    UNCOMPLETED: 'uncompleted',
    ALL: 'all'
}
function filterTodos(e) {
    const todoItems = todoList.childNodes;

    todoItems.forEach(todoItem => {
        switch (e.target.value) {
            case SELECT_OPTIONS.COMPLETED:
                if (todoItem.classList.contains('todo-item_completed')) {
                    todoItem.style.display = 'flex';
                } else {
                    todoItem.style.display = 'none';
                }
                break;
            case SELECT_OPTIONS.COMPLETED:
                if (!todoItem.classList.contains('todo-item_completed')) {
                    todoItem.style.display = 'flex';
                } else {
                    todoItem.style.display = 'none';
                }
                break;
            case SELECT_OPTIONS.ALL:
            default:
                todoItem.style.display = 'flex';
            return;

        }
    })
}

function saveTodoToSStorage(todo) {
    const storageTodos = sessionStorage.getItem('todos');
    let todos = !!storageTodos ? JSON.parse(storageTodos) : [];

    todos.push(todo);

    sessionStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromSStorage() {
    const storageTodos = sessionStorage.getItem('todos');
    let todos = !!storageTodos ? JSON.parse(storageTodos) : [];

    todos.forEach(todoValue => {
        // Create Todo Item
        const todoItem = document.createElement('li');
        todoItem.classList.add("todo-item");

        // Create and add Todo Text
        const todoText = document.createElement('span');
        todoText.innerText = todoValue;
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
    })
}

function removeTodoFromSStorage(todoItem) {
    const storageTodos = sessionStorage.getItem('todos');
    let todos = !!storageTodos ? JSON.parse(storageTodos) : [];

    const todoText = Array.from(todoItem.childNodes).find(node => node.classList.contains('todo-text'))

    if (todoText) {
        const filtredTodos = todos.filter(item => item !== todoText.innerText)
        sessionStorage.setItem('todos', JSON.stringify(filtredTodos));
    }
}

// TODO fix bugs:
// 1. select should be disabled when no option is displayed
// 2. forbid form submit with enter key, when input value is less than 3 characters
// 3. when todoInput is not in focus, helper text should not be displayed
// 4. save to session storage todo state: completed, not completed - and update it