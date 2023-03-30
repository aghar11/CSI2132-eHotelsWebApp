import React, {Fragment, useState} from "react";

const InputHotel = ()=> {

    const [hotelID , sethotelID] = useState("HotelID")
    const [category , setcategory] = useState("Category")
    const [companyName , setcompanyName] = useState("Company Name")
    const [address , setaddress] = useState("Address")
    const [numberOfRooms , setnumberOfRooms] = useState("Number of rooms")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {hotelID, companyName, address, category, numberOfRooms};
            const response = await fetch("http://localhost:5000/api/hotel", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <Fragment>
            <h1 className = "text-centre mt-5"> Input Hotel</h1>
            <form className = "d-flex mt-5" onSubmit={onSubmitForm}>
                <input type= "text" className="form-control" value = {hotelID} onChange={e => sethotelID(e.target.value)}></input>
                <input type= "text" className="form-control" value = {companyName} onChange={e => setcompanyName(e.target.value)}></input>
                <input type= "text" className="form-control" value = {address} onChange={e => setaddress(e.target.value)}></input>
                <input type= "text" className="form-control" value = {category} onChange={e => setcategory(e.target.value)}></input>
                <input type= "text" className="form-control" value = {numberOfRooms} onChange={e => setnumberOfRooms(e.target.value)}></input>
                <button className= "btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputHotel; 