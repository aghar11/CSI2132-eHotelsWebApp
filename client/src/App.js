
import './App.css';
import React, { Fragment } from 'react';


//components
import InputHotel from './components/hotelComponents/InputHotel';
import ListHotels from "./components/hotelComponents/ListHotels";


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
