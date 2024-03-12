import React from 'react';
import Navbar from './Components/Navbar';
import CardList from './Components/Main';
import LoginSignupPopup from './Components/LoginSignupPopup';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import BlogMain from './Components/BlogSection/BlogMain';
import Card from './Components/Card';

const App = () => {
  return (
    <div> 
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginSignupPopup/>}/>
        <Route path='/' element={<CardList/>}/>
        <Route path='/blog' element={<BlogMain/>}/>
        <Route path='/card' element={<Card/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
