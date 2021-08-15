import React from 'react'
import { Button, Container } from 'react-bootstrap';
import './Main.css';


const Main = () => {
    return (
        <>
            <Container style={{ marginTop: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* <img src={Doctor} alt="doctor-img" /> */}
                <div style={{margin: "auto"}}>
                    <p className="main__para">Join Hands With Us And Establish The System On Health Care</p>
                </div>
            </Container>
        </>
    )
}

export default Main
