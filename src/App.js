import React from 'react';
import Navbar from './Components/Navbar';
import CardList from './Components/Main';
import LoginSignupPopup from './Components/LoginSignupPopup';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'

import Card from './Components/Card';
import ForgotPassword from './Components/ForgotPassword';
import TextEditor from './Components/BlogSection/Editor/TextEditor';


const App = () => {
  return (
    <div> 
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginSignupPopup/>}/>
        <Route path='/' element={<CardList/>}/>
        {/* <Route path='/blog' element={<BlogMain/>}/> */}
        <Route path ='/blog' element={<TextEditor />} />
        <Route path='/card' element={<Card/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
