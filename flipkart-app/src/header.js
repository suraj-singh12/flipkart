import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import Icons from './icons.json';


class Header extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        // console.log(Icons);
        // console.log(Icons.flipkart);
        // console.log(Icons['flipkart']);
    }
    toggleNightMode() {
        return;
    }

    render() {
        return (
            <header style={{ backgroundColor: '#2874f0' }}>
                <div className="logo">
                    <img src={Icons.flipkart} alt="flipkart" />
                    <Link to={'/'}>Explore <span className="plus">Plus <img src={Icons['flipkart-logo-last-part']} alt="plus" /></span></Link>
                </div>
                <div className="search-bar">
                    <form id="search" action="#">
                        <input type="text" name="searchbar" placeholder="Search for products, brands and more" />
                        <button type="submit"><i class="bi bi-search"></i></button>
                    </form>
                </div>

                <div className="login-signup">
                    <div className="login-dropdown dropdown">
                        <button className="btn login-button" data-bs-toggle="dropdown">Login</button>
                        <ul class="dropdown-menu dropdown-menu-center">
                            <li><a class="dropdown-item" href="#"><i class="drop-icons bi bi-person-circle"></i>
                                <p class="drop-icon-text">My Profile</p>
                            </a></li>
                            <li><a class="dropdown-item" href="#"><i class="drop-icons bi bi-plus-lg"></i>
                                <p class="drop-icon-text">Flipkart Plus Zone</p>
                            </a></li>
                            <li><a class="dropdown-item" href="#"><i class="drop-icons bi bi-box-arrow-in-up"></i>
                                <p class="drop-icon-text">Orders</p>
                            </a></li>
                            <li><a class="dropdown-item" href="#"><i class="drop-icons bi bi-suit-heart-fill"></i>
                                <p class="drop-icon-text">Wishlist</p>
                            </a></li>
                            <li><a class="dropdown-item" href="#"><i class="drop-icons bi bi-hdd-stack-fill"></i>
                                <p class="drop-icon-text">Rewards</p>
                            </a></li>
                        </ul>
                    </div>
                    <button className="btn signup-button">Sign-up</button>
                    <button className="btn cart"><i class="bi bi-cart-fill"></i>Cart</button>
                </div>
            </header>
        )
    }
}

export default withRouter(Header);