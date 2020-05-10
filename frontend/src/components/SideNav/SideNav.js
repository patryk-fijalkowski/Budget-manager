import React from "react";
import { Link } from 'react-router-dom'
import './_SideNav.scss';


const SideNav = ({sideNavOpen, setSideNavOpen}) => {
    const hideSideNav = () => {
        setSideNavOpen(false)
    }
    return (
        <>
            <div className={sideNavOpen ? 'sideNav' : ' sideNav sideNav--hidden'}>
                <ul>
                    <li key='1' onClick={hideSideNav}><Link to='/'>Home</Link></li>
                    <li key='2' onClick={hideSideNav}><Link to='/createReceipt'>Create Receipt</Link></li>
                    <li key='3' onClick={hideSideNav}><Link to='/allReceipts'>All Receipts</Link></li>
                </ul>
            </div>
            {sideNavOpen &&
            <div className="backdrop"></div>}
        </>

    )
}

export default SideNav;