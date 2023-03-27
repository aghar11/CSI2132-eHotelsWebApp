import React, {Fragment, useState} from "react";

const InputHotel = ()=> {

    const [hotelId , sethotelId] = useState("HotelID")
    const [category , setcategory] = useState("Category")
    const [companyname , setcompanyname] = useState("Company Name")
    const [address , setaddress] = useState("Address")
    const [numberofrooms , setnumberofrooms] = useState("Number of rooms")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {hotelId, companyname, address, category, numberofrooms};
            const response = await fetch("http://localhost:5000/hotel", {
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
                <input type= "text" className="form-control" value = {hotelId} onChange={e => sethotelId(e.target.value)}></input>
                <input type= "text" className="form-control" value = {companyname} onChange={e => setcompanyname(e.target.value)}></input>
                <input type= "text" className="form-control" value = {address} onChange={e => setaddress(e.target.value)}></input>
                <input type= "text" className="form-control" value = {category} onChange={e => setcategory(e.target.value)}></input>
                <input type= "text" className="form-control" value = {numberofrooms} onChange={e => setnumberofrooms(e.target.value)}></input>
                <button className= "btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputHotel; 
