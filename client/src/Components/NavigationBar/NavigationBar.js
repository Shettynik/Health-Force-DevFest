import React, { useEffect } from 'react';
import { Navbar, Container, Alert, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserLogout, selectActiveUser, setActiveUser } from '../../features/userSlice';
import { axiosInstance } from '../../AxiosSetup';
import { getErrorAlert, getSucessAlert, removeAlertMessage, setSuccessAlert, setErrorAlert } from '../../features/alertSlice';
import './NavigationBar.css';

const NavigationBar = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectActiveUser);

    const handleLogout = () => {
        axiosInstance.post('/auth/logout').then(() => {
            dispatch(setUserLogout());
            dispatch(setSuccessAlert({ successAlert: "You have successfully logged out!" }));
            setTimeout(() => {
                dispatch(removeAlertMessage())
            }, 7000)
        }).catch((error) => {
            console.log(error)
            // seterror(error)
            dispatch(setErrorAlert({ errorAlert: "There was some error. Please login again" }));
            setTimeout(() => {
                dispatch(removeAlertMessage())
            }, 7000)
        })
    }

    const successMessage = useSelector(getSucessAlert);
    const errorMessage = useSelector(getErrorAlert);

    const checkUserLogIn = async () => {
        axiosInstance.get("/auth/checkActiveUser").then((data) => {
            console.log(data.data)
            dispatch(setActiveUser({
                email: data.data.email,
                userType: data.data.role
            }));
        }).catch((error) => {
            dispatch(setUserLogout());
        })
    }

    useEffect(() => {
        checkUserLogIn()
    },[])

    return (
        <>
            {!user.email ? (<Navbar style={{ backgroundColor: "#7C83FD" }}>
                <Container className="navigation__bar__main">
                    <Navbar.Brand href="/" style={{ fontSize: "1.6rem", fontWeight: "600", color: "white" }}>Health Force</Navbar.Brand>
                    <div className="navigation__links">
                        <Link className="login__link" to="/login?show=true">Login</Link>
                        <Link className="register__link" to="/register?show=true">Register</Link>
                    </div>
                </Container>
            </Navbar>) : (<Navbar style={{ backgroundColor: "#7C83FD" }}>
                <Container>
                    <Navbar.Brand href="/home" style={{ fontSize: "1.6rem", fontWeight: "600", color: "white" }}>Health Force</Navbar.Brand>
                    <div>
                        {user.userType === "patient" && <Link to="/myAppointments" className="login__link" >My Appointments</Link>}
                        <Link to="/" className="register__link" onClick={handleLogout}>Logout</Link>
                    </div>

                </Container>
            </Navbar>)}
            {user.userType === "doctor" && (<Navbar style={{ backgroundColor: "rgb(195 197 237)" }} variant="dark">
                <Container>

                    <Nav className="me-auto">
                        <Nav.Link><Link style={{ textDecoration: "none" }} to="/doctor/view">View</Link></Nav.Link>
                        <Nav.Link><Link style={{ textDecoration: "none" }} to="/doctor/edit">Edit</Link></Nav.Link>
                        <Nav.Link><Link style={{ textDecoration: "none" }} to="/doctor/schedule">Schedule Appointments</Link></Nav.Link>
                        <Nav.Link><Link style={{ textDecoration: "none" }} to="/doctor/checkAppoinment">Check Appointments</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>)}
            {successMessage && <Alert variant="success" onClose={() => dispatch(removeAlertMessage())}>{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger" onClose={() => dispatch(removeAlertMessage())}>{errorMessage}</Alert>}
        </>
    )
}



export default NavigationBar
