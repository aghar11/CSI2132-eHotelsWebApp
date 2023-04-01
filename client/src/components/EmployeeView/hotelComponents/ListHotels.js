import React, {Fragment, useEffect, useState} from "react"
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
        getHotels();   
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
    const [editCategory, setEditCategory] = useState("");
    const [editStreetnumber, setEditStreetNumber] = useState("");
    const [editStreetname, setEditStreetname] = useState("");
    const [editaptnumber, setEditaptnumber] = useState("");
    const [editcity, setEditcity] = useState("");
    const [editstate, setEditstate] = useState("");
    const [editpostalcode, setEditpostalcode] = useState("");
    const [editnumberOfRooms, setEditnumberOfRooms] = useState("");

    const [selectedHotel, setselectedHotel] = useState([]);
    const [selectedPhone, setselectedPhone] = useState([]);
    const [selectedEmail, setselectedEmail] = useState([]);
    const [selectedManager, setselectedManager] = useState([]);
    const [hotelPhoneNumbers, sethotelPhoneNumbers] = useState([]);
    const [hotelEmails, sethotelEmails] = useState([]);
    const [hotelManagers, sethotelManagers] = useState([]);

    const addHotel = async (e) => {
        try {
            const body = {hotelid: hotelid,category: category, companyname: companyname, streetnumber: streetnumber, streetname: streetname, aptnumber: aptnumber, city: city, state: state, postalcode: postalcode, numberofrooms: numberOfRooms};
            const response = await fetch("http://localhost:5000/api/hotel", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            e.preventDefault();
            getHotels();
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

    const editHotel = async (hotel) => {
        try {
            setselectedHotel(hotel);
            setEditStreetNumber(hotel.streetnumber);
            setEditCategory(hotel.category);
            setEditnumberOfRooms(hotel.numberofrooms);
            setEditaptnumber(hotel.aptnumber);
            setEditcity(hotel.city);
            setEditstate(hotel.state);
            setEditpostalcode(hotel.postalcode);
            setEditStreetname(hotel.streetname);
            getHotelPhones(hotel.hotelid, hotel.companyname);
            getHotelEmails(hotel.hotelid, hotel.companyname);
            getHotelManages(hotel.hotelid, hotel.companyname);
        } catch (error) {
            console.error(error.message);
        };
    };

    const updateHotel = async(hotelID, companyName, Category, numberofrooms, streetname, streetnumber, city, state, postalcode) => {

        try {
            const body = {hotelid: hotelID, companyname: companyName, category: Category, numberofrooms: numberofrooms, city: city, streetname: streetname, streetnumber: streetnumber, state: state, postalcode: postalcode};
            const response = await fetch("http://localhost:5000/api/hotel/all", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            getHotels();
        } catch (error) {
            console.error(error.message);
        }
    };

    const saveChanges = async (hotel) => {
        try {
            updateHotel(hotel.hotelid, hotel.companyname, editCategory, editnumberOfRooms, editStreetname, editStreetnumber, editcity, editstate, editpostalcode);
        } catch (error) {
            console.error(error.message);
        };
    };

    const getHotelPhones = async (hotelid, companyname) => {
        try {
            sethotelPhoneNumbers([]);
            const body = {hotelid: hotelid, companyname: companyname};
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/api/hotel/phone", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            sethotelPhoneNumbers(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    };

    const getHotelEmails = async (hotelid, companyname) => {
        try {
            sethotelEmails([]);
            const body = {hotelid: hotelid, companyname: companyname};
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/api/hotel/email", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            sethotelEmails(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    };

    const getHotelManages = async (hotelid, companyname) => {
        try {
            sethotelManagers([]);
            const body = {hotelid: hotelid, companyname: companyname};
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/api/hotel/manages", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            sethotelManagers(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    };

    const deletePhoneNumber = async (phone) => {
        try {
            const body = {hotelid: phone.hotelid, companyname: phone.companyname, phonenumber: phone.phonenumber};
            const response = await fetch("http://localhost:5000/api/hotel/phone", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            getHotelPhones(selectedHotel.hotelid, selectedHotel.companyname);
            window.location("/")
        } catch (error) {
            console.error(error.message);
        };
    };

    const deleteEmail = async (email) => {
        try {
            const body = {hotelid: email.hotelid, companyname: email.companyname, email: email.email};
            const response = await fetch("http://localhost:5000/api/hotel/email", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            getHotelEmails(selectedHotel.hotelid, selectedHotel.companyname);
            window.location("/")
        } catch (error) {
            console.error(error.message);
        };
    };

    const deleteManager = async (manager) => {
        try {
            const body = {hotelid: manager.hotelid, companyname: manager.companyname, employeeid: manager.employeeid};
            const response = await fetch("http://localhost:5000/api/manages", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            getHotelManages(selectedHotel.hotelid, selectedHotel.companyname);
            window.location("/")
        } catch (error) {
            console.error(error.message);
        };
    };

    const addPhoneNumber = async e => {
        e.preventDefault();
        try {
            const body = { hotelid: newhotelid, phonenumber: newPhoneNumber, companyname: newhotelchain}
            
            const response = await fetch("http://localhost:5000/api/hotel/phone", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            getHotelPhones(selectedHotel.hotelid, selectedHotel.companyname);
        } catch (err) {
            console.error(err.message);
        }
    }

    const addEmail = async e => {
        e.preventDefault();
        try {
            const body = {email: newEmail, companyname: newhotelchain, hotelid: newhotelid}
            
            const response = await fetch("http://localhost:5000/api/hotel/email", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            getHotelEmails(selectedHotel.hotelid, selectedHotel.companyname);
        } catch (err) {
            console.error(err.message);
        }
    }

    const addManager = async e => {
        e.preventDefault();
        try {
            const body = {employeeid: newEmployeeid, hotelid: newhotelid, companyname: newhotelchain}
            
            const response = await fetch("http://localhost:5000/api/manages", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            getHotelManages(selectedHotel.hotelid, selectedHotel.companyname);
        } catch (err) {
            console.error(err.message);
        }
    }

    const [newhotelid, setNewHotelID] = useState([]);
    const [newhotelchain, setNewHotelChain] = useState([]);
    const [newPhoneNumber, setnewPhoneNumber] = useState([]);
    const [newEmail, setnewEmail] = useState([]);
    const [newEmployeeid, setnewEmployeeid] = useState([]);
    
    const setUpPhoneEmailManagerForm = async () => {
        setNewHotelChain(selectedHotel.companyname);
        setNewHotelID(selectedHotel.hotelid);
    } 

    return (
        <Fragment>
          <h2 className="mt-5 text-centre">Hotel Management</h2>
          <Container triggerText={triggerText} onSubmit={onSubmit} />
          <table className="table mt-2 text-centre">
            <thead>
              <tr>
                <th>Hotel ID</th>
                <th>Company Name</th>
                <th>City</th>
                <th>Category</th>
                <th>Number Of Rooms</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.hotelid}>
                  <td>{hotel.hotelid}</td>
                  <td>{hotel.companyname}</td>
                  <td>{hotel.city}</td>
                  <td>{hotel.category}</td>
                  <td>{hotel.numberofrooms}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-toggle="modal"
                      data-target={`#id${hotel.hotelid}`}
                      onClick={() => editHotel(hotel)}
                    >
                      Edit
                    </button>
      
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHotel(hotel.hotelid, hotel.companyname)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
        {/* Edit Hotel Category Modal */}
        {hotels.map((hotel) => (
        <div
            key={hotel.hotelid}
            className="modal fade"
            id={`id${hotel.hotelid}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={`id${hotel.hotelid}`}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" >
                        Edit Hotel
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
                    <label htmlFor={`category${hotel.hotelid}`}>Number of Rooms</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.hotelid}`}
                        placeholder="Enter Number of Rooms"
                        value={editnumberOfRooms}
                        onChange={(e) => setEditnumberOfRooms(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${hotel.category}`}>Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.category}`}
                        placeholder="Enter Category"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${hotel.streetname}`}>Street Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.streetname}`}
                        placeholder="Enter Street Name"
                        value={editStreetname}
                        onChange={(e) => setEditStreetname(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${hotel.streetnumber}`}>Street Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.streetnumber}`}
                        placeholder="Enter Street Number"
                        value={editStreetnumber}
                        onChange={(e) => setEditStreetNumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${hotel.aptnumber}`}>Apt Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.aptnumber}`}
                        placeholder="Enter Apt Number"
                        value={editaptnumber}
                        onChange={(e) => setEditaptnumber(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${hotel.city}`}>City</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.city}`}
                        placeholder="Enter City"
                        value={editcity}
                        onChange={(e) => setEditcity(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${hotel.state}`}>State</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.state}`}
                        placeholder="Enter State"
                        value={editstate}
                        onChange={(e) => setEditstate(e.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor={`category${hotel.postalcode}`}>Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.postalcode}`}
                        placeholder="Enter Postal Code"
                        value={editpostalcode}
                        onChange={(e) => setEditpostalcode(e.target.value)}
                    />
                    </div>

                </form>
                <div className='table'>
                    <table className="table mt-3 text-left">
                        <thead class="table-light">
                            <tr>
                                <th>Phone Numbers</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelPhoneNumbers.map(phone => (
                            <tr key = {phone.hotelid}>
                                <td>{phone.phonenumber}</td>
                                <td>
                                    <button id="amenityDeleteButton" type="button" class="btn btn-danger" onClick={() => deletePhoneNumber(phone)}>Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <button id="amenityAddButton" type="button" class="btn btn-success" data-toggle="modal" data-target="#addPhoneNumberModal" onClick={setUpPhoneEmailManagerForm}>Add Phone Number</button>
                </div>
                <div className='table'>
                    <table className="table mt-3 text-left">
                        <thead class="table-light">
                            <tr>
                                <th>Hotel Emails</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelEmails.map(email => (
                            <tr key = {email.hotelid}>
                                <td>{email.email}</td>
                                <td>
                                    <button id="issueDeleteButton" type="button" class="btn btn-danger" onClick={() => deleteEmail(email)}>Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <button id="issueAddButton" type="button" class="btn btn-success" data-toggle="modal" data-target="#addEmailModal" onClick={setUpPhoneEmailManagerForm}>Add Email</button>
                </div>
                <div className='table'>
                    <table className="table mt-3 text-left">
                        <thead class="table-light">
                            <tr>
                                <th>Hotel Managers</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelManagers.map(manager => (
                            <tr key = {manager.hotelid}>
                                <td>{manager.employeeid}</td>
                                <td>
                                    <button id="issueDeleteButton" type="button" class="btn btn-danger" onClick={() => deleteManager(manager)}>Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <button id="issueAddButton" type="button" class="btn btn-success" data-toggle="modal" data-target="#addManagerModal" onClick={setUpPhoneEmailManagerForm}>Add Manager</button>
                </div>
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
                            onClick={() => {saveChanges(hotel)}}
                            data-dismiss="modal"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
                <div class="modal" id="addPhoneNumberModal" tabindex='-1' role='dialog' aria-labelledby='addPhoneNumberModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add New Phone Numbers</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={addPhoneNumber}>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {newhotelid} ></input>
                                <h6 className='mt-2'>Hotel Chain</h6>
                                <input type= "text" className="form-control" value = {newhotelchain} ></input>
                                <h6 className='mt-2'>Phone Number</h6>
                                <input type= "text" className="form-control" value = {newPhoneNumber} onChange={e => setnewPhoneNumber(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Add Phone Number</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="addEmailModal" tabindex='-1' role='dialog' aria-labelledby='addEmailModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add New Email</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={addEmail}>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {newhotelid} ></input>
                                <h6 className='mt-2'>Hotel Chain</h6>
                                <input type= "text" className="form-control" value = {newhotelchain} ></input>
                                <h6 className='mt-2'>Email</h6>
                                <input type= "text" className="form-control" value = {newEmail} onChange={e => setnewEmail(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Add Email</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="addManagerModal" tabindex='-1' role='dialog' aria-labelledby='addManagerModalLabel' aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add New Manager</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <form className = "form-group" onSubmit={addManager}>
                                <h6 className='mt-2'>Hotel ID</h6>
                                <input type= "text" className="form-control" value = {newhotelid} ></input>
                                <h6 className='mt-2'>Hotel Chain</h6>
                                <input type= "text" className="form-control" value = {newhotelchain} ></input>
                                <h6 className='mt-2'>Employee ID</h6>
                                <input type= "text" className="form-control" value = {newEmployeeid} onChange={e => setnewEmployeeid(e.target.value)}></input>
                                <button className= "btn btn-success mt-4">Add Manager</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </Fragment>
      );
};

export default ListHotels;