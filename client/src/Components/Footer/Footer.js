import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    return (
        <>
            <Navbar style={{backgroundColor:" rgb(75, 83, 240)", padding: "50px 0"}} variant="dark" fixed="bottom">
                <Container>
                    <Nav style={{margin: "auto"}}>
                        <Nav.Link ><FacebookIcon /></Nav.Link>
                        <Nav.Link ><TwitterIcon /></Nav.Link>
                        <Nav.Link ><InstagramIcon /></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Footer
