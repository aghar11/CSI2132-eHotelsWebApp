import React, {Fragment, useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import Container from "../headquarterComponents/Container";

const ListHeadquarter = () => {
    
    const triggerText = 'Add Headquarter';
    const onSubmit = (event) => {
        event.preventDefault(event);
        setcompanyName(event.target.companyName.value);
        setnumberOfHotels(event.target.numberOfHotels.value);
        setstreetnumber(event.target.streetnumber.value);
        setstreetname(event.target.streetname.value);
        setaptnumber(event.target.aptnumber.value);
        setcity(event.target.city.value);
        setstate(event.target.state.value);
        setpostalcode(event.target.postalcode.value);
  
    };

    const [companyName , setcompanyName] = useState("Company Name")
    const [numberOfHotels , setnumberOfHotels] = useState("Number of Hotels")
    const [streetnumber , setstreetnumber] = useState("Street Number")
    const [streetname , setstreetname] = useState("Street Name")
    const [aptnumber , setaptnumber] = useState("Apt Number")
    const [city , setcity] = useState("City")
    const [state , setstate] = useState("State")
    const [postalcode , setpostalcode] = useState("Postal code")

    const addHeadquarter = async e => {
        e.preventDefault();
        try {
            const body = {companyName, numberOfHotels, streetnumber, streetname, aptnumber, city, state, postalcode};
            const response = await fetch("http://localhost:5000/api/headquarters", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    const [headquarters, setHotels] = useState([]);

    const deleteHeadquarter = async (id) => {
        try {
            const deleteHotel = await fetch(`http://localhost:5000/api/headquarters/${companyName}`, {
                method: "DELETE"
            });
            setHotels(headquarters.filter(headquarter => headquarter.companyName !== companyName));
        } catch (error) {
            console.error(error.message);
        };
    };

    const getHeadquarters = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/headquarters");
            const jsonData = await response.json();
            setHotels(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getHeadquarters();
    }, []);


    return (
        <Fragment>
            <h2 className="mt-5 text-centre">List of Headquarters</h2>
            <Container triggerText={triggerText} onSubmit={onSubmit} />
            <table className="table mt-2 text-centre">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Number Of Hotels </th>
                        <th>StreetNumber</th>
                        <th>StreetNumber</th>
                        <th>StreetName</th>
                        <th>Apt Number</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                    {headquarters.map(headquarter => (
                        <tr key = {headquarter.companyName}>
                            <td>{headquarter.companyname}</td>
                            <td>{headquarter.numberofhotels}</td>
                            <td>{headquarter.streetnumber}</td>
                            <td>{headquarter.streetnumber}</td>
                            <td>{headquarter.aptnumber}</td>
                            <td>{headquarter.city}</td>
                            <td>{headquarter.state}</td>
                            <td>{headquarter.postalcode}</td>
                            <td>
                                {/* <EditHotel hotel = {hotel}/> */}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteHeadquarter(headquarter.companyName)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListHeadquarter;