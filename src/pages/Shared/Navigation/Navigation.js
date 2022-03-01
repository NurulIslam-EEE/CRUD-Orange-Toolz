import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../images/logo1.png';

const Navigation = () => {
    const { user, admin, logOut } = useAuth();
    console.log(admin)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" sticky="top" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >
                        <h3>Orange Toolz</h3>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mx-auto">





                    </Nav>

                    <Nav>
                        {
                            user?.email && <LinkContainer to="/adminPanel">
                                <Nav.Link>Dashboard</Nav.Link>
                            </LinkContainer>
                        }

                        {user?.email && <LinkContainer to="/profile">
                            <Nav.Link>My profile</Nav.Link>
                        </LinkContainer>}
                        {
                            user.email ?
                                <Button
                                    className='button-color border-0'
                                    onClick={logOut}>Logout</Button>
                                :
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <Button variant='outline-info text-white'>Login</Button>
                                    </Nav.Link>
                                </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;