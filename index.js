let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let dayDate = document.getElementById('dayDate');
let tickSound = new Audio('tick.mp3');


// Function to convert number to words (e.g., 12 to "twelve")
function numberToWords(num) {
    // Add your number to words conversion logic here
    // For simplicity, let's just return the number as a string
    return num.toString();
}

// Function to speak the current time
function speakTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let timeString = numberToWords(hh) + ' ' + numberToWords(mm);
    
    let speech = new SpeechSynthesisUtterance();
    speech.text = 'The time is ' + timeString;
    window.speechSynthesis.speak(speech);
}
function displayTime(){
  let date = new Date();

  // Getting hour, mins, sec fro date

  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  let hRotation = 30*hh + mm/2;
  let mRotation = 6*mm;
  let sRotation = 6*ss;

  hr.style.transform= `rotate(${hRotation}deg)`;
  min.style.transform= `rotate(${mRotation}deg)`;
  sec.style.transform= `rotate(${sRotation}deg)`;

  //Play tick sound
  if (ss === 0) {
    tickSound.currentTime = 0;
    tickSound.play();
}


// Display day and date
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let currentDay = days[date.getDay()];
let currentDate = date.getDate();
let currentMonth = date.getMonth() + 1; // Months are 0-based

dayDate.textContent = `${currentDay}, ${currentMonth}/${currentDate}`;

}
setInterval(displayTime, 1000);

// Event listener for the "Speak Time" button
let speakButton = document.getElementById('speakTimeButton');
speakButton.addEventListener('click', speakTime);

let stopwatchButton = document.getElementById('startStopwatchButton');
let stopwatchDisplay = document.getElementById('stopwatch');
let isStopwatchRunning = false;
let stopwatchInterval;
let stopwatchStartTime = 0; // Initialize the starting time to 0
let lastRecordedTime = 0; // Store the last recorded time

function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateStopwatchDisplay() {
    let currentTime = lastRecordedTime + Math.floor((Date.now() - stopwatchStartTime) / 1000);
    stopwatchDisplay.textContent = formatTime(currentTime);
}

function toggleStopwatch() {
    if (isStopwatchRunning) {
        clearInterval(stopwatchInterval);
        stopwatchButton.textContent = 'Start Stopwatch';
        lastRecordedTime += Math.floor((Date.now() - stopwatchStartTime) / 1000); // Store the last recorded time
    } else {
        stopwatchStartTime = Date.now();
        stopwatchInterval = setInterval(updateStopwatchDisplay, 1000);
        stopwatchButton.textContent = 'Stop Stopwatch';
    }
    isStopwatchRunning = !isStopwatchRunning;
}

stopwatchButton.addEventListener('click', toggleStopwatch);


