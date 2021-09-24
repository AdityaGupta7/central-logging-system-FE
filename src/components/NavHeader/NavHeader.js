import React from 'react';
import Clock from '../utils/Clock';
import accountIcon from '../../images/account.png';

const NavHeader = () => {
    return (
        <div className="top-navbar">
            <div className="top-header-inner">
                <ul>
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