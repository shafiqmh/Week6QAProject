

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


