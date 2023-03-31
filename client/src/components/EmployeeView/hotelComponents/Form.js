import React from 'react';

export const Form = ({ onSubmit }) => {

    

    return (
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label >Hotel ID</label>
            <input className="form-control" id="hotelid" placeholder="Hotel ID" type="integer"/>
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
            <label >Category</label>
            <input
            className="form-control"
            id="category"
            placeholder="Category"
            />
        </div>
        <div className="form-group">
            <label >Number of Rooms</label>
            <input
            className="form-control"
            id="numberofrooms"
            placeholder="Number of Rooms"
            type="integer"
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
                Submit
            </button>
        </div>
        </form>
    );
};
export default Form;