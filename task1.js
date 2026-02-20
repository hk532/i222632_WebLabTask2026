const stepsData = [4500, 6200, 5800, 7100, 4900, 8300, 6700];

function addSteps(dayIndex, steps) {
    if (dayIndex >= 0 && dayIndex < stepsData.length) {
        stepsData[dayIndex] = steps;
    } else {
        console.log("Invalid day index");
    }
}

function getHighestSteps() {
    return Math.max(...stepsData);
}

function getLowestSteps() {
    return Math.min(...stepsData);
}

function getAverageSteps() {
    const total = stepsData.reduce((sum, steps) => sum + steps, 0);
    return total / stepsData.length;
}

function getAboveAverageDays() {
    const average = getAverageSteps();
    return stepsData.filter(steps => steps > average);
}

getHighestSteps();

console.log("Initial Steps Data:", stepsData);
console.log("Highest Steps:", getHighestSteps());
console.log("Lowest Steps:", getLowestSteps());
console.log("Average Steps:", getAverageSteps());
console.log("Above Average Days:", getAboveAverageDays());

addSteps(0, 5000);

console.log("Updated Steps Data:", stepsData);
console.log("New Highest Steps:", getHighestSteps());
console.log("New Lowest Steps:", getLowestSteps());
console.log("New Average Steps:", getAverageSteps());
console.log("New Above Average Days:", getAboveAverageDays());
;