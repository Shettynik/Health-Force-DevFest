import React, { useState } from 'react';
import { Container, Form, Row, Col, Table } from 'react-bootstrap';
import { axiosInstance } from '../../../AxiosSetup';
import { useDispatch } from 'react-redux';
import { removeAlertMessage, setErrorAlert, setSuccessAlert } from '../../../features/alertSlice';

const CheckAppoinments = () => {
    const [date, setdate] = useState("");
    const [patients, setpatients] = useState([]);
    const dispatch = useDispatch();

    const handleCheck = (e) => {
        e.preventDefault();
        axiosInstance.get(`/appointment?date=${date}`).then((data) => {
            console.log(data.data)
            setpatients(data.data)
            if (patients.length === 0) {
                dispatch(setSuccessAlert({ successAlert: "You have no bookings yet!" }));
                setTimeout(() => {
                    dispatch(removeAlertMessage());
                }, 7000)
            }
        }).catch((error) => {
            console.log(error)
            dispatch(setErrorAlert({ errorAlert: "Data could not be fetched! Please try again later!" }));
            setTimeout(() => {
                dispatch(removeAlertMessage());
            }, 7000)
        })
    }

    return (
        <>
            <Container style={{ marginTop: "50px" }}>
                <Form onSubmit={handleCheck}>
                    <Row>
                        <Col sm={12}><Form.Label style={{ fontFamily: "800", fontSize: "1.5rem" }}>Select Date</Form.Label></Col>
                        <Col sm={12}><Form.Control type="date" required name="date" onChange={(e) => { setdate(e.target.value) }} /></Col>
                        <Col sm={12} style={{ textAlign: "center", marginTop: "20px" }}><button className="login__btn" type="submit">Check</button></Col>
                    </Row>
                </Form>
            </Container>
            <Container>
                {patients.length === 0 ? <p style={{color: "grey", textAlign: 'center', marginTop: "30px"}}>No patient has booked an appointment for the day</p> :
                (<Table style={{marginTop: "30px"}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Patient Id</th>
                            <th>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr>
                                <td style={{textTransform: 'capitalize'}}>{patient.firstname} {patient.lastname}</td>
                                <td>{patient.patientId}</td>
                                <td>
                                    {patient.slot==='thirdSlot' ? <h6 style={{color: "blue"}}>Third Slot</h6> : patient.slot==='secondSlot' ? <h6 style={{color: "yellow"}}>Second Slot</h6> : <h6 style={{color: "green"}}>First Slot</h6>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>)}
            </Container>

        </>
    )
}

export default CheckAppoinments
