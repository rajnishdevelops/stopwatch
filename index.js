let timer = 0;
let startTime;
let isRunning = false;
let laps = [];
let timerId;

function start() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - timer;
    timerId = setInterval(step, 10);
}

function stop() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerId);
}

function reset() {
    stop();
    timer = 0;
    laps = [];
    updateDisplay();
    updateLaps();
}

function lap() {
    if (!isRunning) return;
    const lapTime = getFormattedTime(timer);
    laps.push (lapTime);
    updateLaps();
}

function step() {
    timer = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('stopwatch');
    display.textContent = getFormattedTime(timer);
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

function getFormattedTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', stop);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});