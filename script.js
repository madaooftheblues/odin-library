"use strict";

class Library {
  constructor() {
    this.books = [];
  }

  fetchIndex(bookID) {
    return this.books.findIndex((x) => x.id === bookID);
  }

  getBook(bookID) {
    return this.books.find((book) => book.id === bookID);
  }

  addBook(title, author, pages, read) {
    const bookObj = new Book(title, author, pages, read);
    this.books.push(bookObj);
  }

  removeBook(bookID) {
    this.books.splice(this.fetchIndex(bookID), 1);
  }
}

class Book {
  static uid = 0;
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Book.uid++;
  }
}

const opeDialogButton = document.getElementById("btn-open-dialog");
const dialogBox = document.getElementById("dialog-box");
const closeDialogButton = dialogBox.querySelector(".btn.close");

const bookshelf = document.getElementById("bookshelf");

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.info = function () {
//     return `${title} by ${author}, ${pages} pages, ${
//       read ? "completed" : "not read yet"
//     }`;
//   };
// }

function openDialog() {
  dialogBox.show();
  dialogBox.querySelector("#title").focus();
}

function closeDialog(e) {
  dialogBox.close(e.target.value);
}

function fetchID(element) {
  return parseInt(element.parentNode.getAttribute("id"));
}

function bindBook(library) {
  const bookCover = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("span");
  const pages = document.createElement("span");
  const removeButton = document.createElement("button");
  const status = document.createElement("button");

  status.classList.add("btn-read-status");
  status.addEventListener("click", (e) => {
    const targetID = fetchID(e.target);
    const book = library.getBook(targetID);
    if (book.read) {
      book.read = false;
      e.target.classList.remove("read");
      e.target.innerText = "Not Read";
      e.target.classList.add("not-read");
    } else {
      book.read = true;
      e.target.classList.add("read");
      e.target.innerText = "Read";
      e.target.classList.remove("not-read");
    }
  });

  removeButton.innerText = "-";
  removeButton.classList.add("btn", "remove", "expand", "small", "hidden");
  removeButton.addEventListener("click", (e) => {
    const targetID = fetchID(e.target);
    library.removeBook(targetID);
    e.target.parentNode.remove();
  });

  bookCover.classList.add("book");
  bookCover.append(title, author, pages, removeButton, status);

  return { bookCover, title, author, pages, removeButton, status };
}

function displayBooks() {
  bookshelf.innerText = "";
  library.books.forEach((book) => {
    const bookGUI = bindBook(library);

    bookGUI.title.innerText = book.title;
    bookGUI.author.innerText = book.author;
    bookGUI.pages.innerText = `${book.pages} pages`;
    bookGUI.status.innerText = book.read ? "Read" : "Not Read";
    bookGUI.status.classList.add(book.read ? "read" : "not-read");
    bookGUI.bookCover.setAttribute("id", book.id);

    bookshelf.append(bookGUI.bookCover);
  });
}

function fetchFormData() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readInput = document.getElementById("check-read");

  return [
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked,
  ];
}

opeDialogButton.addEventListener("click", openDialog);
closeDialogButton.addEventListener("click", closeDialog);
dialogBox.addEventListener("close", (e) => {
  if (e.target.returnValue != "submit") return;
  const form = document.querySelector(".book-form");
  const data = fetchFormData();
  library.addBook(...data);
  displayBooks();
  form.reset();
});

const library = new Library();
library.addBook("Pride and Prejudice", "Jane Austen", "300", true);
displayBooks();
