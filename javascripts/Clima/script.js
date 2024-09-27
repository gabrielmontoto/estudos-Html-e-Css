document.querySelector(".busca").addEventListener("submit", newFunction);

async function newFunction(event) {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input === "") return;
  clearInfo();
  showWarning("carregando...");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input
  )}&appid=5397a8fa374e66c7f308200127b86342&units=metrics&lang=pt_br`;

  let result = await fetch(url);
  let json = await result.json();

  console.log(json);

  if (json.cod !== 200) {
    clearInfo();
    showWarning("não encontramos essa localização");
    return;
  }
  showInfo({
    name: json.name,
    country: json.sys.country,
    temp: (json.main.temp / 10).toFixed(1),
    tempIcon: json.weather[0].icon,
    windSpeed: json.wind.speed,
    windAngle: json.wind.deg,
  });
}

function showInfo(json) {
  showWarning("");
  document.querySelector(".resultado").style.display = "block";

  docQuerySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
  docQuerySelector(".tempInfo").innerHTML = `${json.temp} <sup> °C</sup>`;
  docQuerySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;
  docQuerySelector(".temp img").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
  );

  docQuerySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function docQuerySelector(query) {
  return document.querySelector(query);
}

function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}
