import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './Home';
import ListHotels from './components/EmployeeView/hotelComponents/ListHotels';
import CustomerDashboard from './components/CustomerView/CustomerDashboard';
import RoomsByAreaView from './components/CustomerView/RoomsByAreaView';
import HotelCapacityView from './components/CustomerView/HotelCapacityView';
import EmployeeRoomView from './components/EmployeeView/roomManagementComponents/EmployeeRoomView'

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path="/" Component={Home}/>
                <Route exact path="/employeeView" Component={ListHotels}/>
                <Route exact path="/customerView" Component={CustomerDashboard}/>
                <Route exact path='/roomsByArea' Component={RoomsByAreaView}/>
                <Route exact path='/hotelCapacity' Component={HotelCapacityView}/>
                <Route exact path="/employeeView/rooms" Component={EmployeeRoomView}/>
            </Routes>
        </main>
    )
}

export default Main;