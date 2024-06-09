import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Book } from '../types';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const useBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!loading && data) {
      setBooks(data.books);
    }
  }, [loading, data]);

  return { loading, error, books };
};

export default useBooks;
