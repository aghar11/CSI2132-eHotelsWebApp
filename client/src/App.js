
import './App.css';
import React, { Fragment } from 'react';


//components

import InputHotel from './components/InputHotel';
import ListHotels from "./components/ListHotels";


function App() {
  return (
    <Fragment>
      <div className = "container">
        <InputHotel />
        <ListHotels />
      </div> 
      
    </Fragment>
  );
}

export default App;
