import React, { useState, useMemo } from 'react';
import { Container, TextField, Box, Alert, Autocomplete, Pagination, Typography } from '@mui/material';
import useBooks from '../hooks/useBooks';
import { Book } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import BookList from '../components/BookList';


const HomePage: React.FC = () => {
  // Custom hook to fetch books data
  const { loading, error, books } = useBooks();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSearchTerm, setSelectedSearchTerm] = useState<string | null>(null);
  const [addedBooks, setAddedBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  
  // Number of books to display per page
  const booksPerPage = 8; 

  // Function to handle adding a book to the reading list
  const handleAddBook = (book: Book) => {
    setAddedBooks([...addedBooks, book]);
  };

  // Function to handle removing a book from the reading list
  const handleRemoveBook = (book: Book) => {
    setAddedBooks(addedBooks.filter((b) => b.title !== book.title));
  };

  // Memoized function to filter books
  const filteredBooks = useMemo(() => {
    if (!selectedSearchTerm) return books;
    return books.filter((book: Book) =>
      book.title.toLowerCase().includes(selectedSearchTerm.toLowerCase())
    );
  }, [books, selectedSearchTerm]);

  // Memoized function to create search options
  const searchOptions = useMemo(() => {
    return books.map(book => ({ title: book.title, coverPhotoURL: book.coverPhotoURL }));
  }, [books]);

  // Function to handle page change in pagination
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedBooks = useMemo(() => {
    const startIndex = (page - 1) * booksPerPage;
    return filteredBooks.slice(startIndex, startIndex + booksPerPage);
  }, [filteredBooks, page]);

  return (
    <Container sx={{ fontFamily: 'Mulish, sans-serif' }}>
      {/* Search bar with autocomplete functionality */}
      <Box my={2} sx={{ background: 'linear-gradient(to right, #FF6B6B, #FFD93D)', borderRadius: '20px', padding: '1rem' }}>
        <Autocomplete
          freeSolo
          options={searchOptions}
          getOptionLabel={(option) => typeof option === 'string' ? option : option.title}
          value={searchTerm}
          onChange={(event, newValue) => {
            const newTitle = (typeof newValue === 'string') ? newValue : newValue?.title || '';
            setSearchTerm(newTitle);
            setSelectedSearchTerm(newTitle);
          }}
          inputValue={searchTerm}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
          }}
          renderOption={(props, option) => {
            const displayOption = typeof option === 'string' ? { title: option, coverPhotoURL: '' } : option;
            return (
              <Box component="li" {...props}>
                {displayOption.coverPhotoURL && (
                  <img
                    src={`/${displayOption.coverPhotoURL}`}
                    alt={displayOption.title}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                )}
                {displayOption.title}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for Books"
              variant="outlined"
              fullWidth
              placeholder="Enter book title..."
              sx={{ backgroundColor: 'white', borderRadius: 20, fontFamily: 'Mulish, sans-serif' }}
            />
          )}
        />
      </Box>
      {/* Loading spinner or error message */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert severity="error" sx={{ fontFamily: 'Mulish, sans-serif' }}>Error loading books</Alert>
      ) : (
        <>
          {/* Title for the book list */}
          <Typography variant="h4" align="center" sx={{ marginTop: '2rem', color: '#5ACCCC', fontFamily: 'Mulish, sans-serif' }}>
            Reads
          </Typography>
          {/* Book list component */}
          <BookList books={displayedBooks} onAdd={handleAddBook} onRemove={handleRemoveBook} addedBooks={addedBooks} />
          {/* Pagination control */}
          <Box my={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredBooks.length / booksPerPage)}
              page={page}
              onChange={handleChangePage}
              color="secondary"
              sx={{ button: { fontFamily: 'Mulish, sans-serif' } }}
            />
          </Box>
          {/* Title for the reading list */}
          <Typography variant="h4" align="center" sx={{ marginTop: '2rem', color: '#5ACCCC', fontFamily: 'Mulish, sans-serif' }}>
            My Reading List
          </Typography>
          {/* Display message if the reading list is empty or render the reading list */}
          {addedBooks.length === 0 ? (
            <Typography align="center" sx={{ color: '#335C6E', fontFamily: 'Mulish, sans-serif' }}>
              Your reading list is empty.
            </Typography>
          ) : (
            <BookList books={addedBooks} onAdd={handleAddBook} onRemove={handleRemoveBook} addedBooks={addedBooks} />
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
