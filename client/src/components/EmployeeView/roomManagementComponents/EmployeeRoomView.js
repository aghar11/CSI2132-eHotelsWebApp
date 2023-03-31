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

    const [selectedRoom, setSelectedRoom] = useState([]);
    const [roomAmenities, setRoomAmenities] = useState([]);
    const [roomIssues, setRoomIssues] = useState([])

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

    const [newRoomAmenity, setNewRoomAmenity] = useState([]);
    const [newRoomIssue, setNewRoomIssue] = useState([]);

    const setUpAmenityIssueForm = async () => {
        setNewRoomNumber(selectedRoom.roomnumber);
        setNewHotelChain(selectedRoom.companyname);
        setNewHotelID(selectedRoom.hotelid);
    } 

    const addAmenity = async e => {
        e.preventDefault();
        try {
            const body = {"amenity": newRoomAmenity, "roomNumber": parseInt(newRoomNumber), "hotelID": parseInt(newHotelID), "companyName": newHotelChain}
            
            const response = await fetch("http://localhost:5000/api/room/amenity", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();
            getRoomAmenities(selectedRoom);

        } catch (err) {
            console.error(err.message);
        }
    }

    const addIssue = async e => {
        e.preventDefault();
        try {
            const body = {"issue": newRoomIssue, "roomNumber": parseInt(newRoomNumber), "hotelID": parseInt(newHotelID), "companyName": newHotelChain}
            
            const response = await fetch("http://localhost:5000/api/room/issue", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();
            getRoomIssues(selectedRoom);

        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteAmenity = async (amenity) => {
        try {
            const body = {"amenity": amenity.amenity, "roomNumber": parseInt(amenity.roomnumber), "hotelID": parseInt(amenity.hotelid), "companyName": amenity.companyname}
            
            const response = await fetch("http://localhost:5000/api/room/amenity", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();
            getRoomAmenities(selectedRoom);
            
            window.location("/")
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteIssue = async (issue) => {
        try {
            const body = {"issue": issue.issue, "roomNumber": parseInt(issue.roomnumber), "hotelID": parseInt(issue.hotelid), "companyName": issue.companyname}
            
            const response = await fetch("http://localhost:5000/api/room/issue", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();
            getRoomIssues(selectedRoom);
            
            window.location("/")
        } catch (err) {
            console.error(err.message);
        }
    }

    
    const setUpRoomEditForm = async (room) => {
        setSelectedRoom(room);
        setNewView(room.viewtype);
        setNewPrice(room.price);
        setNewCapacity(room.capacity);
        setNewExpandable(room.expandable);
    }

    const editRoom = async (e) => {
        e.preventDefault();
        try {
            const baseBody = {"roomNumber": selectedRoom.roomnumber, "hotelID": selectedRoom.hotelid, "companyName": selectedRoom.companyname};

            if (newView) {
                const reqBody = baseBody;
                reqBody["viewtype"] = newView;

                try {
                    const response = await fetch("http://localhost:5000/api/room/viewtype", {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(reqBody)
                    });

                    const jsonData = await response.json();
                } catch (err) {
                    console.error(err.message);
                }
            }

            if (newPrice) {
                const reqBody = baseBody;
                reqBody["price"] = newPrice;

                try {
                    const response = await fetch("http://localhost:5000/api/room/price", {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(reqBody)
                    });

                    const jsonData = await response.json();
                } catch (err) {
                    console.error(err.message);
                }
            }

            if (newCapacity) {
                const reqBody = baseBody;
                reqBody["capacity"] = newCapacity;

                try {
                    const response = await fetch("http://localhost:5000/api/room/capacity", {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(reqBody)
                    });

                    const jsonData = await response.json();
                } catch (err) {
                    console.error(err.message);
                }
            }

            if (newExpandable) {
                const reqBody = baseBody;
                reqBody["expandable"] = newExpandable;

                try {
                    const response = await fetch("http://localhost:5000/api/room/expandable", {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(reqBody)
                    });

                    const jsonData = await response.json();
                } catch (err) {
                    console.error(err.message);
                }
            }

            getRooms();
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <div class='container-fluid'>
            <h2 className= "mt-5 center">Room Management</h2>
            <button id="addRoomButton" type="button" class="btn btn-success mr-1" data-toggle="modal" data-target="#roomAddingModal">Add Room</button>
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
                                    <button id="roomEditButton" type="button" class="btn btn-outline-success ml-2" data-toggle="modal" data-target="#roomEditModal" onClick={() => setUpRoomEditForm(room)}>Edit Room</button>
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
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roomAmenities.map(amenity => (
                                            <tr key = {amenity.roomnumber}>
                                                <td>{amenity.amenity}</td>
                                                <td>
                                                    <button id="amenityDeleteButton" type="button" class="btn btn-danger" onClick={() => deleteAmenity(amenity)}>Delete</button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button id="amenityAddButton" type="button" class="btn btn-success" data-toggle="modal" data-target="#addAmenityModal" onClick={setUpAmenityIssueForm}>Add Amenity</button>
                                </div>
                                <div className='table'>
                                    <table className="table mt-3 text-left">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Issues</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roomIssues.map(issue => (
                                            <tr key = {issue.roomnumber}>
                                                <td>{issue.issue}</td>
                                                <td>
                                                    <button id="issueDeleteButton" type="button" class="btn btn-danger" onClick={() => deleteIssue(issue)}>Delete</button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button id="issueAddButton" type="button" class="btn btn-success" data-toggle="modal" data-target="#addIssueModal" onClick={setUpAmenityIssueForm}>Add Issue</button>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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

                <div class="modal" id="addAmenityModal" tabindex='-1' role='dialog' aria-labelledby='addAmenityModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add New Amenities</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={addAmenity}>
                                <h6 className='mt-2'>Room Number</h6>
                                <input type= "text" className="form-control" value = {newRoomNumber} ></input>
                                <h6 className='mt-2'>Hotel Chain</h6>
                                <input type= "text" className="form-control" value = {newHotelChain} ></input>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {newHotelID} ></input>
                                <h6 className='mt-2'>Amenity</h6>
                                <input type= "text" className="form-control" value = {newRoomAmenity} onChange={e => setNewRoomAmenity(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Add Amenity</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="addIssueModal" tabindex='-1' role='dialog' aria-labelledby='addIssueModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add New Issues</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={addIssue}>
                                <h6 className='mt-2'>Room Number</h6>
                                <input type= "text" className="form-control" value = {newRoomNumber} ></input>
                                <h6 className='mt-2'>Hotel Chain</h6>
                                <input type= "text" className="form-control" value = {newHotelChain} ></input>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {newHotelID} ></input>
                                <h6 className='mt-2'>Issue</h6>
                                <input type= "text" className="form-control" value = {newRoomIssue} onChange={e => setNewRoomIssue(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Add Issue</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal" id="roomEditModal" tabindex='-1' role='dialog' aria-labelledby='roomEditingModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit Room</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={editRoom}>
                                <h6 className='mt-2'>Room Number</h6>
                                <input type= "text" className="form-control" value = {selectedRoom.roomnumber}></input>
                                <h6 className='mt-2'>Hotel Chain</h6>
                                <input type= "text" className="form-control" value = {selectedRoom.companyname}></input>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {selectedRoom.hotelid}></input>
                                <h6 className='mt-2'>View</h6>
                                <input type= "text" className="form-control" value = {newView} onChange={e => setNewView(e.target.value)}></input>
                                <h6 className='mt-2'>Price</h6>
                                <input type= "text" className="form-control" value = {newPrice} onChange={e => setNewPrice(e.target.value)}></input>
                                <h6 className='mt-2'>Capacity</h6>
                                <input type= "text" className="form-control" value = {newCapacity} onChange={e => setNewCapacity(e.target.value)}></input>
                                <h6 className='mt-2'>Expandable</h6>
                                <input type= "text" className="form-control" value = {newExpandable} onChange={e => setNewExpandable(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Save Changes</button>
                            </form>
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

export default EmployeeRoomView;