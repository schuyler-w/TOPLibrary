const myLibrary = [];

const libGrid = document.querySelector(".container");
const dialog = document.querySelector(".book-dialog");
const form = document.querySelector(".book-form")
const cancelBtn = document.querySelector(".cancelForm")

const newBookButton = document.querySelector(".addBook")
newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", () => {
        dialog.close();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector('.book-title').value.trim();
    const author = document.querySelector('.book-author').value.trim();
    const pages = parseInt(document.querySelector('.book-pages').value, 10);
    const read = document.querySelector('.read-status').checked;

    if (title && author && pages) {
        addBookToLibrary(title, author, pages, read);
        disp();
        dialog.close();
        form.reset();
    }
})

function Book(title, author, pageCount, isRead) {

    if (!new.target) {
        throw Error();
    }
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pageCount, isRead) {
    const newBook = new Book(title, author, pageCount, isRead);
    myLibrary.push(newBook);
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
}

function disp() {
    libGrid.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");

        bookCard.dataset.id = book.id;

        const bookTitle = document.createElement("h3");
        bookTitle.classList.add("bookTitle")
        bookTitle.textContent = book.title

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("bookAuthor")
        bookAuthor.textContent = book.author;

        const pages = document.createElement("p");
        pages.classList.add("bookPages")
        pages.textContent = book.pageCount

        const buttondiv = document.createElement("div");
        buttondiv.classList.add("buttondiv");

        const toggleRead = document.createElement("button");
        toggleRead.classList.add("toggleRead");
        toggleRead.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";

        if (book.isRead) {
            bookCard.classList.add("read");
        }

        toggleRead.addEventListener("click", (e) => {
            const bookCard = e.target.closest(".bookCard");
            const bookId = bookCard.dataset.id;
            const book = myLibrary.find(b => b.id === bookId);
            
            if (book) {
                book.toggleReadStatus();
                e.target.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
                if (book.isRead) {
                    bookCard.classList.add("read");
                } else {
                    bookCard.classList.remove("read");
                }
            }
        });

        const deletebtn = document.createElement("button");
        deletebtn.classList.add("deletebtn");
        deletebtn.textContent = "Delete Book"

        deletebtn.addEventListener("click", (e) => {
            const targetCard = e.target.closest(".bookCard");
            const bookId = targetCard.dataset.id;
            const index = myLibrary.findIndex(book => book.id === bookId);
            if (index > -1) {
                myLibrary.splice(index, 1);
                disp();
            }
        });

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(pages);
        buttondiv.appendChild(toggleRead);
        buttondiv.appendChild(deletebtn);
        bookCard.appendChild(buttondiv);

        libGrid.appendChild(bookCard);
    })
}