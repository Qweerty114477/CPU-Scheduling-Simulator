// Engine module for CPU scheduling simulation
// Simulation Engine

function runSimulation(processes, algorithm) {

    alert("runSimulation called");

    console.log("Selected Algorithm:", algorithm);

    let clonedProcesses = JSON.parse(JSON.stringify(processes));

    switch (algorithm) {

        case "FCFS":
            return fcfs(clonedProcesses);

        case "SJF":
            return sjf(clonedProcesses);

        default:
            alert("Algorithm not implemented.");
            return null;
    }

}