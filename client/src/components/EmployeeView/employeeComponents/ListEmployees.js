import React, {Fragment, useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import Container from "./Container";

const ListEmployees = () => {
    
    const triggerText = 'Add Employees';
    const onSubmit = (event) => {
        event.preventDefault(event);
        setemployeeID(parseInt(event.target.employeeid.value));     
        setSIN(parseInt(event.target.sin.value));     
        sethotelID(parseInt(event.target.hotelid.value))
        setcompanyName(event.target.companyname.value);
        setfirstname(event.target.firstname.value);
        setmiddlename(event.target.middlename.value);
        setlastname(event.target.lastname.value);
        setstreetnumber(parseInt(event.target.streetnumber.value));
        setstreetname(event.target.streetname.value);
        setaptnumber(parseInt(event.target.aptnumber.value));
        setcity(event.target.city.value);
        setstate(event.target.state.value);
        setpostalcode(event.target.postalcode.value);
        addEmployee();
        getEmployees();
    };

    const [employees, setEmployees] = useState([]);
    const [employeeID , setemployeeID] = useState("Employee ID");
    const [SIN , setSIN] = useState("SIN");
    const [hotelID , sethotelID] = useState("Hotel ID");
    const [companyName , setcompanyName] = useState("Company Name");
    const [firstName , setfirstname] = useState("First Name");
    const [middleName , setmiddlename] = useState("Middle Name");
    const [lastName , setlastname] = useState("Last Name");
    const [streetNumber , setstreetnumber] = useState("Street Number");
    const [streetName , setstreetname] = useState("Street Name");
    const [aptNumber , setaptnumber] = useState("Apt Number");
    const [city , setcity] = useState("City");
    const [state , setstate] = useState("State");
    const [postalCode , setpostalcode] = useState("Postal code");
    const [editFirstname, setEditFirstname] = useState("");
    const [editMiddlename, setEditMiddlename] = useState("");
    const [editLastname, setEditLastname] = useState("");
    const [editStreetnumber, setEditStreetNumber] = useState("");
    const [editStreetname, setEditStreetName] = useState("");
    const [editAptnumber, setEditAptNumber] = useState("");
    const [editCity, setEditCity] = useState("");
    const [editState, setEditState] = useState("");
    const [editPostalcode, setEditPostalCode] = useState("");




    const addEmployee = async (e) => {
        try {
            const body = {employeeid: employeeID, sin: SIN, hotelid: hotelID, companyname: companyName, firstname: firstName, middlename: middleName, lastname: lastName, streetnumber: streetNumber, streetname: streetName, aptnumber: aptNumber, city: city, state: state, postalcode: postalCode};
            const response = await fetch("http://localhost:5000/api/employee", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            e.preventDefault();
            getEmployees();
        } catch (error) {
            console.error(error.message);
        };
    };

    const deleteEmployee = async (employeeid) => {
        try {
            const body = {employeeid: employeeid};
            const deleteEmployee = await fetch(`http://localhost:5000/api/employee/`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            setEmployees(employees.filter(employee => employee.employeeid !== employeeid));
            getEmployees();
        } catch (error) {
            console.error(error.message);
        };
    };

    const getEmployees = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/employee");
            const jsonData = await response.json();
            setEmployees(jsonData);
        } catch (error) {
            console.error(error.message);
        };
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const updateName = async(employeeID, hotelID, companyName, firstName, middleName, lastName) => {

        try {
            setemployeeID(employeeID);
            sethotelID(hotelID);
            setcompanyName(companyName);
            setEditFirstname(firstName);
            setEditMiddlename(middleName);
            setEditLastname(lastName);
    
            const body = {employeeid: employeeID, hotelid: hotelID, companyname: companyName, firstname: firstName, middlename: middleName, lastname: lastName};
            const response = await fetch(`http://localhost:5000/api/employee/name`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            getEmployees();
        } catch (error) {
            console.error(error.message);
        };
    };

    const updateAddress = async(employeeID, hotelID, companyName, streetNumber, streetName, aptNumber, city, state, postalCode) => {

        try {
            setemployeeID(employeeID);
            sethotelID(hotelID);
            setcompanyName(companyName);
            setEditStreetNumber(streetNumber);
            setEditStreetName(streetName);
            setEditAptNumber(aptNumber)
            setEditCity(city);
            setEditState(state);
            setEditPostalCode(postalCode);
            const body = {employeeid: employeeID, hotelid: hotelID, companyname: companyName, streetnumber: streetNumber, streetname: streetName, aptnumber: aptNumber, city: city, state: state, postalcode: postalCode};
            const response = await fetch("http://localhost:5000/api/employee/address", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            getEmployees();
        } catch (error) {
            console.error(error.message);
        };
    };

    const editEmployee = async (employee) => {
        try {
            setEditFirstname(employee.firstname);
            setEditMiddlename(employee.middlename);
            setEditLastname(employee.lastname);
            setEditStreetNumber(employee.streetnumber);
            setEditAptNumber(employee.aptnumber);
            setEditCity(employee.city);
            setEditState(employee.state);
            setEditPostalCode(employee.postalcode);
            setEditStreetName(employee.streetname);
        } catch (error) {
            console.error(error.message);
        };
    };

    const saveChanges = async (employeeid, hotelid ,companyname) => {
        try {
            console.log("Employee ID is: "+employeeid);
            updateAddress(employeeid, hotelid, companyname, editStreetnumber, editStreetname, editAptnumber, editCity, editState, editPostalcode);
            updateName(employeeid, hotelid , companyname, editFirstname, editMiddlename, editLastname);
            getEmployees();
        } catch (error) {
            console.error(error.message);
        };
    };

    return (
        <Fragment>
            <h2 className="mt-5 text-centre">List of Employees</h2>
            <Container triggerText={triggerText} onSubmit={onSubmit} />
            <table className="table mt-2 text-centre">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Hotel ID</th>
                        <th>Company Name</th>
                        <th>SIN</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
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
                    {employees.map(employee => (
                        <tr key = {employee.employeeid}>
                            <td>{employee.employeeid}</td>
                            <td>{employee.hotelid}</td>
                            <td>{employee.companyname}</td>
                            <td>{employee.sin}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.middlename}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.streetnumber}</td>
                            <td>{employee.streetname}</td>
                            <td>{employee.aptnumber}</td>
                            <td>{employee.city}</td>
                            <td>{employee.state}</td>
                            <td>{employee.postalcode}</td>
                            <td>
                            <button
                            type="button"
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target={`#id${employee.employeeid}`}
                            onClick={() => editEmployee(employee)}
                            >
                            Edit
                            </button>
                                <button className="btn btn-danger" onClick={() => deleteEmployee(employee.employeeid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        {/* Edit Employee Category Modal */}
        {employees.map((employee) => (
        <div
            key={employee.employeeid}
            className="modal fade"
            id={`id${employee.employeeid}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={`id${employee.employeeid}`}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" >
                        Edit Employee
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
                    <label htmlFor={`category${employee.firstname}`}>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.firstname}`}
                        placeholder="Enter Number of Hotels"
                        value={editFirstname}
                        onChange={(e) => setEditFirstname(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.middlename}`}>Middle Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.middlename}`}
                        placeholder="Enter Number of Hotels"
                        value={editMiddlename}
                        onChange={(e) => setEditMiddlename(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.lastname}`}>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.lastname}`}
                        placeholder="Enter Number of Hotels"
                        value={editLastname}
                        onChange={(e) => setEditLastname(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.streetnumber}`}>Street Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.streetnumber}`}
                        placeholder="Enter Street Number"
                        value={editStreetnumber}
                        onChange={(e) => setEditStreetNumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.streetname}`}>Street Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.streetname}`}
                        placeholder="Enter Street Name"
                        value={editStreetname}
                        onChange={(e) => setEditStreetName(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.aptnumber}`}>Apt Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.aptnumber}`}
                        placeholder="Enter Apt Number"
                        value={editAptnumber}
                        onChange={(e) => setEditAptNumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.city}`}>City</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.city}`}
                        placeholder="Enter City"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.state}`}>State</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.state}`}
                        placeholder="Enter State"
                        value={editState}
                        onChange={(e) => setEditState(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${employee.postalcode}`}>Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${employee.postalcode}`}
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
                            onClick={() => {saveChanges(employee.employeeid, employee.hotelid, employee.companyname)}}
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

export default ListEmployees;