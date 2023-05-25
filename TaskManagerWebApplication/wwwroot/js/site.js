// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const url = "api/Assignments";
let tasks = [];

function getAssignments() {
    fetch(url).
        then(response => response.json()).
        then(data => displayTasks(data))
        .catch(error => console.error('Unable to get tasks', error));
}
function addAssignment() {
    const addNameTextBox = document.getElementById("add-name");
    const addDescriptionTextBox = document.getElementById("add-description");
    const addDeadLineTimeTextBox = document.getElementById("add-deadline");
    const addStatusTextBox = document.getElementById("add-status");
    const addPerformerTextBox = document.getElementById("add-performer");

    const task = {
        name: addNameTextBox.value.trim(),
        description: addDescriptionTextBox.value.trim(),
        deadline: addDeadLineTimeTextBox.value.trim(),
        status: addStatusTextBox.value.trim(),
        performer: addPerformerTextBox.value.trim(),
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
        .then(() => {
            getAssignments();
            addNameTextBox.value = "";
            addDescriptionTextBox.value = "";
            addDeadLineTimeTextBox.value = "";
            addStatusTextBox.value = "";
            addPerformerTextBox.value = "";
        })
        .catch(error => console.error('Unable to add task', error));
}
function deleteAssignment(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getAssignments())
        .catch(error => console.error('Unable to delete task', error));
}
function displayUpdateForm(id) {
    const task = tasks.find(task => task.id == id);
    document.getElementById('edit-id').value = task.id;
    document.getElementById('edit-name').value = task.name;
    document.getElementById('edit-description').value = task.description;
    document.getElementById('edit-deadline').value = task.deadline;
    document.getElementById('edit-status').value = task.status;
    document.getElementById('edit-performer').value = task.performer;
    document.getElementById('updateForm').style.display = 'block';
}
function updateAssignment() {
    const taskID = document.getElementById('edit-id').value;
    const task = {
        id: parseInt(taskID, 10),
        name: document.getElementById("edit-name").value.trim(),
        description: document.getElementById("edit-description").value.trim(),
        deadline: document.getElementById("edit-deadline").value.trim(),
        status: document.getElementById("edit-status").value.trim(),
        performer: document.getElementById("edit-performer").value.trim()
    };
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'appsettings/json',
            'Content-Type': 'appsettings/json'
        },
        body: JSON.stringify(task)
    })
        .then(() => getAssignments())
        .catch(error => console.error('Unable to update task', error));
    closeInput();
    return false;
}
function closeInput() {
    document.getElementById('updateForm').style.display = 'none';
}
function displayTasks(data) {
    const tBody = document.getElementById('tasks');
    tBody.innerHTML = '';
    const button = document.createElement('button');
    data.forEach(task => {
        let updateButton = button.cloneNode(false);
        updateButton.innerText = 'Update';
        updateButton.setAttribute('onclick', `displayUpdateForm(${task.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteAssignment(${task.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(task.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeDescription = document.createTextNode(task.description);
        td2.appendChild(textNodeDescription);

        let td3 = tr.insertCell(2);
        let deadlineTextNode = document.createTextNode(task.deadline);
        td3.appendChild(deadlineTextNode);

        let td4 = tr.insertCell(3);
        let statusTextNode = document.createTextNode(task.status);
        td4.appendChild(statusTextNode);

        let td5 = tr.insertCell(4);
        let performerTextNode = document.createTextNode(task.performer);
        td5.appendChild(performerTextNode);
    });
    tasks = data;
}