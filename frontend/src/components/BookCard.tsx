import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onAdd: (book: Book) => void;
  onRemove: (book: Book) => void;
  isBookAdded: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAdd, onRemove, isBookAdded }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      {/* Displays the cover image of the book */}
      <CardMedia
        component="img"
        height="140"
        image={`/${book.coverPhotoURL}`}
        alt={book.title}
      />
      {/* Displays the title and author of the book */}
      <CardContent>
        <Typography variant="h5" component="h2">
          {book.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {book.author}
        </Typography>
      </CardContent>
      {/* Button to add or remove the book from the reading list */}
      <Box sx={{ mt: 'auto' }}>
        <Button
          variant={isBookAdded ? "contained" : "outlined"}
          color="primary"
          fullWidth
          onClick={() => isBookAdded ? onRemove(book) : onAdd(book)}
          sx={{ borderRadius: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          aria-label={isBookAdded ? `Remove ${book.title} from Reading List` : `Add ${book.title} to Reading List`}
        >
          {isBookAdded ? "Remove from Reading List" : "Add to Reading List"}
        </Button>
      </Box>
    </Card>
  );
};

// React.memo prevents unnecessary re-renders if the props don't change.
export default React.memo(BookCard);
