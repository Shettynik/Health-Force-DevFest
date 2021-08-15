import React, { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { axiosInstance } from '../../../AxiosSetup';

const CheckAppoinments = () => {
    const [date, setdate] = useState("");

    const handleCheck = (e) => {
        e.preventDefault();
        axiosInstance.get(`/appointment?date=${date}`).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Container style={{marginTop:"50px"}}>
                <Form onSubmit={handleCheck}>
                    <Row>
                        <Col sm={12}><Form.Label style={{fontFamily:"800", fontSize:"1.5rem"}}>Select Date</Form.Label></Col>
                        <Col sm={12}><Form.Control type="date" name="date" onChange={(e) => { setdate(e.target.value) }} /></Col>
                        <Col sm={12} style={{textAlign: "center", marginTop:"20px"}}><button className="login__btn" type="submit">Check</button></Col>
                    </Row>
                </Form>
            </Container>
            <Container>
                <Row>
                    
                </Row>
            </Container>

        </>
    )
}

export default CheckAppoinments
