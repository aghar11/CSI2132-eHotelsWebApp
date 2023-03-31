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

    const updateHotelCategory = async(hotelID, companyName, Category) => {

        try {
            sethotelID(parseInt(hotelID));
            setcompanyName(companyName);
            setEditCategory(Category);
            const body = {hotelID: hotelID, companyName: companyName, category: Category};
            const response = await fetch(`http://localhost:5000/api/hotel/category/`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            getHotels();
        } catch (error) {
            console.error(error.message);
        }
    };

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
                <h5 className="modal-title" id={`id${hotel.hotelid}`}>
                    Edit Hotel Category
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
                    <label htmlFor={`category${hotel.hotelid}`}>Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id={`category${hotel.hotelid}`}
                        placeholder="Enter new category"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
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
                    updateHotelCategory(
                        hotel.hotelid,
                        hotel.companyname,
                        editCategory
                    );
                    setEditCategory(editCategory);
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

export default ListHotels;