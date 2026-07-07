// Scheduling algorithms module
alert("Algorithms.js Loaded");
function fcfs(processes) {

    processes.sort((a, b) => a.arrival - b.arrival);

    let currentTime = 0;

    const gantt = [];

    for (const process of processes) {

        if (currentTime < process.arrival) {

            gantt.push({
                pid: "Idle",
                start: currentTime,
                end: process.arrival
            });

            currentTime = process.arrival;
        }

        process.startTime = currentTime;

        process.completion = currentTime + process.burst;

        currentTime = process.completion;

        gantt.push({
            pid: process.pid,
            start: process.startTime,
            end: process.completion
        });

    }

    return {

        processes,
        gantt

    };

}
function sjf(processes) {

    const completed = [];
    const gantt = [];

    let currentTime = 0;

    while (completed.length < processes.length) {

        // Get all processes that have arrived
        const available = processes.filter(
            p => !p.finished && p.arrival <= currentTime
        );

        // If no process has arrived, CPU is idle
        if (available.length === 0) {

            gantt.push({
                pid: "Idle",
                start: currentTime,
                end: currentTime + 1
            });

            currentTime++;
            continue;
        }

        // Select process with smallest burst time
        available.sort((a, b) => a.burst - b.burst);

        const process = available[0];

        process.startTime = currentTime;

        process.completion = currentTime + process.burst;

        currentTime = process.completion;

        process.finished = true;

        completed.push(process);

        gantt.push({
            pid: process.pid,
            start: process.startTime,
            end: process.completion
        });

    }

    return {

        processes,
        gantt

    };

}
