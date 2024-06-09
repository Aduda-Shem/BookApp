import React, { useState, useMemo } from 'react';
import { Container, TextField, Box, Alert, Autocomplete, Pagination, Typography } from '@mui/material';
import useBooks from '../hooks/useBooks';
import { Book } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import BookList from '../components/BookList';

// interface SearchOption {
//   title: string;
//   coverPhotoURL: string;
// }

const HomePage: React.FC = () => {
  const { loading, error, books } = useBooks();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSearchTerm, setSelectedSearchTerm] = useState<string | null>(null);
  const [addedBooks, setAddedBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 8;

  const handleAddBook = (book: Book) => {
    setAddedBooks([...addedBooks, book]);
  };

  const handleRemoveBook = (book: Book) => {
    setAddedBooks(addedBooks.filter((b) => b.title !== book.title));
  };

  const filteredBooks = useMemo(() => {
    if (!selectedSearchTerm) return books;
    return books.filter((book: Book) =>
      book.title.toLowerCase().includes(selectedSearchTerm.toLowerCase())
    );
  }, [books, selectedSearchTerm]);

  const searchOptions = useMemo(() => {
    return books.map(book => ({ title: book.title, coverPhotoURL: book.coverPhotoURL }));
  }, [books]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedBooks = useMemo(() => {
    const startIndex = (page - 1) * booksPerPage;
    return filteredBooks.slice(startIndex, startIndex + booksPerPage);
  }, [filteredBooks, page]);

  return (
    <Container sx={{ fontFamily: 'Mulish, sans-serif' }}>
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
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert severity="error" sx={{ fontFamily: 'Mulish, sans-serif' }}>Error loading books</Alert>
      ) : (
        <>
          <Typography variant="h4" align="center" sx={{ marginTop: '2rem', color: '#5ACCCC', fontFamily: 'Mulish, sans-serif' }}>
            Reads
          </Typography>
          <BookList books={displayedBooks} onAdd={handleAddBook} onRemove={handleRemoveBook} addedBooks={addedBooks} />
          <Box my={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredBooks.length / booksPerPage)}
              page={page}
              onChange={handleChangePage}
              color="secondary"
              sx={{ button: { fontFamily: 'Mulish, sans-serif' } }}
            />
          </Box>
          <Typography variant="h4" align="center" sx={{ marginTop: '2rem', color: '#5ACCCC', fontFamily: 'Mulish, sans-serif' }}>
            My Reading List
          </Typography>
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
