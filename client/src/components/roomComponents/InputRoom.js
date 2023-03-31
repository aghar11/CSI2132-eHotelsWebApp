import React, {Fragment, useState} from "react";

const InputRoom = ()=> {

    const [roomNumber , setroomNumber] = useState("roomNumber")
    const [companyName , setCompanyName] = useState("Company Name")
    const [hoteID , sethotelId] = useState("HotelID")
    const [price , setprice] = useState("Price")
    const [capacity , setCapacity] = useState("Capacity")
    const [viewType , setViewType] = useState("ViewType")
    const [expandable , setExpandable] = useState("Expandable")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {roomNumber, companyName, hoteID, price, capacity, viewType, expandable};
            const response = await fetch("http://localhost:5000/api/room", {
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
            <h1 className = "text-centre mt-5"> Input Room</h1>
            <form className = "d-flex mt-5" onSubmit={onSubmitForm}>
                <input type= "text" className="form-control" value = {roomNumber} onChange={e => setroomNumber(e.target.value)}></input>
                <input type= "text" className="form-control" value = {companyName} onChange={e => setCompanyName(e.target.value)}></input>
                <input type= "text" className="form-control" value = {hoteID} onChange={e => sethotelId(e.target.value)}></input>
                <input type= "text" className="form-control" value = {price} onChange={e => setprice(e.target.value)}></input>
                <input type= "text" className="form-control" value = {capacity} onChange={e => setCapacity(e.target.value)}></input>
                <input type= "text" className="form-control" value = {viewType} onChange={e => setViewType(e.target.value)}></input>
                <input type= "text" className="form-control" value = {expandable} onChange={e => setExpandable(e.target.value)}></input>
                <button className= "btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputRoom; 
