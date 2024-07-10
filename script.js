document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskList').addEventListener('click', handleTaskClick);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => displayTask(task));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        displayTask(task);
        saveTask(task);
        taskInput.value = '';
    }
}

function displayTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = task;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleTaskClick(e) {
    if (e.target.classList.contains('delete')) {
        const taskItem = e.target.parentElement;
        removeTask(taskItem.textContent.replace('Delete', '').trim());
        taskItem.remove();
    } else {
        e.target.classList.toggle('completed');
    }
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
