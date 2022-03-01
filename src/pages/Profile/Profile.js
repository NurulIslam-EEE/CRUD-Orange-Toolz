import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const { user } = useAuth();
    console.log(user)
    useEffect(() => {
        fetch(`https://tranquil-forest-38467.herokuapp.com/users/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setProfile(data.user)
            });
    }, [user?.email]);

    return (
        <div>


            <div className='container text-center bg-light p-5 my-5'>
                <h2 className='text-color mb-3'>My Profile</h2>
                <div style={{ fontFamily: "poppins" }}>
                    <h4>{profile?.displayName}</h4>
                    <p className='m-0'>Role: {profile?.role}</p>
                    <p className='m-0'>Email: {profile?.email}</p>

                </div>
            </div>

            
        </div>
    );
};

export default Profile;