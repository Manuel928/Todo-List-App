const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const addTaskForm = document.querySelector('.addTaskForm');
const checkbox = document.querySelector('#checkbox');
const html = document.querySelector('html');
const taskLabel = document.querySelector('label');


// Function to toggle the dark mode and save the preference
const toggleTheme = () => {
    if (checkbox.checked) {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Function to load the user's preference when the page loads
const loadThemePreference = () => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        checkbox.checked = true;
        toggleTheme();
    }
}

loadThemePreference();
checkbox.addEventListener('click', toggleTheme);


taskList.style = `
list-style: none;
margin-top: 1rem;
font-size: 1.2rem;
`;


const createTaskItem = (task) => {
    return `
    <li class="li-items">
        <div class="input-h4-div">
            <input type="checkbox" id="${task}" onChange="toggleTaskCompletion(event)" name="task" value="${task}">
            <label for="${task}" class="task-text">${task}</label>
        </div>
        <button class="delete-button" onClick="deleteTask(event)">Delete task</button>
    </li>
    `;
}

// Rendering saved tasks to the browser
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const renderTasks = () => {
    if (localStorage['tasks'] === '[]') {
        taskList.insertAdjacentHTML('beforeend', '<p class="no-tasks">You have no saved tasks!</p>')
    } else {
        storedTasks.forEach((task) => {
            taskList.insertAdjacentHTML('beforeend', createTaskItem(task))
        })
    }
}

window.onload = renderTasks;

// Add task
const addTask = (event) => {
    event.preventDefault();
    const task = taskInput.value;
    const taskItem = createTaskItem(task);
    taskList.insertAdjacentHTML('beforeend', taskItem);
    // Array.from(taskList.children).reverse();
    storedTasks.unshift(task)
    window.location = 'index.html'
    localStorage.setItem('tasks', JSON.stringify(storedTasks))
    addTaskForm.reset();

    // Removing "You have no saved tasks" text
    document.querySelector('p.no-tasks').style.visibility = "hidden";
}

addTaskForm.addEventListener('submit', addTask)

// Marking tasks as complete
const toggleTaskCompletion = (event) => {
    const taskItem = event.target.parentElement.parentElement
    const task = taskItem.querySelector('label');

    if (event.target.checked) {
        task.style.textDecoration = 'line-through';
        task.style.opacity = 0.5;
    } else {
        task.style.textDecoration = 'none';
        task.style.opacity = 1;
    }
}

function deleteTask(event) {
    const listItem = event.target.closest('li');
    if (listItem) {
        const indexToDelete = Array.from(listItem.parentNode.children).indexOf(listItem);
        deleteItemFromLocalStorage(indexToDelete);
        listItem.remove();
    }

}

function deleteItemFromLocalStorage(index) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}
