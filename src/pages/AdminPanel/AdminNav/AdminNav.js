import React from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../images/logo1.png'
import './AdminNav.css'

const AdminNav = () => {
    const { user, logOut } = useAuth();


    return (
        <Navbar bg="primary" variant="dark" className='navbar' expand={false}>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >
                        <h4>Orange Toolz</h4>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <LinkContainer to="/adminPanel/makeAdmin" >
                            <Offcanvas.Title id="offcanvasNavbarLabel" className='text-info fs-3 fw-bold' as={Navbar.Brand}>Dashboard</Offcanvas.Title>
                        </LinkContainer>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">


                            <LinkContainer to="makeAdmin" >
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="register" >
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>





                            {
                                user?.displayName && <Navbar.Text>
                                    {user.displayName} &nbsp;
                                </Navbar.Text>
                            }
                            {
                                user?.email ?
                                    <LinkContainer to="/login">  <Button
                                        variant='info'
                                        onClick={logOut}>Logout</Button></LinkContainer>
                                    :
                                    <LinkContainer to="/login">
                                        <Button>Login</Button>
                                    </LinkContainer>
                            }

                        </Nav>

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default AdminNav;