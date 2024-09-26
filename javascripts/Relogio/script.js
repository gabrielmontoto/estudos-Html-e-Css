let digitalElement = document.querySelector(".digital");
let secondPointer = document.querySelector(".p_s");
let minutePointer = document.querySelector(".p_m");
let hourPointer = document.querySelector(".p_h");

setInterval(updateClock, 1000);
updateClock();

function updateClock() {
  let dateNow = new Date();
  let hour = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  let seconds = dateNow.getSeconds();

  digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minutes)}:${fixZero(
    seconds
  )}`;

  const degreePerSecond = 360 / 60;
  let secondDegree = degreePerSecond * seconds - 90;
  let minuteDegree = degreePerSecond * minutes - 90;
  let hourDegree = (360 / 12) * hour - 90;
  secondPointer.style.transform = `rotate(${secondDegree}deg)`;
  minutePointer.style.transform = `rotate(${minuteDegree}deg)`;
  hourPointer.style.transform = `rotate(${hourDegree}deg)`;
}

function fixZero(time) {
  return time < 10 ? "0" + time : time;
}
