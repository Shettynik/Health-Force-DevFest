import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setActiveUser } from '../../features/userSlice';
import { axiosInstance } from '../../AxiosSetup';
import { getErrorAlert, removeAlertMessage, setErrorAlert, setSuccessAlert } from '../../features/alertSlice';

const Register = ({ history }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [type, settype] = useState("");

    const [show, setShow] = useState(new URLSearchParams(location.search).get('show'));

    const errorMessage = useSelector(getErrorAlert)

    const handleClose = () => {
        setShow(false);
        history.push("/")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!type){
            return dispatch(setErrorAlert({errorAlert: "You have not selected a type"}));
        }
        if(password.length < 6){
            return dispatch(setErrorAlert({errorAlert: "Password should contain minimum 6 characters"}));
        }
        axiosInstance.post('/auth/register', { firstname, lastname, email, password, role: type }).then(() => {
            setShow(false);
            dispatch(setActiveUser({
                email: email,
                userType: type
            }));
            dispatch(setSuccessAlert({ successAlert: "You have successfully registered!" }));
            setTimeout(() => {
                dispatch(removeAlertMessage())
            }, 7000)
            if(type==="doctor"){
                history.push("/doctor/edit");
            }else{
                history.push("/home");
            }
        }).catch((error) => {
            dispatch(setErrorAlert({ errorAlert: "Email already exists" }));
            setTimeout(() => {
                dispatch(removeAlertMessage())
            }, 7000)
        })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                {errorMessage && <Alert variant="danger" onClose={() => dispatch(removeAlertMessage())} dismissible>{errorMessage}</Alert>}
                <Modal.Header closeButton>
                    <Modal.Title className="login__title">Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Control style={{marginBottom: "5px"}} type="text" placeholder="Enter Firstname" value={firstname} onChange={(e) => { setfirstname(e.target.value) }} />
                        <Form.Control style={{marginBottom: "5px"}} type="text" placeholder="Enter Lastname" value={lastname} onChange={(e) => { setlastname(e.target.value) }} />
                        <Form.Control style={{marginBottom: "5px"}} type="email" placeholder="Enter Email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <Form.Control style={{marginBottom: "5px"}} type="password" placeholder="Enter Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <div>
                            <Form.Check style={{marginBottom: "5px"}} name="user-type" value="patient" onChange={() => {settype("patient")}} type="radio" label="Patient" />
                            <Form.Check style={{marginBottom: "5px"}} name="user-type" value="doctor" onChange={() => {settype("doctor")}} type="radio" label="Doctor" />
                        </div>
                        <Button style={{backgroundColor: "rgb(103, 110, 248)", padding: "10px 100px", marginLeft: "100px" }} type="submit">Register</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Register;