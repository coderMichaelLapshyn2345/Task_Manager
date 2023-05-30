const url = "/api/Assignments";
let tasks = [];
function getTasks() {
    fetch(url)
        .then(response => response.json())
        .then(data => _displayTasks(data))
        .catch(error => console.error('Unable to get tasks', error));
}
function addTask() {
    const addNameTextBox = document.getElementById('add-name');
    const addDescriptionTextBox = document.getElementById('add-description');
    const addDeadlineTextBox = document.getElementById('add-deadline');
    const addStatusTextBox = document.getElementById('add-status');
    const addPerformerTextBox = document.getElementById('add-performer');
    const task = {
        name: addNameTextBox.value.trim(),
        description: addDescriptionTextBox.value.trim(),
        deadline: addDeadlineTextBox.value.trim(),
        status: addStatusTextBox.value.trim(),
        performer: addPerformerTextBox.value.trim()
    };
    fetch(url, {
        method:  'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
        .then(() => {
            getTasks();
            addNameTextBox.value = "";
            addDescriptionTextBox.value = "";
            addDeadlineTextBox.value = "";
            addStatusTextBox.value = "";
            addPerformerTextBox.value = "";
        })
        .catch(error => console.error('Unable to add task', error));
}
function deleteTask(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getTasks())
        .catch(error => console.error('Unable to delete task', error));
}
function displayEditForm(id) {
    const task = tasks.find(task => task.id == id);
    document.getElementById('edit-id').value = task.id;
    document.getElementById('edit-name').value = task.name;
    document.getElementById('edit-description').value = task.description;
    document.getElementById('edit-deadline').value = task.deadline;
    document.getElementById('edit-status').value = task.status;
    document.getElementById('edit-performer').value = task.performer;
    document.getElementById('edit-form').style.display = 'block';
}
function editTask() {
    const taskId = document.getElementById('edit-id').value;
    const task = {
        id: parseInt(taskId, 10),
        name: document.getElementById('edit-name').value.trim(),
        description: document.getElementById('edit-description').value.trim(),
        deadline: document.getElementById('edit-deadline').value.trim(),
        status: document.getElementById('edit-status').value.trim(),
        performer: document.getElementById('edit-performer').value.trim()
    };
    fetch(`${url}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(() => getTasks())
        .catch(error => console.error('Unable to edit task', error));
    closeInput();
    return false;
}
function closeInput() {
    document.getElementById('edit-form').style.display = 'none';
}
function _displayTasks(data) {
    const tBody = document.getElementById('tasks');
    tBody.innerHTML = "";
    const button = document.createElement('button');
    data.forEach(task => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Редагувати';
        editButton.setAttribute('onclick', `displayEditForm(${taskId})`);
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Видалити';
        deleteButton.setAttribute('onclick', `deleteTask(${taskId})`);
        let tr = tBody.insertRow();
        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(task.name);
        td1.appendChild(textNode)
        let td2 = tr.insertCell(1);
        let textNodeDescription = document.createTextNode(task.description);
        td2.appendChild(textNodeDescription);
        let td3 = tr.insertCell(2);
        let deadlineTimeNode = document.createTextNode(task.deadline);
        td3.appendChild(deadlineTimeNode);
        let td4 = tr.insertCell(3);
        let statusTextNode = document.createTextNode(task.status);
        td4.appendChild(statusTextNode);
        let td5 = insertCell(4);
        let performerTextNode = document.createTextNode(task.performer);
        td5.appendChild(performerTextNode);
        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);
        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });
    tasks = data;
}