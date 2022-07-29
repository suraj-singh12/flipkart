import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    toggleNightMode() {
        return;
    }

    render() {
        return (
            <header>
                {/* <!-- -------------------------------- Website Logo (Flipkart) -------------------------------- --> */}
                <div id="logo">
                    <a href="index.html"><img src="res/icons/flipkart.png" alt="flipkart" /></a>
                    <a href="index.html">Explore
                        <span id="plus">Plus
                            <img src="res/icons/flipkart-logo-last-part.png" alt="plus" />
                        </span>
                    </a>
                </div>
                {/* <!-- -------------------------------- search bar -------------------------------- --> */}
                <div id="search-bar">
                    <form id="search" action="#">
                        {/* <!-- input field --> */}
                        <input type="text" name="search-bar" id="search-bar"
                            placeholder="Search for products, brands, and more" />
                        {/* <!-- submit button --> */}
                        <button type="submit"><i className="bi bi-search"></i></button>
                    </form>
                </div>
                {/* <!-- --------------------------------- weather of your place ------------------------- --> */}
                <div id="weather-box">
                    <p id="weather"></p>

                    <div id="weather-icon">
                        <img src="https://openweathermap.org/img/w/01d.png" alt="weather-icon" />
                    </div>
                </div>
                {/* <!-- the p#weather need to exist before the script is loaded, that's why script for weather is loaded here --> */}
                <script src="scripts/weather-script.js"></script>
                {/* <!-- --------------------------------- dark/light mode ------------------------- --> */}
                <div id="light-dark">
                    {/* <!-- <i className="bi bi-moon-stars-fill"></i> --> */}
                    {/* <!-- <i className="bi bi-cloud-moon-fill"></i> --> */}
                    {/* <!-- <i className="bi bi-moon-fill"></i> --> */}
                    <button onClick={this.toggleNightMode()}><i id="sun-moon" className="bi bi-moon-stars-fill"></i></button>
                    <button onClick={this.toggleNightMode()}><i id="sun-appear" style={{display: 'none'}}
                        className="bi bi-brightness-high"></i></button>
                </div>
                {/* <!-- -------------------------------- Cart Icon -------------------------------- --> */}
                <div id="cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>Cart</span>
                </div>
                {/* <!-- -------------------------------- more button -------------------------------- --> */}
                <div id="more" className="dropdown">
                    <button type="button" className="btn text-center dropdown-toggle" data-bs-toggle="dropdown">
                        More
                    </button>
                    <ul className="dropdown-menu dropdown-menu-center font14">
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-bell-fill"></i>
                            <p className="drop-icon-text">Notification Preferences</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-inboxes-fill"></i>
                            <p className="drop-icon-text">Sell on Flipkart</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-question-square-fill"></i>
                            <p className="drop-icon-text">24x7 Customer Care</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons fa-solid fa-arrow-trend-up"></i>
                            <p className="drop-icon-text">Advertise</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-download"></i>
                            <p className="drop-icon-text">Download App</p>
                        </a></li>
                    </ul>
                </div>

                {/* <!-- -------------------------------- Login button -------------------------------- --> */}
                <div id="login" className="dropdown">
                    <button type="button" className="btn text-primary text-center" data-bs-toggle="dropdown">
                        Login
                    </button>
                    <ul className="dropdown-menu dropdown-menu-center font14">
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-person-circle"></i>
                            <p className="drop-icon-text">My Profile</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-plus-lg"></i>
                            <p className="drop-icon-text">Flipkart Plus Zone</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-box-arrow-in-up"></i>
                            <p className="drop-icon-text">Orders</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-suit-heart-fill"></i>
                            <p className="drop-icon-text">Wishlist</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-hdd-stack-fill"></i>
                            <p className="drop-icon-text">Rewards</p>
                        </a></li>
                        <li><a className="dropdown-item" href="#"><i className="drop-icons bi bi-gift"></i>
                            <p className="drop-icon-text">Gift Cards</p>
                        </a></li>
                    </ul>
                </div>
            </header >
            /* <!-- ----------------------------------------------------| Header(TOP) FINISH | ------------------------------------------------ --> */
        )
    }
}

export default withRouter(Header);