import '../../App.css';
import React, { useEffect, useState} from "react";
import FilterModal from './FilterModal';
import { Link } from 'react-router-dom';
import RoomInfoModal from './RoomInfoModal';
import RoomBookingModal from './RoomBookingModal';

function CustomerDashboard() {
    const [rooms, setRooms] = useState([]);

    const getRooms = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/room");
            const jsonData = await response.json();
            setRooms(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);


    return(
        <div className='container-fluid'>
            <h1 className= "mt-5 center">Customer Dashboard</h1>
            <div className = 'text-right mb-1'>
                <Link to='/'>
                    <button id="customerViewByAreaButton" type="button" class="btn btn-primary mr-1">Rooms By Area View</button>
                </Link>
                <Link to='/'>
                    <button id="customerViewHotelCapacityButton" type="button" class="btn btn-primary mr-1">Hotel Capacity View</button>
                </Link>
                <Link to='/'>
                    <button id="customerViewHomeButton" type="button" class="btn btn-primary">Return Home</button>
                </Link>
            </div> 
            <FilterModal/>
            <div className="table-responsive">
                <table className="table mt-3 text-centre table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Room Number</th>
                            <th>Company Name</th>
                            <th>Hotel Category</th>
                            <th>Price</th>
                            <th>Capacity</th>
                            <th>Room Type</th>
                            <th>Expandable</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {}
                        {rooms.map(room => (
                            <tr key = {room.roomnumber}>
                                <td>{room.roomnumber}</td>
                                <td>{room.companyname}</td>
                                <td>{room.hotelid}</td>
                                <td>{room.price}</td>
                                <td>{room.capacity}</td>
                                <td>{room.viewtype}</td>
                                <td>{room.expandable}</td>
                                <td>
                                    <RoomInfoModal room = {room}/>
                                </td>
                                <td>
                                    <RoomBookingModal />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerDashboard;