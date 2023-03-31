import React, {Fragment, useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import Container from "./Container";

const ListHeadquarters = () => {
    
    const triggerText = 'Add Headquarter';
    const onSubmit = (event) => {
        event.preventDefault(event);
        setcompanyName(event.target.companyname.value);
        setnumberOfHotels(parseInt(event.target.numberofhotels.value));        
        setstreetnumber(parseInt(event.target.streetnumber.value));
        setstreetname(event.target.streetname.value);
        setaptnumber(parseInt(event.target.aptnumber.value));
        setcity(event.target.city.value);
        setstate(event.target.state.value);
        setpostalcode(event.target.postalcode.value);
        addHeadquarter();
        getHeadquarters();
    };

    const [headquarters, setHeadquarters] = useState([]);
    const [companyName , setcompanyName] = useState("Company Name");
    const [streetNumber , setstreetnumber] = useState("Street Number");
    const [streetName , setstreetname] = useState("Street Name");
    const [aptNumber , setaptnumber] = useState("Apt Number");
    const [city , setcity] = useState("City");
    const [state , setstate] = useState("State");
    const [postalCode , setpostalcode] = useState("Postal code");
    const [numberOfHotels , setnumberOfHotels] = useState("Number of Hotels");
    const [editNumberOfHotels, setEditNumberOfHotels] = useState("");
    const [editStreetnumber, setEditStreetNumber] = useState("");
    const [editStreetname, setEditStreetName] = useState("");
    const [editAptnumber, setEditAptNumber] = useState("");
    const [editCity, setEditCity] = useState("");
    const [editState, setEditState] = useState("");
    const [editPostalcode, setEditPostalCode] = useState("");


    const addHeadquarter = async (e) => {
        try {
            const body = {companyname: companyName, numberofhotels: numberOfHotels, streetnumber: streetNumber, streetname: streetName, aptnumber: aptNumber, city: city, state: state, postalcode: postalCode};
            const response = await fetch("http://localhost:5000/api/headquarters", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            e.preventDefault();
            getHeadquarters();
        } catch (error) {
            console.error(error.message);
        };
    };

    const deleteHeadquarter = async (companyname) => {
        try {
            const body = {companyname: companyname};
            const deleteHeadquarter = await fetch(`http://localhost:5000/api/headquarters`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            setHeadquarters(headquarters.filter(headquarter => headquarter.companyname !== companyname));
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
        };
    };

    useEffect(() => {
        getHeadquarters();
    }, []);

    const updateNumberOfHotels = async(companyName, numberOfHotels) => {

        try {
            setcompanyName(companyName);
            setEditNumberOfHotels(numberOfHotels);
            const body = {companyname: companyName, numberofhotels: numberOfHotels};
            const response = await fetch(`http://localhost:5000/api/headquarters/numberOfHotels`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
            getHeadquarters();
        } catch (error) {
            console.error(error.message);
        };
    };

    const updateAddress = async(companyName, streetNumber, streetName, aptNumber, city, state, postalCode) => {

        try {
            setcompanyName(companyName);
            setEditStreetNumber(streetNumber);
            setEditStreetName(streetName);
            setEditAptNumber(aptNumber)
            setEditCity(city);
            setEditState(state);
            setEditPostalCode(postalCode);
            const body = {companyname: companyName, streetnumber: streetNumber, streetname: streetName, aptnumber: aptNumber, city: city, state: state, postalcode: postalCode};
            const response = await fetch(`http://localhost:5000/api/headquarters/address`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
            getHeadquarters();
        } catch (error) {
            console.error(error.message);
        };
    };
    return (
        <Fragment>
            <h2 className="mt-5 text-centre">List of Headquarters</h2>
            <Container triggerText={triggerText} onSubmit={onSubmit} />
            <table className="table mt-2 text-centre">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Number Of Hotels</th>
                        <th>Street Number</th>
                        <th>Street Name</th>
                        <th>Apt Number</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                    {headquarters.map(headquarter => (
                        <tr key = {headquarter.companyname}>
                            <td>{headquarter.companyname}</td>
                            <td>{headquarter.numberofhotels}</td>
                            <td>{headquarter.streetnumber}</td>
                            <td>{headquarter.streetname}</td>
                            <td>{headquarter.aptnumber}</td>
                            <td>{headquarter.city}</td>
                            <td>{headquarter.state}</td>
                            <td>{headquarter.postalcode}</td>
                            <td>
                            <button
                            type="button"
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target={`#id${headquarter.companyname}`}
                            >
                            Edit
                            </button>
                                <button className="btn btn-danger" onClick={() => deleteHeadquarter(headquarter.companyname)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        {/* Edit Headquarter Category Modal */}
        {headquarters.map((headquarter) => (
        <div
            key={headquarter.companyname}
            className="modal fade"
            id={`id${headquarter.companyname}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={`id${headquarter.companyname}`}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id={`id${headquarter.companyname}`}>
                        Edit Headquarters
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="form-group">
                    <label htmlFor={`category${headquarter.companyname}`}>Number of Hotels</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${headquarter.companyname}`}
                        placeholder="Enter Number of Hotels"
                        value={editNumberOfHotels}
                        onChange={(e) => setEditNumberOfHotels(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${headquarter.streetnumber}`}>Street Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${headquarter.streetnumber}`}
                        placeholder="Enter Street Number"
                        value={editStreetnumber}
                        onChange={(e) => setEditStreetNumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${headquarter.streetname}`}>Street Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${headquarter.streetname}`}
                        placeholder="Enter Street Name"
                        value={editStreetname}
                        onChange={(e) => setEditStreetName(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${headquarter.aptnumber}`}>Apt Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${headquarter.aptnumber}`}
                        placeholder="Enter Apt Number"
                        value={editAptnumber}
                        onChange={(e) => setEditAptNumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${headquarter.city}`}>City</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${headquarter.city}`}
                        placeholder="Enter City"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${headquarter.state}`}>State</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${headquarter.state}`}
                        placeholder="Enter State"
                        value={editState}
                        onChange={(e) => setEditState(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${headquarter.postalcode}`}>Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${headquarter.postalcode}`}
                        placeholder="Enter Postal Code"
                        value={editPostalcode}
                        onChange={(e) => setEditPostalCode(e.target.value)}
                    />
                    </div>

                </form>
                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                    updateNumberOfHotels(
                        headquarter.companyname,
                        editNumberOfHotels
                    );
                    setEditStreetNumber(editStreetnumber);
                    updateAddress(
                        headquarter.companyname,
                        editStreetnumber,
                        editStreetname,
                        editAptnumber,
                        editCity,
                        editState,
                        editPostalcode,
                    );
                    setEditNumberOfHotels(editNumberOfHotels);
                    setEditAptNumber(editAptnumber);
                    setEditCity(editCity);
                    setEditState(editState);
                    setEditPostalCode(editPostalcode);
                    setEditStreetName(editStreetname);
                    
                    }}
                    data-dismiss="modal"
                >
                    Save changes
                </button>
                </div>
            </div>
            </div>
        </div>
        ))}
        </Fragment>
    );
};

export default ListHeadquarters;