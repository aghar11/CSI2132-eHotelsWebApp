import '../../App.css';
import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';

function HotelCapacityView() {
    const [hotelCapacities, setHotelCapacities] = useState([]);

    const getHotelCapacities = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/views/hotelCapacities");
            const jsonData = await response.json();

            setHotelCapacities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getHotelCapacities();
    }, []);

    return(
        <div classname='container-fluid'>
            <h1 className= "mt-5 center">Customer Dashboard</h1>
            <div className = 'text-left mt-4'>
                <Link to='/roomsByArea'>
                    <button id="customerViewByAreaButton" type="button" class="btn btn-primary mr-1">Rooms By Area View</button>
                </Link>
                <Link to='/customerView'>
                    <button id="customerViewyButton" type="button" class="btn btn-primary mr-1">Main Customer View</button>
                </Link>
                <Link to='/'>
                    <button id="customerViewHomeButton" type="button" class="btn btn-primary">Return Home</button>
                </Link>
                <div className="table-responsive">
                    <table className="table mt-3 text-centre table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Total Capacity</th>
                                <th>Company Name</th>
                                <th>City</th>
                                <th>Hotel ID</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {}
                            {hotelCapacities.map(hotelCapacity => (
                                <tr key = {hotelCapacity.hotelid}>
                                    <td>{hotelCapacity.totalcapacity}</td>
                                    <td>{hotelCapacity.companyname}</td>
                                    <td>{hotelCapacity.city}</td>
                                    <td>{hotelCapacity.hotelid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> 
        </div>
    );
}

export default HotelCapacityView;