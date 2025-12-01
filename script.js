console.log("Library script loaded");

const myForm = document.getElementById("book-form");

class Book {
  constructor(author, title, pages, read){
      this.id = crypto.randomUUID();
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

const myLibrary = [
  new Book("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, true),
  new Book("J.R.R. Tolkien", "The Hobbit", 310, false),
  new Book("George Orwell", "1984", 328, true),
];



function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
}

function displayLibrary() {
  const container = document.getElementById("container");
  const table = document.createElement("table");
  const headers = ["Title", "Author", "Pages", "Read", ""];
  const headerRow = document.createElement("thead");
  const headerRowContent = document.createElement("tr");
  headerRow.appendChild(headerRowContent);
  for (let headerText of headers) {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRowContent.appendChild(header);
  }
  table.appendChild(headerRow);

  const bodyContent = document.createElement("tbody");
  for (let book of myLibrary) {
    const bodyRowContent = document.createElement("tr");
    for (let key in book) {
      if (typeof book[key] === "function") {
        continue;
      } else if (key === "id") {
        bodyRowContent.id = book[key];
        continue;
      } else {
        const tdata = document.createElement("td");
        tdata.textContent = book[key];
        bodyRowContent.appendChild(tdata);
      }
    }
    const tdbuddons = document.createElement("td");
    bodyRowContent.appendChild(tdbuddons);
    addRemove(tdbuddons);
    toggleButton(book, tdbuddons);
    bodyContent.appendChild(bodyRowContent);
  }

  table.appendChild(bodyContent);
  container.appendChild(table);
}

function appendBookRow(book) {
  const table = document.querySelector("#container table");
  const body = table.querySelector("tbody");
  const bodyRowContent = document.createElement("tr");
  for (let key in book) {
    if (typeof book[key] === "function") {
      continue;
    } else if (key === "id") {
      bodyRowContent.id = book[key];
      continue;
    } else {
      const tdata = document.createElement("td");
      tdata.textContent = book[key];
      bodyRowContent.appendChild(tdata);
    }
  }
  const tdbuddons = document.createElement("td");
  bodyRowContent.appendChild(tdbuddons);
  addRemove(tdbuddons);
  toggleButton(book, tdbuddons);
  body.appendChild(bodyRowContent);
}

const openModal = () => {
  const modal = document.getElementById("modal");
  modal.showModal();
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.close();
};

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(myForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read");
  addBookToLibrary(title, author, pages, read == "on");
  appendBookRow(myLibrary[myLibrary.length - 1]);
  closeModal();
  myForm.reset();
});

function addRemove(rowCell) {
  const button = document.createElement("button");
  const rowParent = rowCell.parentElement;
  button.textContent = "Remove Book";
  button.addEventListener("click", function () {
    deleteBook(rowParent.id);
  });
  rowCell.appendChild(button);
}

function toggleButton(book, bodyRowContent) {
  const button = document.createElement("button");
  button.textContent = "Toggle Read";
  const rowParent = bodyRowContent.parentElement;
  button.addEventListener("click", function () {
    book.toggleRead();
    rowParent.cells[3].textContent = book.read;
  });
  bodyRowContent.appendChild(button);
}

function deleteBook(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(bookIndex, 1);
  const tableRow = document.getElementById(id);
  tableRow.remove();
}

displayLibrary();
