console.log('HELP US!')
TASKSURL = "http://localhost:3000/tasks"
TASKURL =  "http://localhost:3000/task"

document.addEventListener('DOMContentLoaded', function(){
  // console.log("AFTER LOAD");
  displayTop()
})

function displayTop(){
  //button for all
  let div = `<div id="toolbar">`
  div += ` <button type="button" onclick="startDisplayAllTasks()">SHOW ALL!</button> `
  div += ` <button type="button" onclick="createNew()">CREATE NEW!</button> `
  div+=`</div>`
  let top = document.querySelector("#top")
  top.innerHTML = "";
  // top.innerHTML += "something";
  top.innerHTML += div;
  top.innerHTML += `<hr>`;
  // console.log("displayTop done");
}
// Display all tasks
function startDisplayAllTasks(){
  getAllTasks()
}

function getAllTasks(){
  let url = "http://localhost:3000/tasks"
  fetch(url).then(res=>res.json()).then(json=>convertTasks(json))
}
function convertTasks(data){  //data is json
  // console.log(data);
  //we get json data, now send it off to display
  displayAllTasks(data)
}

function displayAllTasks(data){
  let html = ""
  let dataDiv = document.querySelector("#data")
  dataDiv.innerHTML = ""
  data.forEach(function(el){
    // console.log(el);
    // let li = `<li data-id="${el.id}">Description:${el.description} ::::: Priority:${el.priority}</li>`
    // html += li
    //////////////////////above works. but lets try somethign else
    let li = document.createElement('li')
    li.setAttribute('data-id',el.id)
    li.textContent = `Description:${el.description} ::::: Priority:${el.priority} ::::: Completed:${el.completed}`
    /////////add a button to li
    let completedButton = document.createElement('button')
    completedButton.textContent = "Mark Completed"
    completedButton.addEventListener("click",()=>{setTaskCompleted(el.id)})
    li.appendChild(completedButton)
    ////////
    dataDiv.appendChild(li)
    // li.addEventListener("click",()=>{editTask(el.id)})
    // li.onclick=editTask(el.id)
  })//forEach
  // console.log(html);

  // dataDiv.innerHTML += html  //for use with old commented out code in forEach
}//displayAllTasks

function setTaskCompleted(id){
  // console.log("setTaskCompleted:" +id);
  //ONLY SET completed true
  let url = TASKSURL + "/" +id
  // console.log(url);
  fetch(url,{
    method: "PATCH",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({completed: true})
  }).then(res=>res.json())//.then(json=>console.log(json))
  .then(json=>startDisplayAllTasks())
}//setTaskCompleted
// Add a task
// Check a task as complete
// Remove a task
