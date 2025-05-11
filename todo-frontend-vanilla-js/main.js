// main.js - Handles user authentication & task management

const API_URL = 'http://demo2.z-bit.ee';
let token = localStorage.getItem('authToken');

// Register a new user
async function registerUser(username, password, firstname = '', lastname = '') {
    const response = await fetch(`http://demo2.z-bit.ee/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword: password, firstname, lastname })
    });
    const data = await response.json();
    if (response.ok) {
        alert('Registration successful! Please log in.');
    } else {
        alert(`Error: ${data.message}`);
    }
}

// Login user
async function loginUser(username, password) {
    const response = await fetch(`http://demo2.z-bit.ee/users/get-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        token = data.access_token;
        localStorage.setItem('authToken', token);
        fetchTasks();
    } else {
        alert(`Login failed: ${data.message}`);
    }
}

// Logout user
function logoutUser() {
    localStorage.removeItem('authToken');
    token = null;
    alert('Logged out successfully!');
}

// Fetch tasks and display them
async function fetchTasks() {
    if (!token) return;
    const response = await fetch(`$http://demo2.z-bit.ee/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const tasks = await response.json();
    renderTasks(tasks);
}

// Add new task
async function addTask(title, desc = "") {
    const response = await fetch(`$http://demo2.z-bit.ee/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, desc })
    });
    if (response.ok) fetchTasks();
}

// Update task (mark as done or change title)
async function updateTask(id, updatedData) {
    await fetch(`$http://demo2.z-bit.ee/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    });
    fetchTasks();
}

// Delete task
async function deleteTask(id) {
    await fetch(`http://demo2.z-bit.ee/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchTasks();
}

// Render tasks in UI
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.title} - ${task.marked_as_done ? '✅' : '❌'}</span>
            <button onclick="updateTask(${task.id}, { marked_as_done: ${!task.marked_as_done} })">Toggle</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Initialize
if (token) fetchTasks();