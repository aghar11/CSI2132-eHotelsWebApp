import '../../App.css';
import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';


function CustomerDashboard() {
    const [rooms, setRooms] = useState([]);

    const getRooms = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/room_hotel");
            const jsonData = await response.json();
            setRooms(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);


    const [checkInDate, setCheckInDate] = useState("Check in Date");
    const [checkOutDate, setCheckOutDate] = useState("Check out Date");
    const [roomCapacity, setRoomCapacity] = useState("Room Capacity");
    const [city, setCity] = useState("City");
    const [companyName, setCompanyName] = useState("Company Name");
    const [category, setCategory] = useState("Category");
    const [numberOfRooms, setNumberOfRooms] = useState("Number Of Rooms");
    const [price, setPrice] = useState("Price");

    const [bookingCheckInDate, setBookingCheckInDate] = useState("DD/MM/YYYY");
    const [bookingCheckOutDate, setBookingCheckOutDate] = useState("DD/MM/YYYY");
    const [bookingRoomNumber, setBookingRoomNumber] = useState([]);
    const [bookingHotelID, setBookingHotelID] = useState([]);
    const [bookingCompanyName, setBookingCompanyName] = useState([]);
    const [bookingCustomerID, setBookingCustomerID] = useState([]);

    const filterEntries = async e => {
        e.preventDefault();
        try {
            var body = {}

            if (roomCapacity) {
                body["roomCapacity"] = roomCapacity;
            }
            if (city) {
                body["city"] = city;
            }
            if (companyName) {
                body["companyName"] = companyName;
            }
            if (category) {
                body["category"] = category;
            }
            if (numberOfRooms) {
                body["nomberOfRooms"] = numberOfRooms;
            }
            if (price) {
                body["price"] = price;
            }
            
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/api/room_hotel_filters", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();

            setRooms(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    }

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
                <form className = "d-flex" onSubmit={filterEntries}>
                    <input type= "text" className="form-control" value = {checkInDate} onChange={e => setCheckInDate(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {checkOutDate} onChange={e => setCheckOutDate(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {roomCapacity} onChange={e => setRoomCapacity(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {city} onChange={e => setCity(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {companyName} onChange={e => setCompanyName(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {category} onChange={e => setCategory(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {numberOfRooms} onChange={e => setNumberOfRooms(e.target.value)}></input>
                    <input type= "text" className="form-control" value = {price} onChange={e => setPrice(e.target.value)}></input>
                    <button className= "btn btn-success">Filter</button>
                </form>
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
                            <th>City</th>
                            <th>Hotel Category</th>
                            <th>Hotel Number of Rooms</th>
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
                                <td>{room.city}</td>
                                <td>{room.category}</td>
                                <td>{room.numberofrooms}</td>
                                <td>
                                    <button id="roomInfoButton" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#roomInfoModal" onClick={() => getRoomInfo(room)}>Room Info</button>
                                </td>
                                <td>
                                    <button id="roomBoookingButton" type="button" class="btn btn-success" data-toggle="modal" data-target="#roomBookingModal" onClick={() => setUpBookingForm(room)}>Book</button>
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
            </div>
        </div>
    )
}

export default CustomerDashboard;