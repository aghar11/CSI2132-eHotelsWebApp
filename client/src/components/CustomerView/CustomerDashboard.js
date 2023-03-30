import '../../App.css';
import React, { useEffect, useState} from "react";
import FilterModal from './FilterModal';

function CustomerDashboard() {
    const [room, setRoom] = useState([]);

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

    const [modal, setModal] = useState(false);
    const Toggle = () => setModal(!modal);

    return(
        <div className='container-fluid'>
            <h1 className= "mt-5 center">Customer Dashboard</h1>
            <div className = 'text-right'>
                    <button id="customerViewFilterButton" type="button" class="btn btn-primary" onClick={() => Toggle()}>Filter</button>
            </div>
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
                        {room.map(room => (
                            <tr key = {room.roomNumber}>
                                <td>{room.roomnumber}</td>
                                <td>{room.companyname}</td>
                                <td>{room.hotelid}</td>
                                <td>{room.price}</td>
                                <td>{room.capacity}</td>
                                <td>{room.viewType}</td>
                                <td>{room.expandable}</td>
                                <td>
                                    <button className="btn btn-outline-primary">View Info</button>
                                </td>
                                <td>
                                    <button className="btn btn-success">Book</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FilterModal show={modal} />
        </div>
    )
}

export default CustomerDashboard;