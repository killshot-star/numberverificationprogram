//Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load all event listeners
loadEventListeners();

//Load event listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Verify number event
    form.addEventListener('submit', verifyNumber);
    //Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task){
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append the link to li
      li.appendChild(link);
  
      // Append li to ul
      taskList.appendChild(li);
    });
  }

function verifyNumber(e) {
    if(taskInput.value === '' || taskInput.value.length !== 11){
        alert("Input a valid 11-digit phone number!");
    }
    let prefix = taskInput.value.slice(0,4);
  let networks = [ 
    obj1 = {
    name : "MTN-NG",
    prefixes : ['0703','0706','0803','0806','0810','0813','0814','0816','0903','0906']
  }, 
    obj2 = {
    name : "GLO-NG",
    prefixes : ['0705','0805','0807','0811','0815','0905']
    },
    obj3 = {
      name : "AIRTEL-NG",
      prefixes : ['0701','0708','0802','0808','0812','0902','0907','0901']
    },
    obj4 = {
      name : "9MOBILE-NG",
      prefixes : ['0809','0817','0818','0908', '0909']
    }
];
networks.forEach(element => {
    if(element.prefixes.includes(prefix) && taskInput.value.length === 11){
        // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode
    (taskInput.value + " is registered under " + 
    element.name + " network."));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //Store in LS
  storeTaskInLocalStorage(taskInput.value + " is registered under " + 
  element.name + " network.");
  // Clear input
  taskInput.value = '';
    }
}); 
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Remove Task
  function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
  
        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
  }
  
  // Remove from LS
  function removeTaskFromLocalStorage(taskItem) {
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
  

function doSomething(num){
    
    
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
      }
    }
  }
  
  // Clear Tasks
  function clearTasks() {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
  clearTasksFromLocalStorage();
  }

  function clearTasksFromLocalStorage(){
      localStorage.clear();
  }
  
  // Filter Tasks
  function filterTasks(e) {
    const text = e.target.value.toLowerCase();
  
    document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }