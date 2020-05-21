// 1. Book Class: Represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// 2. UI Class: Handle UI tasks
class UI {
  static displayBooks() {
    /*
    const StoredBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: '33234',
      },
      {
        title: 'Book Two',
        author: 'Jana Bett',
        isbn: '87698',
      },
    ];
    // Store into books array
    const books = StoredBooks;
    */

    const books = Store.getBooks();

    // Loop through books with addBookToList function
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    // Grab the book-list ID
    const list = document.getElementById('book-list');
    // Create list to display book info
    const row = document.createElement('tr');
    // Add HTML column
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    // Append row to the book-list
    list.appendChild(row);
  }

  static deleteBook(el) {
    // Make sure that there is delete class before to delete the line
    if (el.classList.contains('delete')) {
      // Select the parent Element => row
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  static showAlert(message, className) {
    // Create new div
    const div = document.createElement('div');
    // Add classname alert AND alert-danger or alert-success
    div.className = `alert alert-${className}`;
    // Add text inside div
    div.appendChild(document.createTextNode(message));
    // Insert after <h1></h1>
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    // In container, insert div before form
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
}

// 3. Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    // Push book into books array
    books.push(book);
    // Set item
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    // Get the book
    const books = Store.getBooks();
    // Loop through books
    books.forEach((book, index) => {
      // Check if isbn inside LS equal to isbn
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    // Re-set LocalStorage
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// 4. Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// 5. Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Insert showAlert
    UI.showAlert('Please fill all fields', 'danger');
  } else {
    UI.showAlert('Book added', 'success');

    // Instantiate book
    const book = new Book(title, author, isbn);
    // console.log(book);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to LS
    Store.addBook(book);

    // Clear all fields
    UI.clearFields();
  }
});

// 6. Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e) => {
  //   console.log(e.target);
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from LS => select the <td> contains isbn
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show alert when book removed
  UI.showAlert('Book removed', 'success');
});
