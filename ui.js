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
