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
    const editBook = document.createElement("button");
    const deleteBook = document.createElement("button");
    deleteBook.addEventListener("click", () => {
      deleteBookId(item.id, token);
    });
    editBook.addEventListener("click", () => {
      editBookId(item.id, token, (item.name.innerText = "hello"));
    });
    book.innerHTML = `
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
