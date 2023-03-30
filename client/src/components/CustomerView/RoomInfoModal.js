import '../../App.css';
import React, { useEffect, useState } from "react";


const RoomInfoModal = ({room}) => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    const [roomAmenities, setRoomAmenities] = useState([]);

    const getRoomAmenities = async () => {
        try {
            const body = {"roomNumber": room.roomnumber, "hotelID": room.hotelid, "companyName": room.companyname}
            const response = await fetch(`http://localhost:5000/api/room/amenity`, {
                method: "GET",
                header: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json()
            setRoomAmenities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const [roomIssues, setRoomIssues] = useState([])

    const getRoomIssues = async () => {
        try {
            const body = {"roomNumber": room.roomnumber, "hotelID": room.hotelid, "companyName": room.companyname}
            console.log(JSON.stringify(body));
            const response = await fetch(`http://localhost:5000/api/room/issue`, {
                method: "GET",
                header: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setRoomIssues(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getRoomAmenities();
        getRoomIssues();
    }, []);

    return (
        <>
        <button id="roomInfoButton" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#roomInfoModal">Room Info</button>

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
                            Room Number: {room.roomnumber}<br/>
                            Comapny Name: {room.companyname}<br/>
                            View Type: {room.viewtype}<br/>
                            Price : ${room.price}<br/>
                            Capacity: {room.capacity}<br/>
                            Expandable: {room.expandable}<br/>
                        </p>
                        <div className='table'>
                            <table className="table mt-3 text-left">
                            <thead class="table-light">
                                <tr>
                                    <th>Amenities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {}
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
                                {}
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
        </>
    )
}

export default RoomInfoModal;