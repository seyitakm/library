const booksMain = document.getElementById("books-main");
const userSpan = document.getElementById("user");
const APIbook = "http://localhost:1717/books/";

// GET USER
const token = localStorage.getItem("token");
const user = localStorage.getItem("username");
if (user) {
  userSpan.innerText = user;
}
getBooks(token);
// GET USER END

// READ
async function getBooks(token) {
  try {
    let response = await fetch(APIbook, {
      method: "GET",
      headers: {
        "X-Auth": token,
      },
    });
    let result = await response.json();
    // console.log(result);
    if (result) {
      const mapped = result.map((item) => {
        return item;
      });
      console.log(mapped);
      mapBooks(mapped);
    }
  } catch (error) {
    console.log(error);
  }
}
function mapBooks(mapped) {
  console.log(mapped);
  mapped.forEach((item) => {
    const book = document.createElement("div");
    const deleteBook = document.createElement("button");
    const editBook = document.createElement("button");
    book.classList.add("book");
    editBook.classList.add("editBtn");
    deleteBook.classList.add("deleteBtn");

    deleteBook.addEventListener("click", () => {
      deleteBookId(item.id, token);
    });
    editBook.addEventListener("click", () => {
      getOneBook(item.id, token);
      // editBookId(item.id, token, (item.name.innerText = "hello"));
    });
    book.innerHTML = `
    <img src=${item.img} />
      <h3>${item.name}</h3>
      <p>${item.author}</p>
        `;
    booksMain.append(book);
    editBook.innerText = "Edit";
    deleteBook.innerText = "Delete";
    deleteBook.classList.add("deleteBook");
    book.append(editBook);
    book.append(deleteBook);
  });
}
// READ END

// CREATE
const form = document.getElementById("createBook");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inpName = document.getElementById("formInp1");
  const inpAuthor = document.getElementById("formInp2");
  const inpPublishYear = document.getElementById("formInp3");
  const inpPublishHouse = document.getElementById("formInp4");
  const inpPagesNumber = document.getElementById("formInp5");
  const img = document.getElementById("formInp6");

  const book = {
    name: inpName.value,
    author: inpAuthor.value,
    publishYear: +inpPublishYear.value,
    publishHouse: inpPublishHouse.value,
    pagesNumber: +inpPagesNumber.value,
    img: img.value,
  };

  createBook(token, book);
});
async function createBook(token, book) {
  try {
    let response = await fetch(`${APIbook}create/`, {
      method: "POST",
      headers: {
        "X-Auth": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
// CREATE END

// DELETE
async function deleteBookId(id, token) {
  console.log(id);
  console.log(token);

  try {
    let response = await fetch(`${APIbook}delete/${id}`, {
      method: "DELETE",
      headers: {
        "X-Auth": token,
      },
    });
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
// DELETE END

// EDIT
async function getOneBook(id, token) {
  try {
    let response = await fetch(`${APIbook}${id}`, {
      method: "GET",
      headers: {
        "X-Auth": token,
      },
    });
    let result = await response.json();
    console.log(result);
    showEditModal(result);
  } catch (error) {
    console.log(error);
  }
  function showEditModal(result) {
    const editName = document.getElementById("editName");
    const editAuthor = document.getElementById("editAuthor");
    const editPublishYear = document.getElementById("editPublishYear");
    const editPublishHouse = document.getElementById("editPublishHouse");
    const editPublishNumber = document.getElementById("editPublishNumber");
    const editImage = document.getElementById("editImage");

    editName.value = result.name;
    editAuthor.value = result.author;
    // editPublishYear.value = result.publishYear;
    // editPublishHouse.value = result.publishHouse;
    // editPublishNumber.value = result.publishNumber;
    // editImage.value = result.img;

    const editBookModal = document.getElementById("editBookModal");
    const editBookOverlay = document.getElementById("editBookOverlay");
    editBookModal.classList.add("showModal");

    editBookOverlay.addEventListener("click", () => {
      editBookModal.classList.remove("showModal");
    });
  }
}
async function editBookId(id, token, newBook) {
  console.log(id);
  console.log(token);

  try {
    let response = await fetch(
      `${APIbook}update/${id}`,
      {
        method: "PATCH",
        headers: {
          "X-Auth": token,
        },
      },
      JSON.stringify(newBook)
    );
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
// EDIT END

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "./register/login.html";
}
logoutBtn.addEventListener("click", () => {
  logout();
});
// LOGOUT END
