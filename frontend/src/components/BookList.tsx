import React from 'react';
import { Grid } from '@mui/material';
import { Book } from '../types';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  onAdd: (book: Book) => void;
  onRemove: (book: Book) => void;
  addedBooks: Book[];
}

const BookList: React.FC<BookListProps> = ({ books, onAdd, onRemove, addedBooks }) => {
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item key={book.title} xs={12} sm={6} md={4} lg={3}>
          <BookCard
            book={book}
            onAdd={onAdd}
            onRemove={onRemove}
            isBookAdded={addedBooks.some(b => b.title === book.title)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
