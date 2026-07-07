// ==========================
// CPU Scheduling Simulator
// Process Management Module
// ==========================
const processes = [];

const pidInput = document.getElementById("pid");
const arrivalInput = document.getElementById("arrival");
const burstInput = document.getElementById("burst");
const priorityInput = document.getElementById("priority");

const addBtn = document.getElementById("addProcessBtn");
const clearBtn = document.getElementById("clearBtn");
const runBtn = document.getElementById("runBtn");

const tableBody = document.getElementById("processTableBody");
const resultBody = document.getElementById("resultTableBody");
const ganttDiv = document.getElementById("gantt");
const logDiv = document.getElementById("log");

addBtn.addEventListener("click", addProcess);
clearBtn.addEventListener("click", clearProcesses);
runBtn.addEventListener("click", runFCFS);

function addProcess() {

    const pid = pidInput.value.trim();
    const arrival = Number(arrivalInput.value);
    const burst = Number(burstInput.value);
    const priority = Number(priorityInput.value);

    if (pid === "") {
        alert("Process ID is required.");
        return;
    }

    if (burst <= 0) {
        alert("Burst time must be greater than zero.");
        return;
    }

    if (arrival < 0 || priority < 0) {
        alert("Arrival time and Priority cannot be negative.");
        return;
    }

    const duplicate = processes.find(p => p.pid === pid);

    if (duplicate) {
        alert("Process ID already exists.");
        return;
    }

    processes.push({
        pid,
        arrival,
        burst,
        priority
    });

    renderTable();

    clearInputs();
}

function renderTable() {

    tableBody.innerHTML = "";

    processes.forEach((process, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${process.pid}</td>
            <td>${process.arrival}</td>
            <td>${process.burst}</td>
            <td>${process.priority}</td>

            <td>

                <button onclick="deleteProcess(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

function deleteProcess(index) {

    processes.splice(index, 1);

    renderTable();

}

function clearProcesses() {

    if (!confirm("Clear all processes?")) return;

    processes.length = 0;

    renderTable();

}

function clearInputs() {

    pidInput.value = "";
    arrivalInput.value = "";
    burstInput.value = "";
    priorityInput.value = "";

    pidInput.focus();

}
function runFCFS() {
console.log("Run button clicked");
    if (processes.length === 0) {

        alert("Please add some processes.");

        return;

    }

    // Read selected algorithm
    const algorithm = document.getElementById("algorithm").value;
console.log("Algorithm selected:", algorithm);
    const result = runSimulation(processes, algorithm);

    if (!result) return;

    const stats = calculateMetrics(result.processes);

    renderResults(result.processes);

    renderGantt(result.gantt);

    updateStatistics(stats);

updateLog(result.gantt);


    console.log(stats);

}
function renderResults(processes){

    resultBody.innerHTML="";

    processes.forEach(process=>{

        resultBody.innerHTML+=`

        <tr>

            <td>${process.pid}</td>
            <td>${process.arrival}</td>
            <td>${process.burst}</td>
            <td>${process.completion}</td>
            <td>${process.turnaround}</td>
            <td>${process.waiting}</td>
            <td>${process.response}</td>

        </tr>

        `;

    });

}
function renderGantt(gantt){

    ganttDiv.innerHTML="";

    gantt.forEach(block=>{

        ganttDiv.innerHTML+=`

        <div style="
        display:inline-block;
        padding:15px;
        margin:5px;
        background:#2563eb;
        color:white;
        border-radius:6px;
        min-width:70px;
        text-align:center;
        ">

        ${block.pid}<br>

        ${block.start} - ${block.end}

        </div>

        `;

    });


}
function updateStatistics(stats) {

    document.getElementById("avgWaiting").textContent =
        stats.averageWaiting.toFixed(2);

    document.getElementById("avgTurnaround").textContent =
        stats.averageTurnaround.toFixed(2);

         document.getElementById("throughput").textContent =
        stats.throughput.toFixed(2);
}
function updateLog(gantt) {

    logDiv.innerHTML = "";

    logDiv.innerHTML += "<b>Simulation Started...</b><br><br>";

    gantt.forEach(block => {

        if (block.pid === "Idle") {

            logDiv.innerHTML +=
                `Time ${block.start} : CPU Idle<br>`;

        } else {

            logDiv.innerHTML +=
                `Time ${block.start} : ${block.pid} started<br>`;

            logDiv.innerHTML +=
                `Time ${block.end} : ${block.pid} completed<br><br>`;

        }

    });

}