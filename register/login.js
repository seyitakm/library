const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("email");
const password = document.getElementById("password");

const APIlog = "http://localhost:1717/login/";

const handleInputLog = () => {
  if (!username.value || !password.value) {
    return alert("username or password can't be empty");
  }
  let user = {
    username: username.value,
    password: password.value,
  };
  login(user);
  loginBtn.classList.add("disabled");
  loginBtn.innerText = "please wait";
  // console.log(JSON.stringify(user));
};

loginBtn.addEventListener("click", () => {
  handleInputLog();
});

async function login(user) {
  try {
    let response = await fetch(APIlog, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    let result = await response.json();
    if (result) {
      console.log(result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.data.username);
    }
    loginBtn.classList.remove("disabled");
    loginBtn.innerText = "Log in";
    redirectToLogin();
  } catch (error) {
    console.log(error);
  }
}
function redirectToLogin() {
  window.location.href = "../index.html";
}
