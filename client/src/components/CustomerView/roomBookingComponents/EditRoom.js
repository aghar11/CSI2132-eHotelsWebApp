import React, {Fragment, useState} from "react"

const EditRoom = ({room}) => {
    const [roomNumber, setroomNumber] = useState(room.roomNumber);


    const updateRoomNumber = async(e) => {
        e.preventDefault();
        try {
            const body = (roomNumber);
            const response = await fetch(`http://localhost:5000/api/room/${room.roomNumber}`, {
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
                data-target={`#id${room.roomNumber}`}
            >
                Edit
            </button>
            
            
            <div className="modal" id={`id${room.roomNumber}`} onClick={() => setroomNumber(room.roomNumber)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Room</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setroomNumber(room.roomNumber)}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className= "form-control" value={roomNumber} onChange={e => setroomNumber(e.target.value)}/>   
                        </div>
            
            
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateRoomNumber(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setroomNumber(room.roomNumber)}>Close</button>
                        </div>
            
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditRoom;