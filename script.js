let timeLeft = 25 * 60;
let timerId = null;
let isWorking = true;
let sessions = 0;

const timerDisplay = document.getElementById('timer-display');
const statusLabel = document.getElementById('status-label');
const bgImage = document.getElementById('bg-image');
const alarm = document.getElementById('alarm-sound');

function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId) return;

    // IMPORTANT: "Wake up" the audio so browser allows it later
    alarm.play();
    alarm.pause();
    alarm.currentTime = 0;

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alarm.play(); // Now it will work!
            handlePhaseEnd();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    pauseTimer();
    isWorking = true;
    timeLeft = 25 * 60;
    applyStyles();
    updateDisplay();
}

function handlePhaseEnd() {
    if (isWorking) {
        sessions++;
        document.getElementById('session-count').textContent = sessions;
        alert("Work session over! Time for a break.");
        isWorking = false;
        timeLeft = 5 * 60;
    } else {
        alert("Break over! Back to work.");
        isWorking = true;
        timeLeft = 25 * 60;
    }
    applyStyles();
    updateDisplay();
}
function applyStyles() {
    if (isWorking) {
        statusLabel.textContent = "Work Mode";
        statusLabel.style.background = "#ff4757";
        bgImage.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000";
    } else {
        statusLabel.textContent = "Break Mode";
        statusLabel.style.background = "#1e90ff";
        bgImage.src = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000";
    }
}

// Initialize display on load
updateDisplay();
