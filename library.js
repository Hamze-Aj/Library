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
    event.preventDefault(); // Prevent default form submission behavior

    // Get the user input values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('isRead').checked;

    // Create a new Book object and add it to the library array
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    // Clear the form inputs
    form.reset();

    // Display the updated list of books
    displayBooks();

    // Close the dialog after submission
    dialog.close();
});

function displayBooks() {
    // Clear the previous content to avoid duplicates
    content.innerHTML = '';

    // Loop through the library array and create cards for each book
    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Book details
        card.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
        `;

        // Delete button
        const delet = document.createElement('button');
        delet.classList.add('delete');
        delet.textContent = 'Delete';

        //read togle
        const read = document.createElement('button')
        read.classList.add('read')
        read.textContent = ('read')

        read.addEventListener('click', () => {
            book.toggleRead()
            displayBooks();
        })
        
        // Add event listener to remove the book
        delet.addEventListener('click', () => {
            myLibrary.splice(index, 1);  // Remove the book from the array
            displayBooks();  // Update the display
        });

        // Append the delete button to the card and card to the content container
        card.appendChild(read)
        card.appendChild(delet);
        content.appendChild(card);
    });
}

// Initial display of books
displayBooks();
