document.querySelector(".button").addEventListener("click", buttonClick);
document
  .querySelector(".button_inserir")
  .addEventListener("click", insertEvent);

function buttonClick() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(functionCallback)
    .then((data) => {
      console.log(data);
    });
}
async function buttonClickAsync() {
  let response = fetch("https://jsonplaceholder.typicode.com/posts");
  let json = await response.json();
  console.log(json);
}

function insertEvent() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/Json" },
    body: JSON.stringify({
      tittle: "titulo de teste",
      body: "body de teste",
      userId: 2,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    });
}
function functionCallback(data) {
  return data.json();
}
