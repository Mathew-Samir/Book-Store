import { Fragment, useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getBooks,deleteBook } from '../../store/bookSlice';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import './book.css';

const PostContainer = () => {

  const [selectedBook, setSelectedBook]=useState(null);
  const { isLoading, books } = useSelector((state) => state.books);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  
  const getBookId = (id) => {
    const selectedBook = books.find((item) => item.id === id);
    setSelectedBook((prev) => {return { ...prev, ...selectedBook }});
  };
  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList
            isLoading={isLoading}
            books={books}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBookId={getBookId}
          />
        </div>
        <div className='col '>
          <BookInfo info={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;