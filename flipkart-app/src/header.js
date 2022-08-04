import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import Icons from './icons.json';
import Listing from './component/listing/listing';


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
    loadDetailsPage = (event) => {
        event.preventDefault();
        // console.log(event);
        // console.log(event.target);
        console.log(event.target.searchbar.value);

        let items = '';
        // list all items that api has
        axios.get('https://app2fkartapi.herokuapp.com/list-apis')
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
                        if (items[i].includes(event.target.searchbar.value)) {
                            isPresent = true;
                            this.props.history.push('/listing/' + items[i]);
                        }
                    }
                }
                if(!isPresent) {
                    this.props.history.push('/listing/' + event.target.searchbar.value);
                }
            })
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

                <div className="login-signup">
                    <div className="login-dropdown dropdown">
                        <button className="btn login-button" data-bs-toggle="dropdown">Login</button>
                        <ul className="dropdown-menu dropdown-menu-center">
                            <li><Link to={'/'} className="dropdown-item"><i className="drop-icons bi bi-person-circle"></i>
                                <p className="drop-icon-text">My Profile</p>
                            </Link></li>
                            <li><Link to={'/'} className="dropdown-item"><i className="drop-icons bi bi-plus-lg"></i>
                                <p className="drop-icon-text">Flipkart Plus Zone</p>
                            </Link></li>
                            <li><Link to={'/'} className="dropdown-item"><i className="drop-icons bi bi-box-arrow-in-up"></i>
                                <p className="drop-icon-text">Orders</p>
                            </Link></li>
                            <li><Link to={'/'} className="dropdown-item" href="#"><i className="drop-icons bi bi-suit-heart-fill"></i>
                                <p className="drop-icon-text">Wishlist</p>
                            </Link></li>
                            <li><Link to={'/'} className="dropdown-item" href="#"><i className="drop-icons bi bi-hdd-stack-fill"></i>
                                <p className="drop-icon-text">Rewards</p>
                            </Link></li>
                        </ul>
                    </div>
                    <button className="btn signup-button">Sign-up</button>
                    <button className="btn cart"><i className="bi bi-cart-fill"></i>Cart</button>
                </div>
            </header>
        )
    }
}

export default withRouter(Header);