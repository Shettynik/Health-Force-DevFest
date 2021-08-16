import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Doctor from './Doctor.jpg';
import './Main.css';


const Main = () => {
    return (
        <>
            <Container style={{ marginTop: "100px", display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center" }}>
                
                <div style={{margin: "auto"}}>
                    <p className="main__para">Join Hands With Us And Establish The System On Health Care</p>
                    
                </div>
                <img src={Doctor} alt="doctor-img" />
            </Container>
        </>
    )
}

export default Main
