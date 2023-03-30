import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './Home';
import EmployeeView from './components/EmployeeView/hotelComponents/EmployeeView';
import ListRooms from './components/CustomerView/roomBookingComponents/ListRooms';

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path="/" Component={Home}/>
                <Route path="/employeeView" Component={EmployeeView}/>
                <Route path="/customerView" Component={ListRooms}/>
            </Routes>
        </main>
    )
}

export default Main;