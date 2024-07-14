import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationIcon = () => {
    const [hasNewNotification, setHasNewNotification] = useState(true);
    const [notificationCount, setNotificationCount] = useState(5);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <FaBell />
            {hasNewNotification && (
                <span style={{
                    margin: '15px', 
                    position: 'absolute',
                    bottom: '-5px',
                    right: '-5px',
                    background: 'red',
                    borderRadius: '50%',
                    color: 'white',
                    padding: '2px 6px',
                    fontSize: '10px'
                }}>
                    {notificationCount}
                </span>
            )}
        </div>
    );
};

export default NotificationIcon;
