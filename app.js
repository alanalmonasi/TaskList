// Defining UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const helper = document.querySelector('.helper');

//Load all event listeners in one function
loadEventListeners();

//Create that function 
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item blue';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element and add class
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append icon to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}

//Add task
function addTask(e){
    if (taskInput.value === ''){
        helper.innerHTML = 'Please enter a new task'; 
        e.preventDefault();
        setTimeout(() => {
            helper.innerHTML=''}, 1700);
        return
    } else {
        helper.innerHTML = 'Task added successfully';

        setTimeout(() => {
            helper.innerHTML=''}, 1700);
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item blue';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element and add class
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append icon to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store task in LS
    storeTask(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store task
function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        //Remove from LS
        removeFromLS(e.target.parentElement.parentElement);
    }
}

//Remove from LS
function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //Clear tasks from LS
    clearFromLS();
}

function clearFromLS(){
    localStorage.clear();
}

//Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !=-1){
           task.style.display = 'block' 
        } else {
            task.style.display = 'none'
        }
    });
}