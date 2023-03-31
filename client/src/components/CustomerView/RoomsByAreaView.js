import '../../App.css';
import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';

function RoomsByAreaView() {
    const [roomsByCities, setRoomsByCities] = useState([]);

    const getRoomsByCities = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/views/roomsByCity");
            const jsonData = await response.json();

            setRoomsByCities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getRoomsByCities();
    }, []);

    return(
        <div classname='container-fluid'>
            <h1 className= "mt-5 center">Customer Dashboard</h1>
            <div className = 'text-left mt-4'>
                <Link to='/customerView'>
                    <button id="customerViewyButton" type="button" class="btn btn-primary mr-1">Main Customer View</button>
                </Link>
                <Link to='/hotelCapacity'>
                    <button id="customerViewHotelCapacityButton" type="button" class="btn btn-primary mr-1">Hotel Capacity View</button>
                </Link>
                <Link to='/'>
                    <button id="customerViewHomeButton" type="button" class="btn btn-primary">Return Home</button>
                </Link>
                <div className="table-responsive">
                    <table className="table mt-3 text-centre table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Number of Rooms</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {}
                            {roomsByCities.map(roomsByCity => (
                                <tr key = {roomsByCity.city}>
                                    <td>{roomsByCity.numberofrooms}</td>
                                    <td>{roomsByCity.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> 

        </div>
    );
}

export default RoomsByAreaView;