let b = "";
let v = `${b}`;

// document.querySelectorAll()
// document.querySelector('#idName')
// document.querySelector('.className')
// document.getElementsByTagName('div')
// document.getElementById('divName')

const query = (element) => document.querySelector(element);
const queryAll = (element) => document.querySelectorAll(element);

let tittleObj = query(".tittle span");
let characterInfoObj = query(".character_info span");
let otherInfosObj = query(".other_infos");
let bottomSideObj = query(".bottom_side");
let topSideRightObj = query(".top_side_right");
let numbersAreaObj = query(".numbers_area");

let currentStep = 0;
let currentNumberSelected = "";
let white = false;
start();
nextStep();

queryAll(".teclado_botao a").forEach((item) => {
  item.addEventListener("click", beforeChooseNumber);
});

function buttonClick(number) {
  number.preventDefault();
}

function beforeChooseNumber(value) {
  value.preventDefault();

  let number = parseInt(value.target.innerHTML);
  if (number || value.target.innerHTML == "0") numbers(number);
  else {
    switch (value.target.innerHTML) {
      case "Branco":
        Branco();
        break;
      case "Corrige":
        Corrige();
        break;
      case "Confirma":
        Confirma();
        break;
    }
  }
}

function numbers(value) {
  console.log("number clicked:" + value);
  let choseNumber = query(".vote_number.highlight");

  if (choseNumber) {
    choseNumber.innerHTML = value;
    currentNumberSelected = `${currentNumberSelected}${value}`;

    choseNumber.classList.remove("highlight");
    if (choseNumber.nextElementSibling)
      choseNumber.nextElementSibling.classList.add("highlight");
    else updateInterface();
  }
}
function Branco() {
  console.log("branco");

  white = true;

  currentNumberSelected = "";
  tittleObj.style.display = "block";
  bottomSideObj.style.display = "block";
  numbersAreaObj.innerHTML = "";
  topSideRightObj.innerHTML = "";
  otherInfosObj.innerHTML =
    '<div class="aware_big highlight">VOTO EM BRANCO </div>';
}
function Corrige() {
  nextStep();

  console.log("Corrige");
}
function Confirma() {
  console.log("Confirma");

  let step = etapas[currentStep];
  if (!white && currentNumberSelected.length < step.numero) return;
  console.log("voto computado");

  currentStep++;
  if (etapas[currentStep] === undefined) {
    query(".tela").innerHTML = '<div class="gigantic highlight">FIM</div>';
    return;
  }

  nextStep();
}

function start() {
  lineItem = [];

  for (
    let index = 0;
    index < buttonContentJson[buttonContentJson.length - 1].line + 1;
    index++
  ) {
    let currentLine = query(".teclado_linha").cloneNode(true);
    lineItem.push(currentLine);
    query(".teclado").append(currentLine);
  }
  buttonContentJson.map((item, index) => {
    buttonItem = query(".teclado_botao").cloneNode(true);

    buttonItem.style.display = "flex";
    buttonItem.innerHTML = `<a href="">${item.name}</a> `;

    if (item.class != "none") buttonItem.classList.add(item.class);

    lineItem[item.line].append(buttonItem);
  });
}

function nextStep() {
  let step = etapas[currentStep];

  let numbersHtml = "";
  currentNumberSelected = "";
  white = false;

  for (let index = 0; index < step.numero; index++) {
    if (index === 0) {
      numbersHtml += '<div class="vote_number highlight"></div>';
      continue;
    }
    numbersHtml += '<div class="vote_number"></div>';
  }

  tittleObj.style.display = "none";
  characterInfoObj.innerHTML = step.titulo;
  otherInfosObj.innerHTML = "";
  bottomSideObj.style.display = "none";
  topSideRightObj.innerHTML = "";
  numbersAreaObj.innerHTML = numbersHtml;
}

function updateInterface() {
  let step = etapas[currentStep];

  let candidate = step.candidatos.filter((item) => {
    return item.numero === currentNumberSelected ? true : false;
  });

  if (candidate.length > 0) {
    let currentCandidate = candidate[0];
    tittleObj.style.display = "block";
    otherInfosObj.innerHTML = `Nome: ${currentCandidate.nome} <br/> Partido:${currentCandidate.partido}`;
    bottomSideObj.style.display = "block";

    let photosHtml = "";

    for (const key in currentCandidate.fotos) {
      if (currentCandidate.fotos[key].small) {
        photosHtml += `<div class="image_holder small"> <img src="assets/images/${currentCandidate.fotos[key].url}" alt="" /> ${currentCandidate.fotos[key].legenda} </div>`;
        continue;
      }
      photosHtml += `<div class="image_holder"> <img src="assets/images/${currentCandidate.fotos[key].url}" alt="" /> ${currentCandidate.fotos[key].legenda} </div>`;
    }

    topSideRightObj.innerHTML = photosHtml;
    return;
  }

  tittleObj.style.display = "block";
  bottomSideObj.style.display = "block";
  otherInfosObj.innerHTML = '<div class="aware_big highlight">VOTO NULO </div>';
}
