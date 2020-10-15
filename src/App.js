import React from 'react';
import Cars from './components/Cars';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Route path='/' exact component={Cars} />
      </Router>
    </>
  );
}

export default App;
