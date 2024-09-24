let b = "";
let v = `${b}`;

// document.querySelectorAll()
// document.querySelector('#idName')
// document.querySelector('.className')
// document.getElementsByTagName('div')
// document.getElementById('divName')

document.querySelector("#insert_button").addEventListener("click", sendPost);

function sendPost() {
  let tittle = document.querySelector("#tittle_field").value;
  let body = document.querySelector("#body_field").value;

  if (!body || !tittle) {
    alert("campo nao preenchido");
    return;
  }

  addNewPost(tittle, body);
}
async function addNewPost(tittle, body) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tittle,
      body: body,
      userId: 2,
    }),
  });

  document.querySelector("#tittle_field").value = "";
  document.querySelector("#body_field").value = "";
  readPosts();
}

async function readPosts() {
  let postArea = document.querySelector(".posts");
  postArea.innerHTML = "Carregando...";

  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let jsonBody = await response.json();

  if (jsonBody.length <= 0) {
    postArea.innerHTML = "Erro ao carregar os posts...";
    return;
  }

  postArea.innerHTML = "";

  for (let index = 0; index < jsonBody.length; index++) {
    const element = jsonBody[index];
    let postHtml = `<div> <h1>${element.title} </h1>${element.body} <hr/></div>`;
    postArea.innerHTML += postHtml;
  }
}

readPosts();
