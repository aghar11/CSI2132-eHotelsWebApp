import React, {Fragment, useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import Container from "./Container";

const ListCustomer = () => {
    
    const triggerText = 'Add Customer';
    const onSubmit = (event) => {
        event.preventDefault(event);
        setcustomerid(parseInt(event.target.customerid.value));
        setsin(event.target.sin.value);        
        setstreetnumber(parseInt(event.target.streetnumber.value));
        setstreetname(event.target.streetname.value);
        setaptnumber(parseInt(event.target.aptnumber.value));
        setcity(event.target.city.value);
        setstate(event.target.state.value);
        setpostalcode(event.target.postalcode.value);
        setregistrationdate(event.target.registrationdate.value); 
        setfirstname(event.target.firstname.value); 
        setlastname(event.target.lastname.value); 
        addCustomer();
        getCustomers();
    };

    const [customers, setcustomer] = useState([]);
    const [customerid , setcustomerid] = useState("Customer ID");
    const [sin , setsin] = useState("SIN");
    const [registrationdate , setregistrationdate] = useState("Registration Date");
    const [streetnumber , setstreetnumber] = useState("Street Number");
    const [streetname , setstreetname] = useState("Street Name");
    const [aptnumber , setaptnumber] = useState("Apt Number");
    const [city , setcity] = useState("City");
    const [state , setstate] = useState("State");
    const [postalcode , setpostalcode] = useState("Postal code");
    const [firstname , setfirstname] = useState("First Name");
    const [lastname , setlastname] = useState("Last Name");

    const [editsin, seteditsin] = useState("");
    const [editregistrationdate, seteditregistrationdate] = useState("");
    const [editfirstname, seteditfirstname] = useState("");
    const [editlastname, seteditlastname] = useState("");
    const [editStreetnumber, setEditStreetNumber] = useState("");
    const [editStreetname, setEditStreetName] = useState("");
    const [editAptnumber, setEditAptNumber] = useState("");
    const [editCity, setEditCity] = useState("");
    const [editState, setEditState] = useState("");
    const [editPostalcode, setEditPostalCode] = useState("");


    const addCustomer = async (e) => {
        try {
            const body = {customerid: customerid, sin: sin, registrationdate: registrationdate, firstname: firstname, lastname: lastname, streetnumber: streetnumber, streetname: streetname, aptnumber: aptnumber, city: city, state: state, postalcode: postalcode};
            const response = await fetch("http://localhost:5000/api/customer", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            e.preventDefault();
            getCustomers();
        } catch (error) {
            console.error(error.message);
        };
    };

    const deleteCustomer = async (customerid) => {
        try {
            const body = {customerid: customerid};
            const deleteHeadquarter = await fetch("http://localhost:5000/api/customer", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            setcustomer(customers.filter(customer => customer.customerid !== customerid));
            getCustomers();
        } catch (error) {
            console.error(error.message);
        };
    };

    const getCustomers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/customer");
            const jsonData = await response.json();
            setcustomer(jsonData);
        } catch (error) {
            console.error(error.message);
        };
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const updateCustomer = async(customerid, sin, registrationdate, firstname, lastname, streetnumber, streetname, aptnumber, city, state, postalcode) => {

        try {
            const body = {customerid: customerid, sin: sin, registrationdate: registrationdate, firstname: firstname, lastname: lastname, streetnumber: streetnumber, streetname: streetname, aptnumber: aptnumber, city: city, state: state, postalcode: postalcode};
            const response = await fetch("http://localhost:5000/api/customer/all", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            getCustomers();
        } catch (error) {
            console.error(error.message);
        };
    };

    const editCustomer = async (customer) => {
        try {
            seteditsin(customer.sin);
            seteditfirstname(customer.firstname);
            seteditlastname(customer.lastname);
            seteditregistrationdate(customer.registrationdate);
            setEditStreetNumber(customer.streetnumber);
            setEditAptNumber(customer.aptnumber);
            setEditCity(customer.city);
            setEditState(customer.state);
            setEditPostalCode(customer.postalcode);
            setEditStreetName(customer.streetname);
        } catch (error) {
            console.error(error.message);
        };
    };

    const saveChanges = async (customerid) => {
        try {
            updateCustomer(customerid, editsin, editregistrationdate, editfirstname, editlastname, editStreetnumber, editStreetname, editAptnumber, editCity, editState, editPostalcode);
            getCustomers();
        } catch (error) {
            console.error(error.message);
        };
    };

    return (
        <Fragment>
            <h2 className="mt-5 text-centre">Customer Management</h2>
            <Container triggerText={triggerText} onSubmit={onSubmit} />
            <table className="table mt-2 text-centre">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>SIN</th>
                        <th>Registration Date</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Street Number</th>
                        <th>Street Name</th>
                        <th>Apt Number</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key = {customer.customerid}>
                            <td>{customer.customerid}</td>
                            <td>{customer.sin}</td>
                            <td>{customer.registrationdate}</td>
                            <td>{customer.firstname}</td>
                            <td>{customer.lastname}</td>
                            <td>{customer.streetnumber}</td>
                            <td>{customer.streetname}</td>
                            <td>{customer.aptnumber}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td>{customer.postalcode}</td>
                            <td>
                            <button
                            type="button"
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target={`#id${customer.customerid}`}
                            onClick={() => editCustomer(customer)}
                            >
                            Edit
                            </button>
                                <button className="btn btn-danger" onClick={() => deleteCustomer(customer.customerid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        {/* Edit Headquarter Category Modal */}
        {customers.map((customer) => (
        <div
            key={customer.customerid}
            className="modal fade"
            id={`id${customer.customerid}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={`id${customer.customerid}`}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" >
                        Edit Customer
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
                    <label htmlFor={`category${customer.customerid}`}>SIN</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.customerid}`}
                        placeholder="Enter SIN"
                        value={editsin}
                        onChange={(e) => seteditsin(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.registrationdate}`}>Registration Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.registrationdate}`}
                        placeholder="Enter Registration Date"
                        value={editregistrationdate}
                        onChange={(e) => seteditregistrationdate(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.firstname}`}>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.firstname}`}
                        placeholder="Enter First Name"
                        value={editfirstname}
                        onChange={(e) => seteditfirstname(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.lastname}`}>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.lastname}`}
                        placeholder="Enter Last Name"
                        value={editlastname}
                        onChange={(e) => seteditlastname(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.streetname}`}>Street Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.streetname}`}
                        placeholder="Enter Street Name"
                        value={editStreetname}
                        onChange={(e) => setEditStreetName(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.streetnumber}`}>Street Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.streetnumber}`}
                        placeholder="Enter Street Name"
                        value={editStreetnumber}
                        onChange={(e) => setEditStreetNumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.aptnumber}`}>Apt Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.aptnumber}`}
                        placeholder="Enter Apt Number"
                        value={editAptnumber}
                        onChange={(e) => setEditAptNumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.city}`}>City</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.city}`}
                        placeholder="Enter City"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.state}`}>State</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.state}`}
                        placeholder="Enter State"
                        value={editState}
                        onChange={(e) => setEditState(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${customer.postalcode}`}>Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${customer.postalcode}`}
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
                            onClick={() => {getCustomers()}}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {saveChanges(customer.customerid)}}
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

export default ListCustomer;