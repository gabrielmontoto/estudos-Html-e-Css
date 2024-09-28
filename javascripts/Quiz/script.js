let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();
docQuerySelector(".scoreArea button").addEventListener("click", reset);

function showQuestion() {
  if (!questions[currentQuestion]) {
    finishQuiz();
    return;
  }

  let currentSelectedQuestion = questions[currentQuestion];

  let barProgress = Math.floor((currentQuestion / questions.length) * 100);

  docQuerySelector(".progress--bar").style.width = `${barProgress}%`;

  docQuerySelector(".scoreArea").style.display = "none";
  docQuerySelector(".questionArea").style.display = "block";

  docQuerySelector(".question").innerHTML = currentSelectedQuestion.question;

  let optionHTML = "";
  for (const key in currentSelectedQuestion.options) {
    optionHTML += `<div data-op='${key}' class='option'><span>${
      parseInt(key) + 1
    }</span>${currentSelectedQuestion.options[key]}</div>`;
  }
  docQuerySelector(".options").innerHTML = optionHTML;

  document.querySelectorAll(".options .option").forEach((item) => {
    item.addEventListener("click", optionClickEvent);
  });
}
function optionClickEvent(event) {
  let clickedOption = parseInt(event.target.getAttribute("data-op"));
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }
  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if (points <= 30) {
    docQuerySelector(".scoreText1").innerHTML = `é...`;
    docQuerySelector(".scorePct").style.color = "#e94646";
  } else if (points > 30 && points < 60) {
    docQuerySelector(".scoreText1").innerHTML = `ok`;
    docQuerySelector(".scorePct").style.color = "#a5b45f";
  } else {
    docQuerySelector(".scoreText1").innerHTML = `parabens`;
    docQuerySelector(".scorePct").style.color = "#65cc2a";
  }

  docQuerySelector(".scorePct").innerHTML = `acertou ${points}%`;
  docQuerySelector(
    ".scoreText2"
  ).innerHTML = `voce respondeu ${questions.length} e acertou ${correctAnswers}`;

  docQuerySelector(".questionArea").style.display = "none";
  docQuerySelector(".scoreArea").style.display = "block";
  docQuerySelector(".progress--bar").style.width = `100%`;
}
function docQuerySelector(query) {
  return document.querySelector(query);
}
function reset() {
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}
