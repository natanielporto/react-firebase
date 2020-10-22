import React from 'react';
import AllCars from './components/AllCars';
import Header from './components/Header';
import Search from './components/Search';
import Vote from './components/Vote';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Route path='/' exact component={AllCars} />
        <Route path='/search' component={Search} />
        <Route path='/vote/:id' component={Vote} />
      </Router>
    </>
  );
}

export default App;
