// https://youtu.be/Ttf3CEsEwMQ
// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event listeners
todoButton.addEventListener('click', addTodo);

function addTodo(event) {
    event.preventDefault();
    const todoContainer = document.createElement('li');
    todoContainer.classList.add("todo-container");

    const todoText = document.createElement('span');
    todoText.innerText = 'test text';
    todoText.classList.add('todo-text');
    todoContainer.appendChild(todoText);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('todo-check-button');
    todoContainer.appendChild(checkButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add('todo-remove-button');
    todoContainer.appendChild(removeButton);

    todoList.appendChild(todoContainer);
}
