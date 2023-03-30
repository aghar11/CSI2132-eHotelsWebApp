import React, {Fragment, useEffect, useState} from "react"
import EditHotel from "./EditHotel";
import { Link } from 'react-router-dom'
import Container from "./Container";

const ListHotels = () => {
    
    const triggerText = 'Add Hotel';
    const onSubmit = (event) => {
        event.preventDefault(event);
        sethotelID(parseInt(event.target.hotelid.value));
        setcategory(event.target.category.value);
        setcompanyName(event.target.companyname.value);
        setstreetnumber(parseInt(event.target.streetnumber.value));
        setstreetname(event.target.streetname.value);
        setaptnumber(parseInt(event.target.aptnumber.value));
        setcity(event.target.city.value);
        setstate(event.target.state.value);
        setpostalcode(event.target.postalcode.value);
        setnumberOfRooms(parseInt(event.target.numberofrooms.value)); 
        addHotel();       
    };

    const [hotels, setHotels] = useState([]);
    const [hotelid , sethotelID] = useState("HotelID")
    const [category , setcategory] = useState("Category")
    const [companyname , setcompanyName] = useState("Company Name")
    const [streetnumber , setstreetnumber] = useState("Street Number")
    const [streetname , setstreetname] = useState("Street Name")
    const [aptnumber , setaptnumber] = useState("Apt Number")
    const [city , setcity] = useState("City")
    const [state , setstate] = useState("State")
    const [postalcode , setpostalcode] = useState("Postal code")
    const [numberOfRooms , setnumberOfRooms] = useState("Number of rooms")

    const addHotel = async (e) => {
        try {
            const body = {hotelid,category, companyname, streetnumber, streetname, aptnumber, city, state, postalcode, numberOfRooms};
            const response = await fetch("http://localhost:5000/api/hotel", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error(error.message);
        };
    };

    

    const deleteHotel = async (hotelID, companyName) => {
        try {
            sethotelID(parseInt(hotelID));
            setcompanyName(companyName);
            const body = {hotelid: hotelID, companyname: companyName};
            const deleteHotel = await fetch("http://localhost:5000/api/hotel", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            setHotels(hotels.filter(hotel => hotel.hotelid !== hotelID));
            getHotels();
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
        };
    };

    useEffect(() => {
        getHotels();
    }, []);


    return (
        <Fragment>
            <h2 className="mt-5 text-centre">List of Hotels</h2>
            <Container triggerText={triggerText} onSubmit={onSubmit} />
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
                                <button className="btn btn-danger" onClick={() => deleteHotel(hotel.hotelid, hotel.companyname)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListHotels;