import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import swal from 'sweetalert';

const User = ({ user, mail, setIsChanged, isChanged }) => {
    const { email, role, status } = user;
    const [currentRole, setCurrentRole] = useState(role);

    const handleChange = (email, status, role) => {
        if (mail === email) {
            swal("You can not change it");
            return;
        }
        const userData = { email, status, role };
        fetch(`https://tranquil-forest-38467.herokuapp.com/users/admin`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.result.modifiedCount) {
                    setCurrentRole(data.role);
                    setIsChanged(!isChanged);
                    swal('Status changed successfully');

                }

            })
    }
    // console.log(currentRole);
    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete');
        if (proceed) {
            const url = `https://tranquil-forest-38467.herokuapp.com/users/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        swal('Deleted Successfully', "success");
                        setIsChanged(!isChanged)
                    }
                })
        }
    }

    return (
        <Row className="bg-light p-3 pe-lg-5 rounded-3" style={{ fontFamily: "poppins", fontWeight: "300" }}>
            <Col sm={12} md={7} lg={5}>{email}</Col>
            <Col sm={4} md={3} lg={3}>Status: {status}</Col>
            <Col sm={4} md={2} lg={2}>
                <Button
                    className='bg-info border-0'
                    size="sm"
                    onClick={() => handleChange(user.email, user.status, currentRole)}>
                    Change
                </Button>
            </Col>
            <Col sm={4} md={2} lg={2}>
                <Button
                    className='bg-info border-0'
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                >
                    Delete
                </Button>
            </Col>
        </Row>
    );
};

export default User;