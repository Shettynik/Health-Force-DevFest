import React from 'react';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import BookAppoinment from './Components/BookAppointment/BookAppoinment';
import View from './Components/Doctor/View/View';
import Edit from './Components/Doctor/Edit/Edit';
import CheckAppoinments from './Components/Doctor/CheckAppoinments/CheckAppoinments';
import ScheduleAppoinments from './Components/Doctor/ScheduleAppoinments/ScheduleAppoinments';
import Main from './Components/Main/Main';
import MyAppointments from './Components/MyAppointments/MyAppointments';
// import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/home" exact component={Home} />
          <Route path="/bookappoinment" exact component={BookAppoinment} />
          <Route path="/myAppointments" exact component={MyAppointments} />
          <Route path="/doctor/view" exact component={View} />
          <Route path="/doctor/edit" exact component={Edit} />
          <Route path="/doctor/checkAppoinment" exact component={CheckAppoinments} />
          <Route path="/doctor/schedule" exact component={ScheduleAppoinments} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
