

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


function formToObject(formElement) {
	let body = {}
	for (let input of event.target) {
		if (input.name) { // dont include the submit button
			body[input.name] = input.value;
			input.value = "";
		}
	}
	return JSON.stringify(body);
} 

function postSubject(event) {
	// let data = formToObject(event.target);
	let method = 'POST';
	let url = 'http://35.239.205.133:9000/newSubject';
	let body = formToObject(event.target);
	let callback = displaySubjects;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
	return false
}



function createDeleteButton(id) {
	let button = document.createElement('button');
	button.innerText = "Delete";
	button.setAttribute("onclick", `deleteSubject(${id})`);
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


function displaySubjects() {
	let method = "GET";
	let url = 'http://35.239.205.133:9000/subject';
	body = null;
	let callback = createNewTable;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
}


displaySubjects();

function deleteSubject(id) {
	let method = "DELETE";
	let url = `http://35.239.205.133:9000/subject/${id}`;
	let callback = displaySubjects;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers);
}



function createForm(id) {
    var form = document.createElement("form");
	form.setAttribute('onsubmit',`return editSubject(event, ${id})`);
    form.id = "editSub";
    let exists = document.getElementById("editSub")
    console.log (exists)
    if (exists == null ){
	var name = document.createElement("input"); 
	name.setAttribute('type', "text");
	name.setAttribute('name', "name");
    name.value = ('this is me ');
    
	var category = document.createElement("input"); 
	category.setAttribute('type', "text");
	category.setAttribute('name', "category");

	var submit = document.createElement("input");
	submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Submit");
    

	form.innerText = 'First name:';
	form.appendChild(name);
	form.appendChild(category);
	form.appendChild(submit);

    document.body.appendChild(form);
    }else{

    }
}

function editSubject(event, id) {
	let method = "POST";
	let url = "http://35.239.205.133:9000/newSubject/";
	let callback = displaySubjects;
	let headers = {
		"Content-Type": "application/json"
	}
	tempObject = JSON.parse(formToObject(event.target));
	Object.assign(tempObject, {id : id});
    let body = JSON.stringify(tempObject);
    console.log(body);
    httpRequest(method, url, callback, headers, body);
    document.getElementById('editSub').remove();
	return false;
}
