console.log("Library script loaded");

const myForm = document.getElementById('book-form');

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
    const container = document.getElementById('container');
    const table = document.createElement("table");  
    const headers = ["Title", "Author", "Pages", "Read"];
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
        for(let key in book){
            if(key === "id"){
                continue
            } 
            const tdata = document.createElement("td");
            tdata.textContent = book[key];
            bodyRowContent.appendChild(tdata)
        }
        bodyContent.appendChild(bodyRowContent);
    }
    
    table.appendChild(bodyContent);
    container.appendChild(table);
}

function appendBookRow(book){
    const table = document.querySelector("#container table");
    const body = table.querySelector("tbody");
    const bodyRowContent = document.createElement("tr");
    for(let key in book){
        if(key === "id"){
                continue
            } 
            const tdata = document.createElement("td");
            tdata.textContent = book[key];
            bodyRowContent.appendChild(tdata)
    }
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




displayLibrary();