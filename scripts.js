document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = {
        text: taskInput.value.trim(),
        completed: false
    };

    if (task.text) {
        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const taskList = task.completed ? document.getElementById('completedList') : document.getElementById('taskList');
    const tr = document.createElement('tr');
    tr.className = task.completed ? 'completed' : '';
    tr.innerHTML = `
        <td onclick="toggleTaskStatus('${task.text}')">${task.text}</td>
        <td><span class="delete" onclick="removeTask(this, '${task.text}')">X</span></td>
    `;
    taskList.appendChild(tr);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(element, taskText) {
    element.parentElement.parentElement.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskStatus(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('taskList').innerHTML = '';
    document.getElementById('completedList').innerHTML = '';
    tasks.forEach(task => addTaskToDOM(task));
}
