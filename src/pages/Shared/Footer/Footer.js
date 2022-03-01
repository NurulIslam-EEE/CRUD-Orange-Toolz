import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import logo from '../../../images/logo1.png';
import './Footer.css'
import { NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-footer">
            <div className="container pt-5 pb-3 text-light">
                <div>

                    <p className="mt-5 mb-0 text-center">Copyright ©-2022</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;