import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import { useParams, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { userId } = useParams();  // If you use React Router to pass userId via URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const storedUserId = localStorage.getItem('userId');  // Retrieve from localStorage if not passed via URL

            if (!storedUserId && !userId) {
                setError("User is not logged in.");
                setLoading(false);
                return;
            }

            const idToUse = userId || storedUserId;

            try {
                const data = await ApiService.getUserInfo(idToUse);  // Fetch user info using API service
                setUserInfo(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load user info.");
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [userId]);  // Run when userId changes (if passed in URL)

   

    if (loading) {
        return <div>Loading user information...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {userInfo && (
                <div className="profile-details">
                    <h2>{userInfo.user.name}</h2>
                    <p><strong>Email:</strong> {userInfo.user.email}</p>
                    <p><strong>Phone:</strong> {userInfo.user.phoneNumber}</p>
                    <p><strong>Role:</strong> {userInfo.user.role}</p>
                    <div className="order-history">
                        <h3>Order History:</h3>
                        <ul>
                            {userInfo.user.orderItemList && userInfo.user.orderItemList.length > 0 ? (
                                userInfo.user.orderItemList.map((orderItem, index) => (
                                    <li key={index}>
                                        {orderItem.name} - ${orderItem.price?.toFixed(2)} x {orderItem.quantity}
                                    </li>
                                ))
                            ) : (
                                <p>No past orders found.</p>
                            )}
                        </ul>
                    </div>
               
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
