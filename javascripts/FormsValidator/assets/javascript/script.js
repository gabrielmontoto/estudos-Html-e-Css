let b = "";
let v = `${b}`;

// document.querySelectorAll()
// document.querySelector('#idName')
// document.querySelector('.className')
// document.getElementsByTagName('div')
// document.getElementById('divName')

let validatorFunctions = {
  validatorCheckup: (event) => {
    event.preventDefault();
    let send = true;

    let allInputs = queryAll("input");

    validatorFunctions.clearErrors();

    allInputs.forEach((input) => {
      let check = validatorFunctions.checkInput(input);
      if (check !== true) {
        send = false;
        validatorFunctions.showErrors(input, check);
      }
    });
    if (send) form.submit();
  },
  checkInput: (input) => {
    let rules = input.getAttribute("data-rules");

    let returnValue = true;

    if (rules === null) {
      return returnValue;
    }

    rules = rules.split("|");

    rules.forEach((rule) => {
      let ruleDetail = rule.split("=");

      switch (ruleDetail[0]) {
        case "required":
          if (input.value == "") {
            returnValue = "error happen required component";
          }
          break;
        case "min":
          if (input.value.length < ruleDetail[1]) {
            returnValue = "not enough characters";
          }
          break;
        case "email":
          if (input.value !== "") {
            let regex =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!regex.test(input.value.toLowerCase())) {
              returnValue = "email not allowed";
            }
          }
          break;
      }
    });
    return returnValue;
  },
  showErrors: (input, errorMessage) => {
    input.style.borderColor = "#ff0000";

    let errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.innerHTML = errorMessage;

    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },
  clearErrors: () => {
    form.querySelectorAll("input").forEach((value) => {
      value.style = "";
    });

    let allErrorElements = queryAll(".error");
    for (let index = 0; index < allErrorElements.length; index++) {
      const element = allErrorElements[index];
      element.remove();
    }
  },
};

const query = (element) => document.querySelector(element);
const queryAll = (element) => document.querySelectorAll(element);

let form = query(".validator");
form.addEventListener("submit", validatorFunctions.validatorCheckup);
