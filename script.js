"use strict";

let myLibrary = [];

const opeDialogButton = document.getElementById("btn-open-dialog");
const dialogBox = document.getElementById("dialog-box");
const closeDialogButton = dialogBox.querySelector(".btn.close");
const removeButtons = document.querySelectorAll(".btn.remove");

const bookshelf = document.getElementById("bookshelf");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "completed" : "not read yet"
    }`;
  };
}

// function randomColor() {
//   const colorPalette = [
//     "#000000",
//     "#353935",
//     "#191970",
//     "#28282B",
//     "#1B1212",
//     "#343434",
//     "#301934",
//   ];
//   return colorPalette[Math.floor(Math.random() * colorPalette.length)];
// }

function openDialog() {
  dialogBox.show();
  dialogBox.querySelector("#title").focus();
}

function closeDialog(e) {
  dialogBox.close(e.target.value);
}

function bindBook() {
  const bookCover = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("span");
  const pages = document.createElement("span");
  const removeButton = document.createElement("button");
  const status = document.createElement("button");

  status.classList.add("btn-read-status");
  status.addEventListener("click", (e) => {
    const index = Array.from(bookshelf.children).indexOf(e.target.parentNode);
    if (myLibrary[index].read) {
      myLibrary[index].read = false;
      e.target.classList.remove("read");
      e.target.innerText = "Not Read";
      e.target.classList.add("not-read");
    } else {
      myLibrary[index].read = true;
      e.target.classList.add("read");
      e.target.innerText = "Read";
      e.target.classList.remove("not-read");
    }
  });

  removeButton.innerText = "-";
  removeButton.classList.add("btn", "remove", "expand", "small", "hidden");
  removeButton.addEventListener("click", (e) => {
    myLibrary.splice(
      Array.from(bookshelf.children).indexOf(e.target.parentNode),
      1
    );
    e.target.parentNode.remove();
  });

  bookCover.classList.add("book");
  bookCover.append(title, author, pages, removeButton, status);

  return { bookCover, title, author, pages, removeButton, status };
}

function displayBooks() {
  bookshelf.innerText = "";

  myLibrary.forEach((book, index) => {
    const bookGUI = bindBook();

    bookGUI.title.innerText = book.title;
    bookGUI.author.innerText = book.author;
    bookGUI.pages.innerText = `${book.pages} pages`;
    bookGUI.status.innerText = book.read ? "Read" : "Not Read";
    bookGUI.status.classList.add(book.read ? "read" : "not-read");

    bookshelf.append(bookGUI.bookCover);
  });
}

function addBookToLibrary(title, author, pages, read) {
  const bookObj = new Book(title, author, pages, read);

  myLibrary.push(bookObj);

  displayBooks();
}

function fetchFormData() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readInput = document.getElementById("read");

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

  addBookToLibrary(...data);

  form.reset();
});

addBookToLibrary("Pride and Prejudice", "Jane Austen", "300", true);
displayBooks();
