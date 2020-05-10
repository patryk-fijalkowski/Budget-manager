import React, {useState} from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import SideNav from "./SideNav/SideNav";


const Layout = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false)

    return (
        <>
            <Header setSideNavOpen={setSideNavOpen} sideNavOpen={sideNavOpen}/>
            <SideNav sideNavOpen={sideNavOpen}/>
            <Navbar/>
            <Footer/>
        </>
    )
}

export default Layout;

