console.log("Library script loaded");

const myForm = document.getElementById("book-form");

class Book {
  constructor(author, title, pages, read) {
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

class Library {
  constructor() {
    this.books = [
      new Book(
        "J.K. Rowling",
        "Harry Potter and the Sorcerer's Stone",
        309,
        true
      ),
      new Book("J.R.R. Tolkien", "The Hobbit", 310, false),
      new Book("George Orwell", "1984", 328, true),
    ];
  }

  getBooks() {
    return this.books;
  }

  getLastBook(){
    return this.books[this.books.length - 1];
  }

  addBookToLibrary(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    this.books.push(newBook);
  }

  deleteBookFromLibrary(id) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    this.books.splice(bookIndex, 1);
  }

}

const myLibrary = new Library();

class displayTable {
  constructor(library) {
  const container = document.getElementById("container");
  this.table = document.createElement("table");
  const headers = ["Title", "Author", "Pages", "Read", ""];
  const headerRow = document.createElement("thead");
  const headerRowContent = document.createElement("tr");
  headerRow.appendChild(headerRowContent);
  for (let headerText of headers) {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRowContent.appendChild(header);
  }
  this.table.appendChild(headerRow);

  const bodyContent = document.createElement("tbody"); 
  for (let book of library.getBooks()) {
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

  this.table.appendChild(bodyContent);
  container.appendChild(this.table);
  }

  appendBookRow(book) {
    // const table = document.querySelector("#container table");
    const body = this.table.querySelector("tbody");
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


}


const openModal = () => {
  const modal = document.getElementById("modal");
  modal.showModal();
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.close();
};


function addRemove(rowCell) {
  const button = document.createElement("button");
  const rowParent = rowCell.parentElement;
  button.textContent = "Remove Book";
  button.addEventListener("click", function () {
    myLibrary.deleteBookFromLibrary(rowParent.id);
    const tableRow = document.getElementById(rowParent.id);
    tableRow.remove();
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


displayLibrary = new displayTable(myLibrary);

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(myForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read");
  myLibrary.addBookToLibrary(title, author, pages, read == "on");
  displayLibrary.appendBookRow(myLibrary.getLastBook());
  closeModal();
  myForm.reset();
});