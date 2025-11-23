console.log("Library script loaded");

const myLibrary = [
    new Book("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, true),
    new Book("J.R.R. Tolkien", "The Hobbit", 310, false),
    new Book("George Orwell", "1984", 328, true)    
];

function Book(author, title, pages, read) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    for (let book of myLibrary) {
    const newElement = document.createElement('p');
    const container = document.getElementById('container');
    newElement.textContent = `${book.title} by ${book.author}, ${book.pages} pages, Read: ${book.read}`;
    container.appendChild(newElement);
    }
}

displayLibrary();