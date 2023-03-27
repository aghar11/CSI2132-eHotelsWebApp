import React, {Fragment, useState} from "react"

const EditHotel = ({hotel}) => {
    const [hotelid, sethotelid] = useState(hotel.hotelid);

    //update hotelid func

    const updateHotelid = async(e) => {
        e.preventDefault();
        try {
            const body = (hotelid);
            const response = await fetch(`http://localhost:5000/hotel/${hotel.hotelid}`, {
                method: "PUT",
                header: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <Fragment>
            <button 
                type="button" 
                className="btn btn-warning" 
                data-toggle="modal" 
                data-target={`#id${hotel.hotelid}`}
            >
                Edit
            </button>
            
            
            <div className="modal" id={`id${hotel.hotelid}`} onClick={() => sethotelid(hotel.hotelid)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Hotel</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => sethotelid(hotel.hotelid)}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className= "form-control" value={hotelid} onChange={e => sethotelid(e.target.value)}/>   
                        </div>
            
            
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateHotelid(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => sethotelid(hotel.hotelid)}>Close</button>
                        </div>
            
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditHotel;