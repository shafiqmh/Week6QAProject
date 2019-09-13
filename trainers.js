

function httpRequest(method, url, callback, headers, body) {
	request = new XMLHttpRequest();
	request.open(method, url);
	request.onload = () => {
		callback(request);
	}
	for (let key in headers) {
		request.setRequestHeader(key, headers[key]);
	}
	body ? request.send(body) : request.send();
}


function createDeleteButton(id) {
	let button = document.createElement('button');
	button.innerText = "Delete";
	button.setAttribute("onclick", `deleteTrainer(${id})`);
	button.className = 'btn btn-danger';
	return button;
}

function createEditButton(id) {
	let button = document.createElement('button');
	button.innerText = "Edit";
	button.setAttribute("onclick", `createForm(${id})`);
	button.className = 'btn btn-info mr-1';
	return button;
}

function jsonToTableEntry(jsonData) {
	let mytr = document.createElement('tr');
	for (element in jsonData) {
		let mytd = document.createElement('td');
		mytd.setAttribute("onclick", "changeToInput(event)")
		mytd.innerText = jsonData[element];
		mytr.appendChild(mytd);
	}

	let buttontd = document.createElement('td');
	let buttonWrapper = document.createElement('div');
	buttonWrapper.className = "btn-toolbar";

	editButton = createEditButton(jsonData.id);
	deleteButton = createDeleteButton(jsonData.id);

	buttontd.appendChild(editButton);
	buttontd.appendChild(deleteButton);

	mytr.appendChild(buttontd)

	return mytr;
}


function createNewTable(request) {
	let jsonDataList = JSON.parse(request.response);
	let returned = document.getElementById("returned");
	if (returned) {
		document.getElementById('mainTable').removeChild(returned);
	}
	returned = document.createElement('tbody');
	returned.setAttribute("id", "returned");
	for (let i = 0; i < jsonDataList.length; i++) {
		returned.appendChild(jsonToTableEntry(jsonDataList[i]));
	}
	document.getElementById('mainTable').appendChild(returned);

}


function displayTrainers() {
	let method = "GET";
	let url = 'http://35.239.205.133:9000/trainer';
	body = null;
	let callback = createNewTable;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
}


displayTrainers();

function deleteTrainer(id) {
	let method = "DELETE";
	let url = `http://35.239.205.133:9000/trainer/${id}`;
	let callback = displayTrainers;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers);
}