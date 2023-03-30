import '../../App.css';
import React, { useState } from "react";
import { Modal } from "react-bootstrap";


function FilterModal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
        <div className = 'text-right'>
                <button id="customerViewFilterButton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#filterModal">Filter</button>
        </div>

        <div class="modal" id="filterModal" tabindex='-1' role='dialog' aria-labelledby='filterModalLabel' aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Filtering Options</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Apply Filters</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default FilterModal;