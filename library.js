const add = document.getElementById('add');
const dialog = document.getElementById('userDialog');
const submit = document.getElementById('submit');
const form = document.getElementById('form');
const content = document.querySelector('.content');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author} has ${this.pages} pages, read: ${this.read}`;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;  
};

const myLibrary = [];

const richDadBoorDad = new Book('Rich Dad Poor Dad', 'Robert Kiyosaki', 445, true);
const tijabo = new Book('Tijabo', 'Author Name', 770, false);

myLibrary.push(richDadBoorDad);
myLibrary.push(tijabo);

add.addEventListener('click', () => {
    dialog.showModal();
});

submit.addEventListener('click', (event) => {
    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('isRead').checked;

    
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    
    form.reset();
    displayBooks();
    dialog.close();
});

function displayBooks() {
    
    content.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
        `;

        const delet = document.createElement('button');
        delet.classList.add('delete');
        delet.textContent = 'Delete';

        const read = document.createElement('button')
        read.classList.add('read')
        read.textContent = ('read')

        read.addEventListener('click', () => {
            book.toggleRead()
            displayBooks();
        })
        
        delet.addEventListener('click', () => {
            myLibrary.splice(index, 1);  
            displayBooks();  
        });

        card.appendChild(read)
        card.appendChild(delet);
        content.appendChild(card);
    });
}

// Initial display of books
displayBooks();
