// 1. Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// 6. Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert Columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  // Append to the list
  list.appendChild(row);
};

// 9. Show error
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete book from UI
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// 7. Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// 2. EventListeners
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // 3. Initialize book (Initialise => Create a new book with form)
  const book = new Book(title, author, isbn);
  // 4. Initialize UI (display books after submit form)
  const ui = new UI();

  // 8.  Validate
  if (title === '' || author === '' || isbn === '') {
    // Error
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // 5. Add book to list
    ui.addBookToList(book); // we need to pass the book object to the ui
    // Clear fields
    ui.clearFields();
    // Show success
    ui.showAlert('Book added!', 'success');
  }
  // Stop loading of page
  e.preventDefault();
});

// Event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book has removed', 'success');

  e.preventDefault();
});
