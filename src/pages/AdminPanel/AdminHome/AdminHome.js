import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import AdminNav from '../AdminNav/AdminNav';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const AdminHome = () => {
    const { user } = useAuth()
    console.log(user)
    return (
        <div className='adminHome row'>
            <div className='col-md-3 sidebar text-center'>
                <h3>Dashboard</h3>

                <LinkContainer to="makeAdmin" >
                    <Nav.Link className='text-info fs-5'>Users List</Nav.Link>
                </LinkContainer>
                <LinkContainer to="addFile" >
                    <Nav.Link className='text-info fs-5'>Files Upload</Nav.Link>
                </LinkContainer>
                <LinkContainer to="data" >
                    <Nav.Link className='text-info fs-5'>Files and Group Info</Nav.Link>
                </LinkContainer>
            </div>
            <div className='col-md-9'>
                <Outlet />

            </div>

        </div>
    );
};

export default AdminHome;