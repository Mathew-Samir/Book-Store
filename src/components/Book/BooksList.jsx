import PropTypes from 'prop-types'; // Import PropTypes for validation

const BooksList = ({ isLoading, books, dispatch, deleteBook, getBookId }) => {
  const bookList = books && books.map((item) => {
    return (
      <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
        <div>{item.title}</div>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-primary' onClick={() => getBookId(item.id)}>
            Read
          </button>
          <button type='button' className='btn btn-danger' onClick={() => dispatch(deleteBook(item.id))}>
            Delete
          </button>
        </div>
      </li>
    );
  });

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? (
        'Loading...'
      ) : (
        <ul className='list-group pb-4'>{bookList}</ul>
      )}
    </div>
  );
};

// Define the PropTypes for validation
BooksList.propTypes = {
  isLoading: PropTypes.bool.isRequired, // isLoading must be a boolean and required
  books: PropTypes.arrayOf( // books must be an array of objects with specific structure
    PropTypes.shape({
      id: PropTypes.number.isRequired, // assuming each book has an id
      title: PropTypes.string.isRequired // assuming each book has a title
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired, // dispatch must be a function and required
  deleteBook: PropTypes.func.isRequired, // deleteBook must be a function and required
  getBookId: PropTypes.func.isRequired // getBookId must be a function and required
};

export default BooksList;
