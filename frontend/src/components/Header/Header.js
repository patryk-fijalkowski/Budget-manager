import React from "react";
import logo from '../../assets/icons/logo.png';
import avatar from '../../assets/icons/avatar.png'
import hamburgerIcon from '../../assets/icons/hamburger-icon.jpeg'
import './_Header.scss';
import {Container} from "react-bootstrap";

const Header = ({setSideNavOpen, sideNavOpen}) => {
    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen)
    }

    return (
        <Container className="container-fluid header">
            <div className="logo">
                <img className="hamburger-icon__img" alt="hamburger-icon" src={hamburgerIcon} onClick={toggleSideNav}/>
                <img className="logo__img" alt="logo" src={logo}/>
                <p>BM</p>
            </div>
            <img className="avatar__img" alt="avatar" src={avatar}/>
        </Container>

    )
}

export default Header;