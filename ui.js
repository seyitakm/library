const searchIcon = document.getElementById("searchIcon");
const inputSearch = document.getElementById("inputSearch");

searchIcon.addEventListener("mouseenter", () => {
  inputSearch.classList.add("showInput");
});
// inputSearch.addEventListener("mouseleave", () => {
//   inputSearch.classList.remove("showInput");
// });
const userEmail = document.getElementById("userEmail");
const userModal = document.getElementById("userModal");

userEmail.addEventListener("mouseenter", () => {
  userModal.classList.add("showUserModal");
});

userModal.addEventListener("mouseleave", () => {
  userModal.classList.remove("showUserModal");
});

const addBookModal = document.getElementById("addBookModal");
const addBookBtn = document.getElementById("addBookBtn");
const createBookForm = document.getElementById("createBook");
const addBookOverlay = document.getElementById("addBookOverlay");

addBookBtn.addEventListener("click", () => {
  addBookModal.classList.add("showModal");
});

addBookOverlay.addEventListener("click", () => {
  addBookModal.classList.remove("showModal");
});
