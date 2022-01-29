let mseconds = 0;
let seconds = 0;
let minutes = 0;

let displayMseconds = 0;
let displaySeconds = 0;
let displayMinutes = 0;

var stopWatchValue = "00:00:00";

let interval = null;

let status = "stopped";

var laps = [];

function stopWatch() {
    mseconds++;

    if (mseconds / 100 === 1) {
        mseconds = 0;
        seconds++;

        if (seconds / 60 === 1) {
            seconds = 0;
            minutes++;
        }

    }

    if (mseconds < 10) {
        displayMseconds = "0" + mseconds.toString();
    }
    else {
        displayMseconds = mseconds;
    }
    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }
    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    document.getElementById("display").innerHTML = displayMinutes + ":" + displaySeconds + ":" + displayMseconds;
}



function startStop() {

    if (status === "stopped") {
        interval = window.setInterval(stopWatch, 10);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else {

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";
    }

}

function reset() {
    stopWatchValue = displayMinutes + ":" + displaySeconds + ":" + displayMseconds;
    if (stopWatchValue === "00:00:00") {
        stopWatchValue = "0:0:0";
    }
    if (stopWatchValue !== "0:0:0") {
        laps.push(stopWatchValue);
    }
    else {
        laps = [];
    }

    text = "<ol>";
    for (i = 0; i < laps.length; i++) {
        text += "<li>" + laps[i] + "</li>";
    }
    text += "</ol>";
    document.getElementById("laps").innerHTML = text;

    window.clearInterval(interval);
    seconds = 0;
    mseconds = 0;
    minutes = 0;
    displayMinutes = 0 + "0";
    displayMseconds = 0 + "0";
    displaySeconds = 0 + "0";
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";
    status = "stopped";

}

var incremented = false;

function timer() {
    seconds--;

    if (seconds === 0) {
        seconds = 60;
        displaySeconds = 0;

    }
    if (seconds < 0) {
        seconds = 59;
    }
    if (seconds === 59) {
        minutes--;
    }
    if (seconds < 10 && seconds != 0) {
        displaySeconds = "0" + seconds.toString();
    }
    else if (seconds === 60) {
        displaySeconds = "00";
    }
    else {
        displaySeconds = seconds;
    }
    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }
    if (displaySeconds == 0 && displayMinutes == 0) {
        window.clearInterval(interval);
        status = "stopped";
        document.getElementById("startStop").innerHTML = "Start";
        incremented = false;
        seconds = 0;
        minutes = 0;
        document.getElementById("increment").disabled = false;
        document.getElementById("increment").style.color = "#FFD588";


    }
    document.getElementById("base-timer-label").innerHTML = displayMinutes + ":" + displaySeconds;
}

function startStopTimer() {

    if (status === "stopped" && incremented) {
        interval = window.setInterval(timer, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";
        document.getElementById("increment").disabled = true;
        document.getElementById("increment").style.color = "#8a8a8a";

    }
    else {

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";
    }

}

function resetTimer() {
    window.clearInterval(interval);
    seconds = 0;
    mseconds = 0;
    minutes = 0;
    displayMinutes = 0 + "0";
    displaySeconds = 0 + "0";
    document.getElementById("base-timer-label").innerHTML = "00:00";
    document.getElementById("startStop").innerHTML = "Start";
    status = "stopped";
    incremented = false;
    document.getElementById("increment").disabled = false;
    document.getElementById("increment").style.color = "#FFD588";

}

function increment() {
    window.clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Start";
    status = "stopped";
    incremented = true;
    seconds = seconds + 10;
    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }
    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }
    if (seconds === 60) {
        seconds = 0;
        displaySeconds = "00";
    }
    if (seconds === 50) {
        minutes++;
    }
    /*if (seconds > 60) {
        seconds = seconds % 60;
        minutes++;
    }*/

    document.getElementById("base-timer-label").innerHTML = displayMinutes + ":" + displaySeconds;
}

var styleChanged = false;

function showTime() {
    window.setInterval(showTime, 1000)
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var displayHour = hour;
    var displayMinute = minute;
    var displaySecond = second;

    if (hour < 10) {
        displayHour = "0" + displayHour;
    }
    if (minute < 10) {
        displayMinute = "0" + displayMinute;
    }
    if (second < 10) {
        displaySecond = "0" + displaySecond;
    }
    if (styleChanged === false) {
        document.getElementById("display").innerText = displayHour + ":" + displayMinute + ":" + displaySecond;
    }
    else if (styleChanged === true) {
        document.getElementById("base-timer-label").innerText = displayHour + ":" + displayMinute + ":" + displaySecond;
    }
}

function changeStyle() {
    if (styleChanged === false) {
        styleChanged = true
        var text = '<div id="app"><div class="base-timer"><svg class="base-timer__svg" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g class="base-timer__circle"><circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" /></g></svg><span id="base-timer-label" class="base-timer-label">--:--:--</span></div></div>';
        var element = document.getElementById("changeStyle");
        element.innerHTML = text;
    }
    else {
        styleChanged = false
        var text = '<div id="display">--:--:--</div>';
        var element = document.getElementById("changeStyle");
        element.innerHTML = text;
    }
}



