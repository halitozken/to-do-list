const todo = document.getElementById("todo");
const form = document.getElementById("todo-form");
const clearButton = document.getElementById("clear-todos");
const filterTodos = document.getElementById("filter");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group");
const filter = document.querySelector("#filter");

eventListener();


function eventListener(e) {

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", getAllTodosFromStorage);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", searchTodos);
    clearButton.addEventListener("click", clearAllTodos);
    
    
}

function showAlertMessage(type, message){

    const alert = document.createElement("div");
    alert.className = "alert alert-"+ type;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 2000);
}

function searchTodos(e){

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display : none !important");

        }
        else{
            listItem.setAttribute("style", "display : block");
        }
    })


}

function clearAllTodosFromUI() {

    while (todoList.firstElementChild !== null) {

        todoList.firstChild.remove();

    }

}

function clearAllTodosFromStorage() {

    let todoArray = JSON.parse(localStorage.getItem("todos"));

    if(todoArray !== null) {
        localStorage.removeItem("todos");
    }

}


function clearAllTodos() {

    const todoArray = JSON.parse(localStorage.getItem("todos"));

    if(todoArray === null) {
        alert("Could not find any todo!")
    }else{
        if(confirm("Are you sure you want to delete all your todos?")){
            clearAllTodosFromStorage();
            clearAllTodosFromUI();
            showAlertMessage("primary","All todos deleted successfully!")
        }
    }
    


}


function deleteTodo(e) {


   if(e.target.className === "fa fa-remove") {
        if(confirm("Are you sure you want to delete?")){
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
            showAlertMessage("primary","Todos deleted successfully!");
        }
    }
    
}

function deleteTodoFromStorage(deleteTodo) {
    
    let todoList = JSON.parse(localStorage.getItem("todos"));
    
    todoList.forEach(function(todos, index){
        if(todos === deleteTodo){
            todoList.splice(index, 1);
        }
    })
    
    localStorage.setItem("todos", JSON.stringify(todoList));

}

function getAllTodosFromStorage(){

    const allTodos = JSON.parse(localStorage.getItem("todos"));

    allTodos.forEach(element => {
        addTodoUI(element)
    });

}


function addTodoUI(newTodo) {
   
    const todoArea = document.querySelector(".list-group");
    
    const list = document.createElement("li");
    list.className = "list-group-item d-flex justify-content-between";

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";
    a.innerHTML = "<i class = 'fa fa-remove'></i>";

    list.appendChild(document.createTextNode(newTodo));
    list.appendChild(a);
    todoList.appendChild(list);

}

function addTodoStorage(newTodo) {

    // Local Storage

    if(localStorage.getItem("todos") === null) {
        let todoArray = [];
        todoArray.push(newTodo);
        localStorage.setItem("todos",JSON.stringify(todoArray));
        showAlertMessage("success","First todo added successfully!");
    }    
    else {
        todoArray = JSON.parse(localStorage.getItem("todos"))
        todoArray.push(newTodo);
        localStorage.setItem("todos",JSON.stringify(todoArray));
        showAlertMessage("success","Todo added successfully!");
    }
    
    

};

function addTodo(e) {

    const newTodo = todo.value.trim();
    
    if(newTodo === ""){
        alert("Todo cannot be empty! Please type a todo.")
    }else{
        addTodoStorage(newTodo);
        addTodoUI(newTodo);
        todo.value = "";
    }
    
    e.preventDefault();
};






