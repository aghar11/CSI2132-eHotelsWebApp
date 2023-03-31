import React, {Fragment, useState} from "react";

const InputHeadquarter = ()=> {

    const [companyName , setcompanyName] = useState("Company Name")
    const [address , setaddress] = useState("Address")
    const [numberOfHotels , setnumberOfHotels] = useState("Number of Hotels")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {companyName, address, numberOfHotels};
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
    return (
        <Fragment>
            <h1 className = "text-centre mt-5"> Input Headquarter</h1>
            <form className = "d-flex mt-5" onSubmit={onSubmitForm}>

                <input type= "text" className="form-control" value = {companyName} onChange={e => setcompanyName(e.target.value)}></input>
                <input type= "text" className="form-control" value = {address} onChange={e => setaddress(e.target.value)}></input>
                <input type= "text" className="form-control" value = {numberOfHotels} onChange={e => setnumberOfHotels(e.target.value)}></input>
                <button className= "btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputHeadquarter; 
