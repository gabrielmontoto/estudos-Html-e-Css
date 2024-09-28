let areas = {
  a: null,
  b: null,
  c: null,
};

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

document.querySelectorAll(".area").forEach((item) => {
  item.addEventListener("dragover", dragOver);
  item.addEventListener("dragleave", dragLeave);
  item.addEventListener("drop", drop);
});

docQuerySelector(".neutralArea").addEventListener("dragover", dragOverNeutral);
docQuerySelector(".neutralArea").addEventListener(
  "dragleave",
  dragLeaveNeutral
);
docQuerySelector(".neutralArea").addEventListener("drop", dropNeutral);

function docQuerySelector(query) {
  return document.querySelector(query);
}

function dragStart(event) {
  event.currentTarget.classList.add("dragging");
}

function dragEnd(event) {
  event.currentTarget.classList.remove("dragging");
}

function dragOver(event) {
  if (event.currentTarget.querySelector(".item") !== null) return;
  event.preventDefault();
  event.currentTarget.classList.add("hover");
}
function dragLeave(event) {
  event.currentTarget.classList.remove("hover");
}
function drop(event) {
  event.currentTarget.classList.remove("hover");
  if (event.currentTarget.querySelector(".item") !== null) return;

  let draggingItem = docQuerySelector(".item.dragging");

  event.currentTarget.appendChild(draggingItem);
  updateAreas();
}

function dragOverNeutral(event) {
  event.preventDefault();
  event.currentTarget.classList.add("hover");
}
function dragLeaveNeutral(event) {
  event.currentTarget.classList.remove("hover");
}
function dropNeutral(event) {
  event.currentTarget.classList.remove("hover");
  let draggingItem = docQuerySelector(".item.dragging");

  event.currentTarget.appendChild(draggingItem);
  updateAreas();
}

function updateAreas() {
  document.querySelectorAll(".area").forEach((item) => {
    let areaName = item.getAttribute("data-name");
    areas[areaName] =
      item.querySelector(".item") !== null
        ? item.querySelector(".item").innerHTML
        : null;
  });

  areas.a === "1" && areas.b === "2" && areas.c === "3"
    ? docQuerySelector(".areas").classList.add("correct")
    : docQuerySelector(".areas").classList.remove("correct");
}
