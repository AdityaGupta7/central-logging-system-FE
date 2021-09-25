import React from 'react';
import Clock from '../utils/Clock';
import accountIcon from '../../images/account.png';
import menuIcon from '../../images/menu-icon.png';

const NavHeader = () => {
    return (
        <div className="top-navbar">
            <div className="top-header-inner">
                <ul>
                    <li className="side-bar-icon"><label htmlFor="side-bar-menu-trigger"><img src={menuIcon} alt="" /></label></li>
                    <li><img src={accountIcon} alt="" /> Central Logging System</li>
                    <li>
                        <Clock />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavHeader;