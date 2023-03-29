import React, {Fragment, useEffect, useState} from "react"
import EditRoom from "./EditRoom";

const ListRooms = () => {
    
    const [room, setRoom] = useState([]);

    const deleteRoom = async (roomNumber) => {
        try {
            const deleteRoom = await fetch(`http://localhost:5000/api/room/${roomNumber}`, {
                method: "DELETE"
            });
            setRoom(room.filter(room => room.roomNumber !== roomNumber));
        } catch (error) {
            console.error(error.message);
        };
    };

    const getRooms = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/room");
            const jsonData = await response.json();
            setRoom(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);


    return (
        <><Fragment>
            <h1 className= "mt-5 text-centre">List of Rooms </h1>
            <table className="table mt-5 text-centre">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Company Name</th>
                        <th>Hotel ID</th>
                        <th>Price</th>
                        <th>Capacity</th>
                        <th>Room Type</th>
                        <th>Expandable</th>
                    </tr>
                </thead>
                <tbody>
                    {}
                    {room.map(room => (
                        <tr key = {room.roomNumber}>
                            <td>{room.roomNumber}</td>
                            <td>{room.companyName}</td>
                            <td>{room.hotelid}</td>
                            <td>{room.price}</td>
                            <td>{room.capacity}</td>
                            <td>{room.viewType}</td>
                            <td>{room.expandable}</td>
                            <td>
                                <EditRoom room = {room}/>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteRoom(room.roomNumber)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment></>
    );
};

export default ListRooms;