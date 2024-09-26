document.body.addEventListener("keyup", pressKey);
document.querySelector(".composer button").addEventListener("click", playMusic);

function pressKey(event) {
  playSound(event.code.toLowerCase());
}

function playSound(sound) {
  let audioElement = document.querySelector(`#s_${sound}`);
  let keyElement = document.querySelector(`div[data-key = "${sound}"]`);

  if (!audioElement) return;
  if (!keyElement) return;

  audioElement.currentTime = 0;
  audioElement.play();

  keyElement.classList.add("active");
  setTimeout(() => {
    keyElement.classList.remove("active");
  }, 300);
}

function playMusic() {
  let song = document.querySelector("#input").value;

  console.log(song);

  if (song === "") return;

  let songArray = song.split("");
  let wait = 0;

  for (let index = 0; index < songArray.length; index++) {
    const element = songArray[index];

    setTimeout(() => {
      playSound(`key${element}`);
    }, wait);
    wait += 300;
  }
}
