import '../../../App.css';
import React, { useEffect, useState} from "react";
import { json, Link } from 'react-router-dom';


function EmployeeRoomView() {
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

    const[newRoomNumber, setNewRoomNumber] = useState([]);
    const[newHotelChain, setNewHotelChain] = useState([]);
    const[newHotelID, setNewHotelID] = useState([]);
    const[newView, setNewView] = useState([]);
    const[newPrice, setNewPrice] = useState([]);
    const[newCapacity, setNewCapacity] = useState([]);
    const[newExpandable, setNewExpandable] = useState([]);

    const createNewRoom = async () => {
        try {
            const body = {};
            body["roomNumber"] = parseInt(newRoomNumber);
            body["companyname"] = newHotelChain;
            body["hotelid"] = parseInt(newHotelID);
            body["viewtype"] = newView;
            body["price"] = parseInt(newPrice);
            body["capacity"] = parseInt(newCapacity);
            body["expandable"] = newExpandable;

            console.log(body);

            const response = await fetch("http://localhost:5000/api/room", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();

            getRooms();

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteRoom = async (room) => {
        try {
            const body = {};
            body["roomNumber"] = parseInt(room.roomnumber);
            body["hotelid"] = parseInt(room.hotelid);
            body["companyname"] = room.companyname;
            
            const response = await fetch("http://localhost:5000/api/room", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();

            getRooms();
        } catch (err) {
            console.error(err.message);
        }
    }

    const [bookingCheckInDate, setBookingCheckInDate] = useState("DD/MM/YYYY");
    const [bookingCheckOutDate, setBookingCheckOutDate] = useState("DD/MM/YYYY");
    const [bookingRoomNumber, setBookingRoomNumber] = useState([]);
    const [bookingHotelID, setBookingHotelID] = useState([]);
    const [bookingCompanyName, setBookingCompanyName] = useState([]);
    const [bookingCustomerID, setBookingCustomerID] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState([]);

    const [roomAmenities, setRoomAmenities] = useState([]);

    const getRoomAmenities = async (room) => {
        try {
            setRoomAmenities([]);
            const body = {"roomNumber": room.roomnumber, "hotelID": room.hotelid, "companyName": room.companyname}
            const response = await fetch(`http://localhost:5000/api/room/amenity`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json()
            console.log(jsonData)
            setRoomAmenities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const [roomIssues, setRoomIssues] = useState([])

    const getRoomIssues = async (room) => {
        try {
            setRoomIssues([]);
            const body = {"roomNumber": room.roomnumber, "hotelID": room.hotelid, "companyName": room.companyname}
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/api/room/issue", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setRoomIssues(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getRoomInfo = async (room) => {
        getRoomAmenities(room);
        getRoomIssues(room);
        setSelectedRoom(room);
    }

    const setUpBookingForm = async (room) => {
        setBookingRoomNumber(room.roomnumber);
        setBookingHotelID(room.hotelid);
        setBookingCompanyName(room.companyname);
    }

    const bookRoom = async (e) => {
        try {
            const body = {"checkInDate": bookingCheckInDate, "checkOutDate": bookingCheckOutDate, "roomNumber": bookingRoomNumber,
                "hotelID": bookingHotelID, "companyName": bookingCompanyName, "customerID": bookingCustomerID, "status": "RESERVED"}
            
            const response = await fetch("http://localhost:5000/api/booking", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <div class='container-fluid'>
            <h1 className= "mt-5 center">Employee Dashboard</h1>
            <button id="addRoomButton" type="button" class="btn btn-primary mr-1" data-toggle="modal" data-target="#roomAddingModal">Add Room</button>
            <div className="table-responsive">
                <table className="table mt-3 text-centre table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Room Number</th>
                            <th>Hotel Chain</th>
                            <th>Hotel ID</th>
                            <th>Price</th>
                            <th>Capacity</th>
                            <th>Room View</th>
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
                                    <button id="roomDeleteButton" type="button" class="btn btn-danger" onClick={() => deleteRoom(room)}>Delete</button>
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
                                        {roomAmenities.map(amenity => (
                                        <tr key = {amenity.roomnumber}>
                                            <td>{amenity.amenity}</td>
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
                                        {roomIssues.map(issue => (
                                        <tr key = {issue.roomnumber}>
                                            <td>{issue.issue}</td>
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

                <div class="modal" id="roomBookingModal" tabindex='-1' role='dialog' aria-labelledby='roomBookingModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Room Booking</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={bookRoom}>
                                <h6 className='mt-2'>CheckIn Date</h6>
                                <input type= "text" className="form-control" value = {bookingCheckInDate} onChange={e => setBookingCheckInDate(e.target.value)}></input>
                                <h6 className='mt-2'>CheckOut Date</h6>
                                <input type= "text" className="form-control" value = {bookingCheckOutDate} onChange={e => setBookingCheckOutDate(e.target.value)}></input>
                                <h6 className='mt-2'>Room Number</h6>
                                <input type= "text" className="form-control" value = {bookingRoomNumber}></input>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {bookingHotelID}></input>
                                <h6 className='mt-2'>Company Name</h6>
                                <input type= "text" className="form-control" value = {bookingCompanyName}></input>
                                <h6 className='my-2'>Customer ID</h6>
                                <input type= "text" className="form-control" calue = {bookingCustomerID} onChange={e => setBookingCustomerID(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Book Room</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="roomAddingModal" tabindex='-1' role='dialog' aria-labelledby='roomAddingModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add New Room</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={createNewRoom}>
                                <h6 className='mt-2'>Room Number</h6>
                                <input type= "text" className="form-control" value = {newRoomNumber} onChange={e => setNewRoomNumber(e.target.value)}></input>
                                <h6 className='mt-2'>Hotel Chain</h6>
                                <input type= "text" className="form-control" value = {newHotelChain} onChange={e => setNewHotelChain(e.target.value)}></input>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {newHotelID} onChange={e => setNewHotelID(e.target.value)}></input>
                                <h6 className='mt-2'>View</h6>
                                <input type= "text" className="form-control" value = {newView} onChange={e => setNewView(e.target.value)}></input>
                                <h6 className='mt-2'>Price</h6>
                                <input type= "text" className="form-control" value = {newPrice} onChange={e => setNewPrice(e.target.value)}></input>
                                <h6 className='mt-2'>Capacity</h6>
                                <input type= "text" className="form-control" value = {newCapacity} onChange={e => setNewCapacity(e.target.value)}></input>
                                <h6 className='mt-2'>Expandable</h6>
                                <input type= "text" className="form-control" value = {newExpandable} onChange={e => setNewExpandable(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Add Room</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeRoomView;