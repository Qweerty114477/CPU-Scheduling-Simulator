function calculateMetrics(processes) {

    let totalWaiting = 0;

    let totalTurnaround = 0;

    for (const process of processes) {

        process.turnaround = process.completion - process.arrival;

        process.waiting = process.turnaround - process.burst;

        process.response = process.startTime - process.arrival;

        totalWaiting += process.waiting;

        totalTurnaround += process.turnaround;

    }

    return {

        averageWaiting: totalWaiting / processes.length,

        averageTurnaround: totalTurnaround / processes.length

    };

}
