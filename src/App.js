import React from 'react';
import Navbar from './Components/Navbar';
import CardList from './Components/Main';
import LoginSignupPopup from './Components/LoginSignupPopup';





const App = () => {
  return (
    <div>
      <Navbar />
    <CardList/>

    <LoginSignupPopup />
    
    </div>
  );
}

export default App;
