import React, {Fragment, useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import Container from "./Container";

const ListHeadquarters = () => {
    
    const triggerText = 'Add Headquarter';
    const onSubmit = (event) => {
        event.preventDefault(event);
        setcompanyName(event.target.companyName.value);
        setnumberOfHotels(event.target.numberOfRooms.value);        
        setstreetnumber(event.target.streetnumber.value);
        setstreetname(event.target.streetname.value);
        setaptnumber(event.target.aptnumber.value);
        setcity(event.target.city.value);
        setstate(event.target.state.value);
        setpostalcode(event.target.postalcode.value);
        addHeadquarter();
    };

    const [companyName , setcompanyName] = useState("Company Name")
    const [streetnumber , setstreetnumber] = useState("Street Number")
    const [streetname , setstreetname] = useState("Street Name")
    const [aptnumber , setaptnumber] = useState("Apt Number")
    const [city , setcity] = useState("City")
    const [state , setstate] = useState("State")
    const [postalcode , setpostalcode] = useState("Postal code")
    const [numberOfHotels , setnumberOfHotels] = useState("Number of Hotels")

    const addHeadquarter = async e => {
        e.preventDefault();
        try {
            const body = {companyName, numberOfHotels, streetnumber, streetname, aptnumber, city, state, postalcode};
            const response = await fetch("http://localhost:5000/api/headquarters", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    const [headquarters, setHeadquarters] = useState([]);

    const deleteHotel = async (id) => {
        try {
            const body = {companyName};
            const deleteHeadquarter = await fetch(`http://localhost:5000/api/headquarters`, {
                method: "DELETE"
            });
            setHeadquarters(headquarters.filter(headquarter => headquarter.companyName !== companyName));
            getHeadquarters();
        } catch (error) {
            console.error(error.message);
        };
    };

    const getHeadquarters = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/headquarters");
            const jsonData = await response.json();
            setHeadquarters(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        setHeadquarters();
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
                    {headquarters.map(headquarter => (
                        <tr key = {headquarter.hotelid}>
                            <td>{headquarter.hotelid}</td>
                            <td>{headquarter.companyname}</td>
                            <td>{headquarter.city}</td>
                            <td>{headquarter.category}</td>
                            <td>{headquarter.numberofrooms}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteHotel(headquarter.companyName)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListHeadquarters;