let formDataObj = {};
const trainersTable = document.getElementById("tainersTable");

function submitInput(form) {
    for (let element of form.elements) {
        if (element.id) {
            formDataObj[element.id] = element.value;

        }
    }
    registerTrainer();
    return false;
}

function registerTrainer() {
    const req = new XMLHttpRequest();
    req.onload = () => {
        location.href = "index.html";
    };
    req.open('POST', 'http://35.242.169.35:9000/trainer');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(formDataObj));
    // console.log(JSON.stringify(formDataObj));

}


// function tableEntries(table) {
//     let row = document.createElement("tr");
//     let tbutton = document.createElement('button');
//     tbutton.type = "button";
//     tbutton.className = "btn btn-danger";
//     tbutton.innerHTML = "remove";
//     tbutton.id = "tableButton";
//     tbutton.addEventListener("click", function (e) {

//         this.parentNode.parentNode.removeChild(this.parentNode);

//     });


//     for (let i = 1; i < arguments.length; i++) {
//         let tbox = document.createElement("td");
//         tbox.innerHTML = arguments[i];
//         row.append(tbox);

//     }
//     table.append(row);
//     row.append(tbutton);
// }

// function onLoadRec() {

//     const recReq = new XMLHttpRequest;
//     recReq.onload = () => {
//         data = JSON.parse(recReq.response);
//         for (let i = 0; i < data.length; i++) {
//             let field = data[i];
//             tableEntries(trainersTable, field["fName"], field["sName"], field["focus"]);
//         }
//     }
//     recReq.open('GET', 'http://35.239.205.133:9000/trainer');
//     recReq.send();

// }