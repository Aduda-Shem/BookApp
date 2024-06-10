import React, { useState, useMemo } from 'react';
import {
  Container,
  TextField,
  Box,
  Alert,
  Autocomplete,
  Pagination,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Button,
} from '@mui/material';
import useBooks from '../hooks/useBooks';
import { Book } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import BookList from '../components/BookList';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

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
    return books.map((book) => ({ title: book.title, coverPhotoURL: book.coverPhotoURL }));
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
    <ThemeProvider theme={theme}>
      <Container sx={{ fontFamily: 'Mulish, Arial, sans-serif', backgroundColor: theme.palette.background.default }}>
        {/* Search bar with autocomplete functionality */}
        <Box
          my={2}
          sx={{
            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: '20px',
            padding: '1rem',
          }}
        >
          <Autocomplete
            freeSolo
            options={searchOptions}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
            value={searchTerm}
            onChange={(event, newValue) => {
              const newTitle = typeof newValue === 'string' ? newValue : newValue?.title || '';
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
                sx={{ backgroundColor: 'white', borderRadius: 20, fontFamily: 'Mulish, Arial, sans-serif' }}
              />
            )}
          />
        </Box>
        {/* Loading spinner or error message */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Alert severity="error" sx={{ fontFamily: 'Mulish, Arial, sans-serif' }}>Error loading books</Alert>
        ) : (
          <Grid container spacing={2}>
            {/* Book list container */}
            <Grid item xs={12} md={8}>

              <BookList books={displayedBooks} onAdd={handleAddBook} onRemove={handleRemoveBook} addedBooks={addedBooks} />
              <Box my={4} display="flex" justifyContent="center">
                <Pagination
                  count={Math.ceil(filteredBooks.length / booksPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="secondary"
                  sx={{ button: { fontFamily: 'Mulish, Arial, sans-serif' } }}
                />
              </Box>
            </Grid>
            {/* Reading list container */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: '20px',
                  padding: '1rem',
                  maxHeight: '700px',
                  overflowY: 'auto',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{ marginTop: '2rem', color: theme.palette.primary.main, fontFamily: 'Mulish, Arial, sans-serif' }}
                  >
                    My Reading List
                  </Typography>
                  {addedBooks.length === 0 ? (
                    <Typography align="center" sx={{ color: theme.palette.text.primary, fontFamily: 'Mulish, Arial, sans-serif' }}>
                      Your reading list is empty.
                    </Typography>
                  ) : (
                    <List>
                      {addedBooks.map((book) => (
                        <ListItem key={book.title} sx={{ fontFamily: 'Mulish, Arial, sans-serif' }}>
                          <ListItemAvatar>
                            <Avatar src={book.coverPhotoURL} alt={book.title} />
                          </ListItemAvatar>
                          <ListItemText primary={book.title} />
                          <ListItemIcon>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleRemoveBook(book)}
                              sx={{ fontFamily: 'Mulish, Arial, sans-serif' }}
                            >
                              Remove
                            </Button>
                          </ListItemIcon>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
