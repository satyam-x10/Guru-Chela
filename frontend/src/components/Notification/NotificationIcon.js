import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { server } from '../../redux/Store';

const NotificationIcon = ({ userId }) => {
    const [notificationCount, setNotificationCount] = useState(0);
    const location = useLocation(); // Get the current route

    const getNewNotifications = async (userId) => {
        if (!userId) return;
        try {
            const response = await axios.get(`${server}/newNotification/${userId}`);
            const data = response.data;
            setNotificationCount(data.newNotificationsCount);
        } catch (error) {
            console.error('Error fetching new notifications:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            getNewNotifications(userId);
        }, 60000);

        // Call the function immediately when the component mounts
        getNewNotifications(userId);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [userId]);

    return (
        <div
            onClick={() => window.location.href = '/notifications'}
            style={{ position: 'relative', display: 'inline-block' }}>
            <FaBell />
            {location.pathname !== '/notifications' && notificationCount > 0 && (
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
