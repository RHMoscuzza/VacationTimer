let countDownClock;

// This function gets fired after the user inputs a date
// It will then clear any existing date and rerun all of the logic needed
function timeStartEvent(e) {
    clearIntervalClock();
    let endDate = e.target.value;
    let countDownDate = countDownUserDate(endDate);
    if (endDate) {
        runTime(countDownDate);
    } else {
        missingDate();
    }
};

// This function will ask the user to select a date if the input is empty
function missingDate() {
    document.getElementById("hiddenOnLoad").innerHTML = '';
    document.getElementById("main").innerHTML = 'Please select a date';
};

// This function sets the users chosen date
function countDownUserDate(endDate) {
    let countDownDate = new Date(endDate).getTime();
    return countDownDate;
};

function runTime(countDownDate) {
    countDownClock = setInterval(function() {
        timeInitialization(countDownDate);
    }, 1000);
};

// Returns the time left by calculating the difference from the now date and the user date
// It needs the countDownDate in order to run
function timeLeft(countDownDate) {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let calculations = {
        now: now,
        distance: distance,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }

    return calculations;
};

// This function will display the innerHTML of the runTime function
function mainDisplay(timeLeftObj) {


    document.getElementById("hiddenOnLoad").innerHTML = 'You will be on vacation in...';
    document.getElementById("main").innerHTML = timeLeftObj.days + 'd ' + timeLeftObj.hours + 'h ' + timeLeftObj.minutes + 'm ' + timeLeftObj.seconds + 's ';

};

// This function will check if the time left is less than to 0 and display a message and clears the existing message
function tripTime(timeLeftObj) {
    if (timeLeftObj.distance < 0) {
        clearIntervalClock();
        document.getElementById("hiddenOnLoad").innerHTML = '';
        document.getElementById("main").innerHTML = 'Bon Voyage!';
    }
};

function timeInitialization(countDownDate) {
    let timeLeftObj = timeLeft(countDownDate);
    mainDisplay(timeLeftObj);
    tripTime(timeLeftObj);
};

// This function clears the interval clock 
function clearIntervalClock() {
    clearInterval(countDownClock);
};

document.addEventListener('DOMContentLoaded', function(event) {
    document.getElementById('end').addEventListener('change', function(e) {
        timeStartEvent(e);
    });
});