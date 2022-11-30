const booksMain = document.getElementById("books-main");
const userSpan = document.getElementById("user");
const APIbook = "http://localhost:1717/books/";

const token = localStorage.getItem("token");
const user = localStorage.getItem("username");
if (user) {
  userSpan.innerText = user;
}
getBooks(token);

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
    book.classList.add("book");
    const editBook = document.createElement("button");
    editBook.classList.add("editBtn");
    const deleteBook = document.createElement("button");
    deleteBook.classList.add("deleteBtn");

    deleteBook.addEventListener("click", () => {
      deleteBookId(item.id, token);
    });
    editBook.addEventListener("click", () => {
      editBookId(item.id, token, (item.name.innerText = "hello"));
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

const logoutBtn = document.getElementById("logoutBtn");

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "./register/login.html";
}
logoutBtn.addEventListener("click", () => {
  logout();
});
