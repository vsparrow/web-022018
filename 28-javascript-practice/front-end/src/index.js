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
  div += ` <button type="button" onclick="startCreateNew()">CREATE NEW!</button> `
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
    /////////add a mark complete button to li
    let completedButton = document.createElement('button')
    completedButton.textContent = "Mark Completed"
    completedButton.addEventListener("click",()=>{setTaskCompleted(el.id)})
    li.appendChild(completedButton)
    //////// delete button
    let deleteButton = document.createElement('button')
    deleteButton.textContent = "DELETE"
    deleteButton.addEventListener("click",()=>{deleteTask(el.id)})
    li.appendChild(deleteButton)
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

function deleteTask(id){
  console.log("deleteTask:" +id);
  let url = TASKSURL + "/" +id
  fetch(url,{method: "DELETE"}).then(res=>startDisplayAllTasks())
    // .then(res=>res.json())
    // .then(json=>console.log(json))
  console.log("done with delete of " + id);
}//deleteTask

function startCreateNew(){
  let description = document.createElement('input')
  description.type = 'text'
  description.setAttribute('placeholder','description')
  description.setAttribute('id','newdescription')
  let priority = document.createElement('input')
  priority.type = 'text'
  priority.setAttribute('placeholder','priority')
  priority.setAttribute('id','newpriority')
  let submitButton = document.createElement('button')
  submitButton.textContent = "SUBMIT"
  submitButton.addEventListener("click",()=>{createTask()})////////////
  document.querySelector("#data").appendChild(description)
  document.querySelector("#data").appendChild(priority)
  document.querySelector("#data").appendChild(submitButton)
  // let li = document.createElement('li')
  // li.setAttribute('data-id',el.id)

}//end startCreateNew

function createTask(){
let description = document.querySelector("#newdescription").value
let priority = document.querySelector("#newpriority").value
fetch(TASKSURL,{
  method: "POST",
  headers: {'Content-type': 'application/json'},
  body: JSON.stringify({description:description, priority:priority})
})
.then(res=>res.json())
// .then(json=>console.log(json))
.then(json=>startDisplayAllTasks())
}
