import '../../App.css';
import React, { useEffect, useState} from "react";
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


    const [checkInDate, setCheckInDate] = useState("checkInDate");
    const [checkOutDate, setCheckOutDate] = useState("checkOutDate");
    const [roomCapacity, setRoomCapacity] = useState("roomCapacity");
    const [city, setCity] = useState("city");
    const [companyName, setCompanyName] = useState("companyName");
    const [category, setCategory] = useState("category");
    const [totalNumberOfRooms, setTotalNumberOfRooms] = useState("totalNumberOfRooms");
    const [price, setPrice] = useState("price");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            /**
             
            const body = {roomNumber, companyName, hoteID, price, capacity, viewType, expandable};
            const response = await fetch("http://localhost:5000/api/room", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
            * 
             */
        } catch (error) {
            console.error(error.message);
        }
    }

    const [selectedRoom, setSelectedRoom] = useState([]);
    const [roomAmenities, setRoomAmenities] = useState([]);

    const getRoomAmenities = async (room) => {
        try {
            const body = {"roomNumber": room.roomnumber, "hotelID": room.hotelID, "companyName": room.companyname}
            console.log(body);
            const response = await fetch(`http://localhost:5000/api/room/amenity/${room.roomnumber}/${room.hotelID}/${room.companyname}`);
            const jsonData = await response.json()
            setRoomAmenities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const [roomIssues, setRoomIssues] = useState([])

    const getRoomIssues = async (room) => {
        try {
            const body = {"roomNumber": room.roomnumber, "hotelID": room.hotelid, "companyName": room.companyname}
            console.log(JSON.stringify(body));
            const response = await fetch(`http://localhost:5000/api/room/issue/${room.roomnumber}/${room.hotelID}/${room.companyname}`);
            const jsonData = await response.json();
            setRoomIssues(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getRoomInfo = async (room) => {
        setSelectedRoom(room);
        getRoomAmenities(room);
        getRoomIssues(room);
    }

    return(
        <div class='container-fluid'>
            <h1 className= "mt-5 center">Customer Dashboard</h1>
            <div className = 'text-left mt-3'>
                <Link to='/roomsByArea'>
                    <button id="customerViewByAreaButton" type="button" class="btn btn-primary mr-1">Rooms By Area View</button>
                </Link>
                <Link to='/hotelCapacity'>
                    <button id="customerViewHotelCapacityButton" type="button" class="btn btn-primary mr-1">Hotel Capacity View</button>
                </Link>
                <Link to='/'>
                    <button id="customerViewHomeButton" type="button" class="btn btn-primary">Return Home</button>
                </Link>
            </div> 
            <h4 className = "mt-3">Filtering</h4>
                <form className = "d-flex" onSubmit={onSubmitForm}>
                    <input type= "text" className="form-control" value = {checkInDate} onChange={e => setCheckInDate(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {checkOutDate} onChange={e => setCheckOutDate(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {roomCapacity} onChange={e => setRoomCapacity(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {city} onChange={e => setCity(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {companyName} onChange={e => setCompanyName(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {category} onChange={e => setCategory(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {totalNumberOfRooms} onChange={e => setTotalNumberOfRooms(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {price} onChange={e => setPrice(e.target.value)}></input>
                    <button className= "btn btn-success">Filter</button>
                </form>
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
                                    <button id="roomInfoButton" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#roomInfoModal" onClick={() => getRoomInfo(room)}>Room Info</button>
                                </td>
                                <td>
                                    <RoomBookingModal />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div class="modal" id="roomInfoModal" tabindex='-1' role='dialog' aria-labelledby='roomInfoModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Room Info</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>
                                    Room Number: {selectedRoom.roomnumber}<br/>
                                    Comapny Name: {selectedRoom.companyname}<br/>
                                    View Type: {selectedRoom.viewtype}<br/>
                                    Price : ${selectedRoom.price}<br/>
                                    Capacity: {selectedRoom.capacity}<br/>
                                    Expandable: {selectedRoom.expandable}<br/>
                                </p>
                                <div className='table'>
                                    <table className="table mt-3 text-left">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Amenities</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomAmenities.map(room => (
                                        <tr key = {room.roomnumber}>
                                            <td>{room.roomamenity}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                                <div className='table'>
                                    <table className="table mt-3 text-left">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Issues</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomIssues.map(room => (
                                        <tr key = {room.roomnumber}>
                                            <td>{room.roomissue}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDashboard;