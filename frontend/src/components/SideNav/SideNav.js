import React, {useState} from "react";
import './_SideNav.scss';


const SideNav = ({sideNavOpen}) => {

    return (
        <>
            <div className={sideNavOpen ? 'sideNav' : ' sideNav sideNav--hidden'}>
                <ul>
                    <li>Link1</li>
                    <li>Link2</li>
                    <li>Link3</li>
                    <li>Link4</li>
                </ul>
            </div>
            {sideNavOpen &&
            <div className="backdrop"></div>}
        </>

    )
}

export default SideNav;