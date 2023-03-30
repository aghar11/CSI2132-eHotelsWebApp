import './App.css';
import Main from "./Main";
import React, { Fragment, useState } from 'react';

//components
import InputRoom from './components/CustomerView/roomBookingComponents/InputRoom';
import ListRooms from "./components/CustomerView/roomBookingComponents/ListRooms";
import InputHotel from './components/EmployeeView/hotelComponents/InputHotel';
import EmployeeView from './components/EmployeeView/EmployeeView';

function App() {
  const [showRoomInput, setShowRoomInput] = useState(false);
  const [showHotelInput, setShowHotelInput] = useState(false);
  const [showHotelList, setShowHotelList] = useState(false);
  const [showRoomList, setShowRoomList] = useState(false);
  const [showHome, setShowHome] = useState(false)

  const handleHomeClick = () => {
    setShowRoomInput(false);
    setShowRoomList(false);
    setShowHotelInput(false);
    setShowHotelList(false);
  }

  const handleRoomClick = () => {
    setShowRoomInput(true);
    setShowRoomList(true);
    setShowHotelInput(false);
    setShowHotelList(false);
  }

  const handleHotelClick = () => {
    setShowHotelInput(true);
    setShowHotelList(true);
    setShowRoomInput(false);
    setShowRoomList(false);
    
  }

  return (
    <div className="container">
      <Main />
      {showRoomInput && showRoomList && (
        <Fragment>
          <InputRoom />
          <ListRooms />
        </Fragment>
      )}
      {showHotelInput && showHotelList && (
        <Fragment>
          <InputHotel />
          <EmployeeView />
        </Fragment>
      )}
    </div> 
  );
}

export default App;
