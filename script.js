let timePassed = 0;
let timeLeft = 0;
let totalTime = 0;
let originalTotalTime = 0;
let randomSecond = 0;
let formattedTime = 0;
let sound = document.getElementById("ringSound");
let showRandomTime = 0;

// use to format the time
const timeForatter = time => {
  if(Math.floor(time/60) < 10) {
    if (time%60 < 10) {
      return `0${Math.floor(time/60)}:0${time%60}`
    } else {
      return `0${Math.floor(time/60)}:${time%60}`
    }
  } else {
    if (time%60 < 10) {
      return `${Math.floor(time/60)}:0${time%60}`
    } else {
      return `${Math.floor(time/60)}:${time%60}`
    }
  }
}

// play the ring sound
const playSound = () => {
  sound.play();
}

// time main programme
const startTimer = () => {
  timerInterval = setInterval(() => {
    timePassed++ ;
    timeLeft = totalTime - timePassed;
    if (timeLeft === 0) {
      let randomTime = Math.floor(Math.random() * randomSecond);
      document.getElementById("03").innerHTML = `<p>this time the random number is <span class="colored">${randomTime}</span></p>`;
      timeLeft = originalTotalTime + randomTime;
      totalTime = timeLeft;
      timePassed = 0;
      showRandomTime = randomTime;
      playSound();
    }
    formattedTime = timeForatter(timeLeft);
    document.getElementById('real').innerHTML = `${formattedTime}`
    document.title = `${formattedTime} R:${showRandomTime}` //change title
  }, 1000)
}

// when click start to start initialization
let start = document.getElementById('start');
let end = document.getElementById("end");
let ok = document.getElementById("ok");


start.addEventListener("click", () => {
  let min = parseInt(document.getElementById('min').value);
  let second = parseInt(document.getElementById('second').value);
  randomSecond = document.getElementById('random').value;
  originalTotalTime = min*60 + second;
  totalTime = originalTotalTime;
  if (originalTotalTime <= 0 || min === '') {
    document.getElementById("01").style.display = "none";
    document.getElementById("04").style.display = "none";
    document.getElementById("03").innerHTML = `<p class="warning">Time cannot be less than 0 second</p>`;
    ok.style.display = "block";
  } else {
    document.getElementById('real').innerHTML = timeForatter(totalTime);
    end.style.display = "block";
    document.getElementById("01").style.display = "none";
    document.getElementById("02").style.display = "block";
    randomTime = randomSecond;
    document.getElementById("03").innerHTML = `<p>this time the random number is <span class="colored">${randomTime}</span></p>`;
    document.getElementById("04").style.display = "none";
  }
});

start.addEventListener("click", startTimer);

end.addEventListener("click", () => {
  location.reload();
});

ok.addEventListener("click", () => {
  location.reload();
});
