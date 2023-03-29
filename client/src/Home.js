import './App.css';
import React, { Fragment, useState } from 'react';

function Home() {
    return(
        <div className='container'>
            <div id="welcomeStatement">
                <h1 className='text-center mt-5'>Welcome to Group 11's eHotel Web application!</h1>
                <h5 className='text-center'>This project was created by Akarsh Gharge, Axel Tang, and Eric Van De Lande for CSI 2132's Course Project</h5>
                <h5 className='text-center'>Please select a view to continue</h5>
            </div>

            <div className="header" id="buttonSelection">
                <button id="customerViewButton" type="button" class="btn btn-primary mr-2">Employee View</button>
                <button id="employeeViewbutton" type="button" class="btn btn-primary ml-2">Customer View</button>
            </div>
        </div>
    )
}

export default Home;