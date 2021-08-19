import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import './nav.css';

function NavLinks(){
    return(
        <nav>
            <Link to={'/StudentList'}>
                <button type="button" className="btn btn-primary btn-lg">Student List</button>
            </Link>
            <Link to={'/RegLink'}>
                <button type="button" className="btn btn-primary btn-lg">Register</button>
            </Link>
            <Link to={'/Login'}>
                <button type="button" className="btn btn-primary btn-lg">Login</button>
            </Link>
        </nav>
    );
}

export default NavLinks;