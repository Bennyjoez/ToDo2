let list = document.getElementById("list")
let search = document.getElementById('searchParameter')
let addTaskBtn = document.getElementById('post');
let editBtn =document.getElementsByClassName('edit');

const dataArray = [];


list.addEventListener('click', function (e) {
    // delete 
        // after delete the numbering of the items needs to be updated
    if(e.target.textContent == "Delete") {
        e.target.parentElement.parentElement.remove();
        assignNumbers();
    }

    //
    else if (e.target.textContent == "Edit") {
        edit();
    };

    // edit function 
    function edit () {
        let victim = e.target.parentElement.parentElement

        let titleToEdit = victim.getElementsByClassName('name')[0].innerHTML;
        let description = victim.getElementsByClassName('description')[0].innerHTML;
    
        let editBox = `<h2 class="number"></h2>
                        <input type="text" id="title" placeholder="Title of task">
                        <textarea id="description" cols="30" rows="2"   placeholder="Description of the task"></textarea>
                        <button id="change">Confirm</button>`
        let editTab = document.createElement('div')
        editTab.innerHTML = editBox
        editTab.setAttribute('id', 'addTask')
        editTab.style.marginLeft = "20%"

        victim.style.display = "none"

        editTab.children[1].value = titleToEdit;
        editTab.children[2].value = description;
        // victim.appendChild(editTab)
        list.replaceChild(editTab, victim);

        // posting changes
        let confirmBtn  = document.getElementById('change')
        confirmBtn.addEventListener('click', post);

        function post () {
            list.replaceChild(victim, editTab)
            victim.getElementsByClassName('name')[0].innerHTML = editTab.children[1].value;
            victim.getElementsByClassName('description')[0].innerHTML = editTab.children[2].value
            victim.style.display = "flex"
        }

    }

});



// numbering the list items
function assignNumbers() {
    let numberHolders = Array.from(document.getElementsByClassName('number'));

    let tasks = Array.from(document.getElementsByClassName('content'))

    for(let each of numberHolders) {
        let index = tasks.indexOf(each.parentElement);
        let numberAssigned = index += 1

        // assigning the numbers to the placeholders
        each.innerHTML = numberAssigned

    };
};

list.addEventListener('change', assignNumbers())


addTaskBtn.addEventListener('click', function (e) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    if(title.length < 3 || description.length < 3) {
        alert("Please enter at least three characters for a title and a description");
    } 
    else if (title.length > 2 && description.length > 2) {

        // add input data to a list array
        dataArray.push([title, description]);
        localStorage.setItem("toDo-data", JSON.stringify(dataArray));
        const renderArr = JSON.parse(localStorage.getItem("toDo-data"));           //access the data from local storage
        
        // create elements
        updateDisplay();


        document.getElementById('description').value = "";
        document.getElementById('title').value = ""


        // assignNumbers();
    }
    else if (title !== "" && description == "") {
        alert(`Input a Description`)
    }
    else if (title == "" && description !== "") {
        alert(`Input a Title`)
    }

})

function updateDisplay() {
    const renderArr = JSON.parse(localStorage.getItem("toDo-data"))

    list.innerHTML = "";
    for(let each of renderArr) {
        let content = `     <h2 class="number"></h2>
        <div class="details">
            <h2 class="name">${each[0]}</h2>
            <p class="description">${each[1]}</p>
        </div>
        <div class="buttons">
            <button class="delete">Delete</button>
            <button class="edit">Edit</button>
        </div>`
        
        // append the elements
        let newContent = document.createElement('div');
        newContent.classList.add('content');
        newContent.innerHTML = content;
        list.appendChild(newContent);
    }

    assignNumbers()
}

window.addEventListener("DOMContentLoaded", updateDisplay);



