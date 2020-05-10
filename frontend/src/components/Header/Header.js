import React from "react";
import logo from '../../assets/icons/logo.png';
import avatar from '../../assets/icons/avatar.png'
import hamburgerIcon from '../../assets/icons/hamburger-icon.jpeg'
import './_Header.scss';
import {Container} from "react-bootstrap";

const Header = () => {
    return (
        <Container className="container-fluid header">
            <div className="logo">
                <img className="hamburger-icon__img" alt="hamburger-icon" src={hamburgerIcon} onClick={()=> console.log('icon clicked')}/>
                <img className="logo__img" alt="logo" src={logo}/>
                <p>Budged Manager</p>
            </div>
            <img className="avatar__img" alt="avatar" src={avatar}/>
        </Container>

    )
}

export default Header;