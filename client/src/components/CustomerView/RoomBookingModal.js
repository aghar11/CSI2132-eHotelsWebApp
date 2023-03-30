import '../../App.css';
import React, { useState } from "react";


function RoomBookingModal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
        <button id="roomBoookingButton" type="button" class="btn btn-success" data-toggle="modal" data-target="#roomBookingModal">Book</button>

        <div class="modal" id="roomBookingModal" tabindex='-1' role='dialog' aria-labelledby='roomBookingModalLabel' aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Room Booking</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Book</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default RoomBookingModal;