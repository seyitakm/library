const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const age = document.getElementById("age");
const successModal = document.querySelector(".successModal");
const errorSpan = document.getElementById("errorSpan");

const handleInput = () => {
  if (!username.value || !password.value) {
    return alert("username or password can't be empty");
  }
  let user = {
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    age: age.value,
  };
  register(user);
  registerBtn.classList.add("disabled");
  registerBtn.innerText = "please wait";
  console.log(JSON.stringify(user));
};

registerBtn.addEventListener("click", () => {
  handleInput();
});

const API = "http://localhost:1717/signin/";

async function register(user) {
  try {
    let response = fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    const res = await response;
    registerBtn.classList.remove("disabled");
    registerBtn.innerText = "register";
    showSuccess();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
function redirectToLogin() {
  window.location.href = "./login.html";
}
function showSuccess() {
  successModal.classList.add("showSuccessModal");
  setTimeout(redirectToLogin, 3000);
}
