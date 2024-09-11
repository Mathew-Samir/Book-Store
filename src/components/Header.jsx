import { useSelector } from "react-redux";


const Header = () => {
  const {error}= useSelector((state)=> state.books)
  return (
  <>
    <nav className='navbar navbar-dark bg-dark'>
      <span className='navbar-brand mb-0 h1 mx-4'>My Books</span>
      <button className='btn btn-outline-primary mx-4' type='submit'>
        Log In
      </button>
      </nav>
    {error && (
        <div className="alert alert-danger mb-0" role="alert">
      {error}
    </div> 
    )}
  </>
  );
};

export default Header;