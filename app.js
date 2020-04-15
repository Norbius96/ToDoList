const title = document.getElementById("title");
const task = document.getElementById("textarea-task");
const date = document.getElementById("date");
const container = document.getElementById("container");

//tablica z taskami
let tasksArray = [{
    title: "Add a new Task to your board",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellendus. adipisicing elit. Consectetur, repellendusadipisicing elit. Consectetur, repellendus",
    date: todayDate(),
    status: "in_progress"
}];

//tworzenie pierwszej tablicy jeśli nie istnieje zadne zadanie

if (typeof localStorage !== "undefined") {
    if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }
    if (localStorage.getItem("numberOfTasks") === null) {
        localStorage.setItem("numberOfTasks", JSON.stringify(1));
    }
}



//pobranie tasków
let tasks = JSON.parse(localStorage.getItem("tasks"));

//utorzenie zapasowej tablicy
let templateTab = [];
templateTab = tasks;


//zmiana koloru kropki
const change = (index) => {
    if (tasks[index].status == "done") {
        tasks[index].status = "in_progress";
    } else {
        tasks[index].status = "done";
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    templateTab = tasks;
    loadTasks(tasks);
}

//usuwanie Taska
const deleteTask = (index) => {

    templateTab.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(templateTab));
    loadTasks(tasks);
    if (Object.keys(tasks).length === 0) {
        container.innerHTML = "<p>Brak Zadań 🙃</p>"
    }

}

//Dodawanie TASKA
function addTask() {
    const alert = document.getElementById("alert");

    //jeśli puste to alert
    if (title.value === "" || task.value === "") {
        alert.style.display = "inline";
    } else {

        //dodawanie
        tasks.push({
            title: title.value,
            description: task.value,
            date: date.value,
            status: "in_progress"
        });


        numberOfTasks();

        localStorage.setItem("tasks", JSON.stringify(tasks));
        templateTab = tasks;
        loadTasks(tasks);

        //czyszczenie pól formularza
        document.getElementById("title").value = "";
        document.getElementById("textarea-task").value = "";
        todayDate();
        alert.style.display = "none";

    }
}


function todayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + (parseFloat(dd) + 1);
    document.getElementById("date").value = today;
    document.getElementById("date").setAttribute("min", today);

    return (today);
}


//funkcja ładowania tasków
function loadTasks(tasks) {
    container.innerHTML = "";
    tasks.map((task, idx) => {
        container.innerHTML += `<div class="task" id="${idx}">
            <div class="head">
            <p class="title">${task.title}</p>
            <img src="img/${task.status}.svg" alt="status"  onclick="change('${idx}')"/>
            </div>
            <span class="description">${task.description}</span>
            <p class="date">${task.date}</p>
            <div class="icons">
                <img src ="img/delete.svg" id="delete" onclick="deleteTask('${idx}')"/>
            </div>
        </div>`;
    }, []);
}


function numberOfTasks() {
    let number = JSON.parse(localStorage.getItem("numberOfTasks"));
    number = number + 1;
    localStorage.setItem("numberOfTasks", JSON.stringify(number));
    document.getElementById('numbersoftasks').innerHTML = 'Numbers Of Tasks : ' + number;
}


todayDate();
loadTasks(tasks);

//editor




