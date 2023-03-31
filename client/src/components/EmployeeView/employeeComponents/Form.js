import React, {useState} from 'react';

export const Form = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label >Employee ID</label>
                <input
                className="form-control"
                id="employeeid"
                placeholder="Employee ID"
                />
            </div>
            <div className="form-group">
                <label >SIN</label>
                <input className="form-control" id="sin" placeholder="SIN" type="integer"/>
            </div>
            <div className="form-group">
                <label >Hotel ID</label>
                <input
                className="form-control"
                id="hotelid"
                placeholder="Hotel ID"
                type="integer"
                />
            </div>
            <div className="form-group">
                <label >Company Name</label>
                <input
                className="form-control"
                id="companyname"
                placeholder="Company Name"
                />
            </div>
            <div className="form-group">
                <label >First Name</label>
                <input
                className="form-control"
                id="firstname"
                placeholder="First Name"
                />
            </div>
            <div className="form-group">
                <label >Middle Name</label>
                <input
                className="form-control"
                id="middlename"
                placeholder="Middle Name"
                />
            </div>
            <div className="form-group">
                <label >Last Name</label>
                <input
                className="form-control"
                id="lastname"
                placeholder="Last Name"
                />
            </div>
            <div className="form-group">
                <label >Street Number</label>
                <input
                className="form-control"
                id="streetnumber"
                placeholder="Street Number"
                type="integer"
                />
            </div>
            <div className="form-group">
                <label >Street Name</label>
                <input
                className="form-control"
                id="streetname"
                placeholder="Street Name"
                />
            </div>
            <div className="form-group">
                <label >Apt Number</label>
                <input
                className="form-control"
                id="aptnumber"
                placeholder="Apt Number"
                type="integer"
                />
            </div>
            <div className="form-group">
                <label >City</label>
                <input
                className="form-control"
                id="city"
                placeholder="City"
                />
            </div>
            <div className="form-group">
                <label >State</label>
                <input
                className="form-control"
                id="state"
                placeholder="State"
                />
            </div>
            <div className="form-group">
                <label >Postal Code</label>
                <input
                className="form-control"
                id="postalcode"
                placeholder="Postal Code"
                />
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit" >
                Double Click To Confirm
                </button>
            </div>
        </form>
    );
};
export default Form;