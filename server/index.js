const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors());




// get all book details.......................................

app.get('/books', (req, res) => {
  const books = getBooks();
  res.json(books);
});




// we can post author and title details

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (title && author) {
    const books = getBooks();
    const newBook = { title, author };
    books.push(newBook);
    saveBooks(books);
    res.json({ message: 'Book added successfully' });
  } else {
    res.status(400).json({ message: 'Title and author are required' });
  }
});



// delete books by index value./................


app.delete('/books/:index', (req, res) => {
  const { index } = req.params;
  const books = getBooks();
  if (index >= 0 && index < books.length) {
    books.splice(index, 1);
    saveBooks(books);
    res.json({ message: 'Book deleted successfully' });
  } else {
    res.status(400).json({ message: 'Invalid index' });
  }
});

const getBooks = () => {
  const data = fs.readFileSync('books.json');
  return JSON.parse(data);
};

const saveBooks = (books) => {
  const data = JSON.stringify(books, null, 2);
  fs.writeFileSync('books.json', data);
};

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
