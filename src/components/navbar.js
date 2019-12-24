import React from 'react';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    renderItems() {
        if (!this.props.items)
            return null;
        return this.props.items.map((item, i) => (
            <li key={i} className="nav-item text-capitalize">
                <Link to={item.to} style={{ textDecoration: 'none' }}>
                    <div className="nav-link" href="#" onClick={() => this.props.itemClick(item)}>{item.name}</div>
                </Link>
            </li>
        ))
    }
    renderSignButtons() {
        if (this.props.signed)
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <h6 className ="text-light">{this.props.username+", "}
                            <span className = "text-secondary btn p-0 m-0" style={{textDecoration:'underline'}}>sign out</span>
                        </h6>
                    </li>
                </ul>
            );
        return (
            <div className='row align-items-center px-2'>
                <button type="submit" className="btn btn-danger text-capitalize" onClick={() => this.props.logIn()}>Log In</button>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <div href="#" className="text-capitalize mx-3" onClick={() => this.props.signUp()}>Sign Up</div>
                    </li>
                </ul>
            </div>
        );
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-custom overflow-hidden">
                <a className="navbar-brand text-capitalize" href="/">{this.props.companyName}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <ul className="navbar-nav mr-auto">
                    {
                        this.renderItems()
                    }
                </ul>
                {
                    this.renderSignButtons()
                }
            </nav>
        );
    }
}