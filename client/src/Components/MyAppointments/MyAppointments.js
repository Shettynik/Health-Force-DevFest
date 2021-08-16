import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { axiosInstance } from '../../AxiosSetup';
import { useDispatch } from 'react-redux';
import { removeAlertMessage, setErrorAlert } from '../../features/alertSlice';

const MyAppointments = () => {
    const dispatch = useDispatch();
    const [appointments, setappointments] = useState([])

    const getMyAppointments = async () => {
        axiosInstance.get('/appointment/myappointments').then((data) => {
            console.log(data.data);
            setappointments(data.data);
        }).catch((error) => {
            console.log(error)
            dispatch(setErrorAlert({ errorAlert: "There was some fetching the data! Please try again later!" }));
            setTimeout(() => {
                dispatch(removeAlertMessage())
            }, 7000)
        })
    }

    useEffect(() => {
        getMyAppointments()
    }, [])
    return (
        <>
            <Container style={{ marginTop: "50px" }}>
                <h2>My Appointments</h2>
                {appointments.length === 0 ? (<p style={{ color: "grey", fontStyle: "italic", textAlign: "center" }}>You have no bookings!</p>) : <>
                    <p style={{fontFamily: 700, fontStyle:"italic"}}>Please do not share the respective patientId with anyone</p>
                    <Table style={{marginTop: "30px"}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Patient Id</th>
                                <th>Date</th>
                                <th>Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr>
                                    <td style={{ textTransform: 'capitalize' }}>{appointment.firstname} {appointment.lastname}</td>
                                    <td>{appointment.patientId}</td>
                                    <td>{appointment.date}</td>
                                    <td>
                                        {appointment.slot === 'thirdSlot' ? <h6 style={{ color: "blue" }}>Third Slot</h6> : appointment.slot === 'secondSlot' ? <h6 style={{ color: "yellow" }}>Second Slot</h6> : <h6 style={{ color: "green" }}>First Slot</h6>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>

                }

            </Container>
        </>
    )
}

export default MyAppointments
