import { Fragment } from 'react';

import Header from './components/Header';
import Container from './components/Container';
import AddForm from './components/AddForm';
import BookContainer from './components/Book/BookContainer';
import './App.css'

function App() {


  return (
    <Fragment>
      <Header />
      <Container>
        <AddForm />
        <BookContainer />
      </Container>
    </Fragment>
  )
}

export default App
