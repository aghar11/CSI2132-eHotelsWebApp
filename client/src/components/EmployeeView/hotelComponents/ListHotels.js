import React, {Fragment, useEffect, useState} from "react"
import EditHotel from "./EditHotel";
import { Link } from 'react-router-dom'

const ListHotels = () => {
    
    const [hotels, setHotels] = useState([]);

    const deleteHotel = async (id) => {
        try {
            const deleteHotel = await fetch(`http://localhost:5000/api/hotel/${id}`, {
                method: "DELETE"
            });
            setHotels(hotels.filter(hotel => hotel.hotelid !== id));
        } catch (error) {
            console.error(error.message);
        };
    };

    const getHotels = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/hotel");
            const jsonData = await response.json();
            setHotels(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getHotels();
    }, []);


    return (
        <Fragment>
            <h2 className="mt-5 text-centre">List of Hotels</h2>
            <button className="btn btn-success">Add</button>
            <table className="table mt-2 text-centre">
                <thead>
                    <tr>
                        <th>Hotel ID</th>
                        <th>Company Name</th>
                        <th>City</th>
                        <th>Category</th>
                        <th>Number Of Rooms</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map(hotel => (
                        <tr key = {hotel.hotelid}>
                            <td>{hotel.hotelid}</td>
                            <td>{hotel.companyname}</td>
                            <td>{hotel.city}</td>
                            <td>{hotel.category}</td>
                            <td>{hotel.numberofrooms}</td>
                            <td>
                                <EditHotel hotel = {hotel}/>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteHotel(hotel.hotelid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListHotels;