import React from 'react';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import imgBanner from '../../../images/img-banner.png'
import './Banner.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const Banner = () => {
    const { user, admin, logOut } = useAuth();

    return (
        <div className="img-banner">
            <div className="container bg-color-sm text-center">
                <div className='row align-items-center'>
                    <div className="col-12 col-md-12 col-lg-12 text-center text-light text-start">

                        <h1>Welcome</h1>
                    </div>
                    <LinkContainer to="/login">
                        <Nav.Link>
                            {!user.email ? <Button variant='outline-info text-info'>Login</Button> : <Button
                                className='button-color border-0'
                                onClick={logOut}>Logout</Button>}
                        </Nav.Link>
                    </LinkContainer>
                </div>
            </div>
        </div>
    );
};

export default Banner;