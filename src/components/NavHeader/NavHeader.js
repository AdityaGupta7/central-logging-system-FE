import React from 'react';
import Clock from '../utils/Clock';

const NavHeader = () => {
    return (
        <div className="top-navbar">
            <div className="top-header-inner">
                <ul>
                    <li>Central Logging System</li>
                    <li>
                        <Clock />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavHeader;