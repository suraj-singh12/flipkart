import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import Icons from './icons.json';


const url = 'https://zany-dog-tank-top.cyclic.app/api/auth/userInfo';

class Header extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            userData: '',
            currentWeather: ''
        }
    }
    toggleNightMode() {
        return;
    }
    loadDetailsPage = (event) => {
        event.preventDefault();
        // console.log(event);
        // console.log(event.target);
        console.log(event.target.searchbar.value);

        let items = '';
        // list all items that api has
        axios.get('https://crazy-dove-yoke.cyclic.app/list-apis')
            .then(response => {
                items = response.data;
            })
            .then(() => {
                console.log(this.props);
                // exact search
                let isPresent = false;
                if (items.includes(event.target.searchbar.value)) {
                    this.props.history.push('/listing/' + event.target.searchbar.value);
                } else {
                    // fuzzy search
                    for (let i = 0; i < items.length; ++i) {
                        if (items[i].includes(event.target.searchbar.value) || items[i].includes(event.target.searchbar.value.split(' ')[0])) {
                            isPresent = true;
                            this.props.history.push('/listing/' + items[i]);
                        }
                    }
                }
                if (!isPresent) {
                    this.props.history.push('/listing/' + event.target.searchbar.value);
                }
            })
    }

    handleLogout = () => {
        // clear all information of user
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('ltk');
        sessionStorage.setItem('loginStatus', false);

        // route the user back to home page
        this.props.history.push('/');       // ensure to export the header withRouter because it is a child component, to use default props we need to import withRouter,  & export too.
    }

    loadCart = () => {
        console.log('loading cart')
        this.props.history.push('/cart');
    }


    conditionalHeader = () => {
        if (sessionStorage.getItem('ltk')) {
            let data = this.state.userData;
            console.log(sessionStorage.getItem('userInfo'));

            if (!sessionStorage.getItem('userInfo') || sessionStorage.getItem('userInfo').length < 4) {
                let outArray = [data.name, data.email, data.phone, data.role];
                // save user data (will use to fill the checkout page form details automatically)
                sessionStorage.setItem('userInfo', outArray);
                console.log('set the data');
            }
            // save the loginStatus of user as true 
            // we will use it to check if the user is logged in, whenever required.
            sessionStorage.setItem('loginStatus', true);

            return (
                <div className="login-signup">
                    <div className="login-dropdown dropdown">
                        <button className="btn login-button" data-bs-toggle="dropdown"><span>Hi {data.name}</span></button>
                        <ul className="dropdown-menu dropdown-menu-center">
                            <li><Link to={'/login'} className="dropdown-item"><i className="drop-icons bi bi-person-circle"></i>
                                <p className="drop-icon-text">My Profile</p>
                            </Link></li>
                            <li><Link to={'/'} className="dropdown-item"><i className="drop-icons bi bi-plus-lg"></i>
                                <p className="drop-icon-text">Flipkart Plus Zone</p>
                            </Link></li>
                            <li><Link to={'/cart'} className="dropdown-item"><i className="drop-icons bi bi-cart"></i>
                                <p className="drop-icon-text">Cart</p>
                            </Link></li>
                            <li><Link to={'/orders'} className="dropdown-item"><i className="drop-icons bi bi-box-arrow-in-up"></i>
                                <p className="drop-icon-text">Orders</p>
                            </Link></li>
                            <li><Link to={'/wishlist'} className="dropdown-item" href="/"><i className="drop-icons bi bi-suit-heart-fill"></i>
                                <p className="drop-icon-text">Wishlist</p>
                            </Link></li>    
                        </ul>
                    </div>
                    <Link to="/">
                        <button onClick={this.handleLogout} className="btn signup-button">Logout</button>
                    </Link>
                    <button className="btn cart" onClick={() => {this.loadCart()}}><i className="bi bi-cart-fill"></i>Cart</button>
                </div>
            )
        } else {
            return (
                <div className="login-signup">
                    <div className="login-dropdown dropdown">
                        <button className="btn login-button" data-bs-toggle="dropdown">Login</button>
                        <ul className="dropdown-menu dropdown-menu-center">
                            <li><Link to={'/login'} className="dropdown-item"><i className="drop-icons bi bi-person-circle"></i>
                                <p className="drop-icon-text">My Profile</p>
                            </Link></li>
                            <li><Link to={'/'} className="dropdown-item"><i className="drop-icons bi bi-plus-lg"></i>
                                <p className="drop-icon-text">Flipkart Plus Zone</p>
                            </Link></li>
                            <li><Link to={'/login'} className="dropdown-item"><i className="drop-icons bi bi-cart"></i>
                                <p className="drop-icon-text">Cart</p>
                            </Link></li>
                            <li><Link to={'/login'} className="dropdown-item"><i className="drop-icons bi bi-box-arrow-in-up"></i>
                                <p className="drop-icon-text">Orders</p>
                            </Link></li>
                            <li><Link to={'/login'} className="dropdown-item" href="/"><i className="drop-icons bi bi-suit-heart-fill"></i>
                                <p className="drop-icon-text">Wishlist</p>
                            </Link></li>
                        </ul>
                    </div>
                    <Link to="/signup">
                        <button className="btn signup-button">Sign-up</button>
                    </Link>
                    <button className="btn cart" onClick={() => {this.loadCart()}}><i className="bi bi-cart-fill"></i>Cart</button>
                </div>
            )
        }
    }

    render() {
        return (
            <header style={{ backgroundColor: '#2874f0' }}>
                <div className="logo" onClick={() => this.props.history.push('/')} style={{ cursor: 'pointer' }}>
                    <img src={Icons.flipkart} alt="flipkart" />
                    <Link to={'/'}>Explore <span className="plus">Plus <img src={Icons['flipkart-logo-last-part']} alt="plus" /></span></Link>
                </div>
                <div className="search-bar">
                    <form id="search" action="#" onSubmit={(event) => this.loadDetailsPage(event)}>
                        <input type="text" name="searchbar" placeholder="Search for products, brands and more" />
                        <button type="submit"><i className="bi bi-search"></i></button>
                    </form>
                </div>

                {this.conditionalHeader()}
            </header>
        )
    }

    componentDidMount() {
        // get the user information using the login token (from sessionStorage)
        // it was saved when user logged in (in login.js)
        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': sessionStorage.getItem('ltk')
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ userData: data })
            })
    }
}

export default withRouter(Header);