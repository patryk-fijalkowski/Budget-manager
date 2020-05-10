import React from "react";
import './_Footer.scss';
import {Container} from "react-bootstrap";

const Footer = () => {
    return (
        <Container className="container-fluid footer">
            <p>Contact information: <a href="mailto:patryk.fijalkowski1@egmail.com">patryk.fijalkowski1@egmail.com</a>.</p>
        </Container>
    )
}

export default Footer;