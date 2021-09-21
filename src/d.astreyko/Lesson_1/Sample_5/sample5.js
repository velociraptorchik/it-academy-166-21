const inputBox = document.querySelector(".add_task input");
const addBtn = document.querySelector(".add_task button");
const todoList = document.querySelector(".list");
const deleteAll = document.querySelector(".clear>button");
inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() !== 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}
showTasks();
addBtn.onclick = ()=> {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    let listArr;
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active");
}
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    let listArr;
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;
    if(listArr.length > 0) {
        deleteAll.classList.add("active");
    } else {
        deleteAll.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})"></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}
function deleteTask (index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    let listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}
deleteAll.onclick = ()=> {
    let listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}