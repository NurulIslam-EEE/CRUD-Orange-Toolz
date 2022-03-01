import React, { useEffect, useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import User from '../User/User';

const MakeAdmin = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]); // use redux here
    const [isChanged, setIsChanged] = useState(false)
    console.log(user)
    useEffect(() => {
        fetch(`https://tranquil-forest-38467.herokuapp.com/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            });
    }, [isChanged]);

    return (
        <div className='adminHome'>
            <Container>
                <h3 className='mt-5 mb-3 text-center'>Users List</h3>
                <Stack gap={3} className='w-75 mx-auto'>
                    {
                        users.length > 0
                        &&
                        users.map(singleUser => <User isChanged={isChanged} setIsChanged={setIsChanged} key={singleUser._id} user={singleUser} mail={user.email} />)
                    }

                </Stack>
            </Container>
        </div>
    );
};

export default MakeAdmin;