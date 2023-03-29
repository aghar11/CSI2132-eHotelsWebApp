import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './Home';
import ListHotels from './components/EmployeeView/hotelComponents/ListHotels';
import ListRooms from './components/CustomerView/roomBookingComponents/ListRooms';

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path="/" Component={Home}/>
                <Route exact path="/employeeView" Component={ListHotels}/>
                <Route exact path="/customerView" Component={ListRooms}/>
            </Routes>
        </main>
    )
}

export default Main;