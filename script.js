let timer;
let totalTime = 180; // 3 minutes
let timeLeft = totalTime;
let isRunning = false;
let currentStage = ""; 

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const stageDisplay = document.getElementById("stage");


function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateStage() {
  let newStage = "";

  if (timeLeft > 120) {
    newStage = "Stage: Heating";
  } else if (timeLeft > 60) {
    newStage = "Stage: Foaming";
  } else if (timeLeft > 0) {
    newStage = "Stage: Almost Ready!";
  } else {
    newStage = "Stage: Ready! ☕";
  }

  if (newStage !== currentStage) {
  currentStage = newStage;
  stageDisplay.textContent = newStage;

  stageDisplay.classList.remove("ready", "visible");
  void stageDisplay.offsetWidth;
  stageDisplay.classList.add("visible");

  if (timeLeft === 0) {
    stageDisplay.classList.add("ready");
  }
}
}


function startTimer() {
  const timerElement = document.getElementById("timer");

  if (isRunning) {
    clearInterval(timer);
    startBtn.textContent = "Resume";
    timerElement.classList.remove("running");
    document.querySelector(".boil-animation").classList.remove("boiling");
  } else {
    updateStage();
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
        updateStage();
      } else {
        clearInterval(timer);
        startBtn.textContent = "Start";
        timerElement.classList.remove("running");
        document.querySelector(".boil-animation").classList.remove("boiling"); // <-- Fixed here
      }
    }, 1000);

    startBtn.textContent = "Pause";
    timerElement.classList.add("running");
    document.querySelector(".boil-animation").classList.add("boiling");
    startBubbles();

  }

  isRunning = !isRunning;
}


function resetTimer() {
  clearInterval(timer);
  timeLeft = totalTime;
  updateTimerDisplay();
  stageDisplay.textContent = "Stage: Not started";
  startBtn.textContent = "Start"; 
  isRunning = false; 
  document.querySelector(".boil-animation").classList.remove("boiling");

}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();

function generateBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

 
  const size = Math.random() * 10 + 8; 
  const left = Math.random() * 180 + 10; 
  const delay = Math.random() * 3; 
  const duration = Math.random() * 2 + 2; 

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}px`;
  bubble.style.bottom = `${Math.random() * 10}px`;
  bubble.style.animation = `bubble ${duration}s ease-in-out ${delay}s infinite`;

  document.querySelector(".boil-animation").appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, (duration + delay) * 1000);
}

function startBubbles() {
  const interval = setInterval(() => {
    if (!document.querySelector(".boil-animation").classList.contains("boiling")) {
      clearInterval(interval);
      return;
    }
    generateBubble();
  }, 500); 
}
