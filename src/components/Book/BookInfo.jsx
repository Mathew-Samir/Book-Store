import { Fragment } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const BookInfo = ({ info }) => {
  // Check if info is null or undefined and handle it accordingly
  if (!info) {
    return (
      <Fragment>
        <h2>Book Details</h2>
        <div className='alert alert-secondary' role='alert'>
          There is no post selected yet. Please select!
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h2>Book Details</h2>
      <div>
        <p className='fw-bold'>Title: {info.title}</p>
        <p className='fw-bold'>Description: {info.description}</p>
        <p className='fw-bold'>Price: {info.price} $</p>
      </div>
    </Fragment>
  );
};

// Define prop types for the info object
BookInfo.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Can be a string or number
  }),
};

export default BookInfo;
