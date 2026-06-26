const inputBox = document.getElementById("inputBox")
const inputButton = document.getElementById("button")
const todolist = document.getElementById("todolist")

let editTodo = null;
// FUnction to add todo
const addtodo = () => {
    const inputText = inputBox.value.trim()
    if (inputText.length <= 0) {
        alert("Please write something........")
        return false;
    }

    if (inputButton.value === 'Edit') {

    let oldText = editTodo.target.previousElementSibling.innerHTML;

    editTodo.target.previousElementSibling.innerHTML = inputBox.value;

    editLocaltodo(oldText);

    inputButton.value = 'Add'
    inputBox.value = ""
}
else{
    // create li
    const li = document.createElement("li")
    const  p = document.createElement("p")
    p.innerHTML = inputText
    li.appendChild(p)
    //create edit button
    const editbtn = document.createElement('button')
    editbtn.innerText = "Edit"
    editbtn.classList.add('btn','editBtn')
    li.appendChild(editbtn)
    todolist.appendChild(li)
    //create delete btn
    const deletebtn = document.createElement('button')
    deletebtn.innerText = "Remove"
    deletebtn.classList.add('btn','deleteBtn')
    li.appendChild(deletebtn)

    savelocalTodos(inputBox.value)
    inputBox.value = ""
}
}
// FUnction to update todo : (Edit or update)
const updateTodo = (e) => {
    //console.log(e.target.innerHTML);
    if (e.target.innerHTML === 'Remove') {
        //console.log(e.target.parentElement);
        todolist.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement)
    }
    if (e.target.innerHTML === 'Edit') {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus()
        inputButton.value = "Edit"
        editTodo = e
    }
}
let todos = []
const savelocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
}

const getLocalTodo = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            // create li
            const li = document.createElement("li")
            const  p = document.createElement("p")
            p.innerHTML = todo
            li.appendChild(p)
            //create edit button
            const editbtn = document.createElement('button')
            editbtn.innerText = "Edit"
            editbtn.classList.add('btn','editBtn')
            li.appendChild(editbtn)
            todolist.appendChild(li)
            //create delete btn
            const deletebtn = document.createElement('button')
            deletebtn.innerText = "Remove"
            deletebtn.classList.add('btn','deleteBtn')
            li.appendChild(deletebtn)
        });
    }
}
const deleteLocalTodo = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    let indexTodo = todos.indexOf(todoText)
    todos.splice(indexTodo,1)
    console.log(indexTodo);  
    localStorage.setItem("todos", JSON.stringify(todos))                     
    // We use slice when we want copy of the array and we use splice when we want change                                                in the original array.


}

const editLocaltodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    let todoindex = todos.indexOf(todo)
    todos[todoindex] = inputBox.value
    localStorage.setItem("todos", JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded',getLocalTodo)
inputButton.addEventListener('click', addtodo)
todolist.addEventListener('click', updateTodo)