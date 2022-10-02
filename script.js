"use strict";

let myLibrary = [];

const opeDialogButton = document.getElementById("btn-open-dialog");
const dialogBox = document.getElementById("dialog-box");
const closeDialogButton = dialogBox.querySelector(".btn.close");

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

function randomColor() {
  const colorPalette = [
    "#000000",
    "#353935",
    "#191970",
    "#28282B",
    "#1B1212",
    "#343434",
    "#301934",
  ];
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

function openDialog() {
  dialogBox.show();
  dialogBox.querySelector("#title").focus();
}

function closeDialog(e) {
  dialogBox.close(e.target.value);
}

function displayBooks() {
  const bookshelf = document.getElementById("bookshelf");
  const bookCover = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("span");
  const pages = document.createElement("span");

  bookCover.classList.add("book");
  bookCover.style.background = randomColor();
  bookCover.style.outlineColor = bookCover.style.background;

  myLibrary.forEach((book) => {
    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = `${book.pages} pages`;

    bookCover.append(title, author, pages);
    bookshelf.append(bookCover);
  });
}

function addBookToLibrary(e) {
  if (e.target.returnValue != "submit") return;

  const form = document.querySelector(".book-form");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readInput = document.getElementById("read");

  const bookObj = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.value
  );

  myLibrary.push(bookObj);

  displayBooks();
  form.reset();
}

opeDialogButton.addEventListener("click", openDialog);
closeDialogButton.addEventListener("click", closeDialog);
dialogBox.addEventListener("close", addBookToLibrary);
