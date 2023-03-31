import React, {Fragment, useState} from "react"
import { Link } from 'react-router-dom'
import ListHotels from "./hotelComponents/ListHotels";
import ListHeadquarter from "./headquarterComponents/ListHeadquarter"
import EmployeeRoomView from "./roomManagementComponents/EmployeeRoomView";


const EmployeeView = () => {
    
    const [showRooms, setShowRooms] = useState(false);
    const [showHotels, setShowHotels] = useState(false);
    const [showEmployees, setShowEmployees] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);
    const [showHeadquarters, setShowHeadquarters] = useState(false);

    const handleEmployeeClick = () => {
        setShowRooms(false);
        setShowHotels(false);
        setShowEmployees(true);
        setShowCustomers(false);
        setShowHeadquarters(false);
    }
    
    const handleCustomerClick = () => {
        setShowRooms(false);
        setShowHotels(false);
        setShowEmployees(false);
        setShowCustomers(true);
        setShowHeadquarters(false);
    }

    const handleHeadquartersClick = () => {
        setShowRooms(false);
        setShowHotels(false);
        setShowEmployees(false);
        setShowCustomers(false);
        setShowHeadquarters(true);
    }

    const handleHotelClick = () => {
        setShowRooms(false);
        setShowHotels(true);
        setShowEmployees(false);
        setShowCustomers(false);
        setShowHeadquarters(false);
    }

    const handleRoomClick = () => {
        setShowRooms(true);
        setShowHotels(false);
        setShowEmployees(false);
        setShowCustomers(false);
        setShowHeadquarters(false);
    }

    return (
        <div className="container-fluid">
            <h1 className= "mt-3 text-centre">Employee View </h1>
            <table>
                <td>
                <Link to='/'>
                <button id="homeButton" type="button" class="btn btn-success">Return Home</button>
                </Link>
                </td>
                <td><button id="homeButton" type="button" class="btn btn-success" onClick={() => handleEmployeeClick()}>Employees</button></td>
                <td><button id="homeButton" type="button" class="btn btn-success" onClick={() => handleCustomerClick()}>Customers</button></td>
                <td><button id="homeButton" type="button" class="btn btn-success" onClick={() => handleHeadquartersClick()}>Headquarters</button></td>
                <td><button id="homeButton" type="button" class="btn btn-success" onClick={() => handleHotelClick()}>Hotels</button></td>
                <td><button id="homeButton" type="button" class="btn btn-success" onClick={() => handleRoomClick()}>Rooms</button></td>
            </table>
            <div className="container-fluid">
                {showHotels &&(
                    <Fragment>
                        <ListHotels/>
                    </Fragment>
                )}
                {showRooms &&(
                    <Fragment>
                        <EmployeeRoomView/>
                    </Fragment>
                )}
                {showEmployees &&(
                    <Fragment>
                        <ListHotels/>
                    </Fragment>
                )}
                {showCustomers &&(
                    <Fragment>
                        <ListHotels/>
                    </Fragment>
                )}
                {showHeadquarters &&(
                    <Fragment>
                        <ListHeadquarter/>
                    </Fragment>
                )}
            </div>
            
        </div>
    );
};

export default EmployeeView;