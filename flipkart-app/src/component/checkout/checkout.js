import React, { Component } from 'react';
import './checkout.css';
import Header from '../../header';
import Footer from '../../Footer';
import axios from 'axios';

const url = "https://zany-dog-tank-top.cyclic.app/api/auth/login";
const userDataUrl = "https://zany-dog-tank-top.cyclic.app/api/auth/userInfo";
const addressChangeUrl = 'https://crazy-dove-yoke.cyclic.app/updateAddress/';
const itemUrl = 'https://crazy-dove-yoke.cyclic.app/item/';     // item fatching api
// https://crazy-dove-yoke.cyclic.app/updateAddress/suraj@gmail.com?address=new-address-added
const placeOrderUrl = 'https://crazy-dove-yoke.cyclic.app/orders/add';

class Checkout extends Component {

    constructor(props) {
        super(props);

        // save the location of current page(except login/register/placeOrder/viewOrder pages, we do this on all pages[home, listing, details]) as last visited page; will use it to when non-logged in user logs in; will redirect him to his previous page (before login)
        let last_page_address = props.match.url + props.location.search;
        sessionStorage.setItem('last_page', last_page_address);
        console.log('last visited page set to: ', sessionStorage.getItem('last_page'))

        this.state = {
            item: '',
            address: '',
            message: '',
            userData: {},
            orderItmCount: 1,
            orderId: (Math.random() * 10000).toFixed(0)
        }
    }

    handleChange = (event) => {
        // console.log('changing: ', [event.target.name]);
        this.setState({ [event.target.name]: event.target.value });
        // automatically gets changed as:-   name: event.target.value, email: event.target.value, so on & updates the correct state.
        // this is how we manage multiple input boxes in one go.
    }

    handleItemCount = (sign) => {
        if (sign === '+') {
            this.setState({ orderItmCount: this.state.orderItmCount + 1 })
        } else if (this.state.orderItmCount > 1) {
            this.setState({ orderItmCount: this.state.orderItmCount - 1 })
        }
    }

    PlaceOrder = () => {
        let item = this.state.item[0];
        console.log('item: ', item);

        let orderDetails = item;
        orderDetails.order_id = this.state.orderId;
        orderDetails.item_type = JSON.parse(sessionStorage.getItem('buyNow')).itemType;
        orderDetails.amount = item.new_price;
        orderDetails.quantity = this.state.orderItmCount;
        orderDetails.total_amount = this.state.orderItmCount * item.new_price;
        orderDetails.name = this.state.userData.name;
        orderDetails.email = this.state.userData.email;
        orderDetails.phone = this.state.userData.phone;


        // let orderDetails = {
        //     order_id: this.state.orderId,
        //     item_id: item.item_id,
        //     item_type: JSON.parse(sessionStorage.getItem('buyNow')).itemType,
        //     amount: item.new_price,
        //     quantity: this.state.orderItmCount,
        //     total_amount: this.state.orderItmCount * item.new_price,

        //     name: this.state.userData.name,
        //     email: this.state.userData.email,
        //     phone: this.state.userData.phone
        // }
        console.log(orderDetails);

        // place the order
        fetch(placeOrderUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
            // pushed the details of order by this user, into database.
        })
            .then((response) => {
                if (response.status === 200)
                    console.log('order placed')
            })

    }

    changeAddress = (event) => {
        // https://crazy-dove-yoke.cyclic.app/updateAddress/suraj@gmail.com?address=new-address-added
        event.preventDefault();

        console.log('in change address')
        // change the address of the user
        axios.put(addressChangeUrl + this.state.userData.email + '?address=' + this.state.address)
            .then((res) => {
                console.log(res.data);
            }).then(() => {
                // fetch the updated data now, so all required components will re-render accordingly.
                fetch(userDataUrl, {
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
            )
    }

    fetchItemDetails = (item) => {
        item = JSON.parse(item);

        let itemType = item.itemType;
        let itemId = item.itemId;
        console.log('printing in fetchItemDetails: ', itemType, itemId);

        axios.get(itemUrl + itemType + '?itemId=' + itemId)
            .then(res => {
                console.log(res.data);
                this.setState({
                    item: res.data,
                    id: itemId
                })
            }).catch(err => {
                console.log(err);
            })
    }


    loginNow = () => {
        console.log(this.state);
        fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((res) => res.json())
            .then((data) => {
                // if email is not registered, or password is incorrect, then set the error message to display.
                // console.log('data: ', data)
                if (data.auth === false) {
                    this.setState({ message: data.token });
                    alert('invalid credentials, please try again!');
                } else {
                    // user is a registered user, & password is correct then proceed, login him,
                    // and save the token we get from api, which allows accessing user info to us, 
                    // for a limited time period (set in the API code) after which token becomes invalid.

                    // save the token 
                    sessionStorage.setItem('ltk', data.token);
                    // ltk: login token

                    console.log('login success !');

                    // fetch userData
                    fetch(userDataUrl, {
                        method: 'GET',
                        headers: {
                            'x-access-token': sessionStorage.getItem('ltk')
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            this.setState({ userData: data })
                        })

                    // if (sessionStorage.getItem('last_page')) {
                    //     this.props.history.push(sessionStorage.getItem('last_page'));   // redirect user to his last visited page on website.
                    // } else {
                    //     this.props.history.push('/');
                    // }
                }
            })
    }

    conditionalLogin = () => {
        if (!sessionStorage.getItem('ltk')) {
            return (
                // {/* <!-- login component --> */ }
                < div className="checkout-login-signup" >

                    <div className="checkout-main">
                        <p className="checkout-login-heading"><span>1</span>Login Or Signup</p>
                        <div className="checkout-login-left">
                            <div className="login-email">
                                <input name="email" type="email" placeholder="Enter your email" onChange={this.handleChange} required />
                            </div>
                            <div className="login-password">
                                <input name="password" type="password" placeholder="Enter Password" onChange={this.handleChange} required />
                            </div>
                            <div className="checkout-privacy-policy">By continuing, you agree to Flipkart's Terms of Use and Privacy
                                Policy
                            </div>
                            <button className="continue-after-login" onClick={() => { this.loginNow(); }}>Continue</button>
                            {/* <!-- on pressing continue, another component will be loaded with email written and a button to change --> */}
                        </div>
                        <div className="checkout-login-right">
                            <ul>
                                <div className="checkout-right-heading">Advantages of Secure Login</div>
                                <li><i className="bi bi-truck" style={{ color: 'blue' }}></i> Easily Track Orders, Hassle free Returns
                                </li>
                                <li><i className="bi bi-bell-fill" style={{ color: 'blue' }}></i> Get relevant alerts and recommendations
                                </li>
                                <li><i className="bi bi-star-fill" style={{ color: 'blue' }}></i> Wishlist, Reviews, Ratings and more.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="checkout-extreme-right">
                        <img src="https://i.ibb.co/nLmPhkC/shield.png" alt="shield" />
                        <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                    </div>
                </div >
            )
        } else {
            console.log('already logged in');
            return (
                <div className="checkout-main">
                    <div className="login-done-left">
                        <p className="checkout-login-heading"><span>1</span>Login <i className="bi bi-check"></i></p>
                        <p className="checkout-login-phone">+919876543210</p>
                    </div>
                    <div className="change1-btn">
                        <button className="change1">Change</button>
                    </div>
                </div>
            )
        }
    }

    conditionalAddress = () => {
        if (!sessionStorage.getItem('ltk')) {
            console.log('not logged in, so no address')
            return (
                <div className="delivery-address-done">
                    <div className="delivery-address-done-left">
                        <p className="checkout-address-heading"><span>2</span>Delivery Address </p>
                    </div>
                </div>
            )
        } else {
            if (this.state.userData.address === 'NA') {
                console.log('logged in but no address');
                return (
                    <div className="delivery-main">
                        <div className="delivery-address-heading"><span>2</span>Delivery Address</div>
                        <div className="current-address">
                            <form onSubmit={(event) => { this.changeAddress(event) }}>
                                <div className="address-NA">
                                    <input name="address" type="address" placeholder="Enter your Address" onChange={this.handleChange} required />
                                </div>
                                <div className="change1-btn">
                                    <button className="change1" type="submit">Add</button>
                                </div>
                            </form>
                        </div>
                    </div >
                )
            }
            else if (this.state.userData.address && this.state.userData.address.length > 5) {
                return (
                    // {/* <!-- delivery address component --> */ }
                    < div className="delivery-address" >

                        <div className="delivery-main">
                            <div className="delivery-address-heading"><span>2</span>Delivery Address</div>
                            <div className="current-address">
                                <form onSubmit={(event) => { this.changeAddress(event) }}>
                                    <div className="address-head"><span>{this.state.userData.name}</span> <span className="address-type">Work</span>
                                        <span>{this.state.userData.phone ? this.state.userData.phone : 9876543210}</span>
                                    </div>
                                    <button className="edit-address" type="submit" onClick={() => { this.setState({ address: 'NA' }) }}>Edit</button>
                                    <div className="address">{this.state.userData.address}</div>
                                    <button className="deliver-here">Deliver Here</button>
                                </form>
                            </div>
                        </div>
                        <div className="delivery-extreme-right"></div>
                    </div >
                )
            }
        }
    }

    conditionalContinueButton = () => {
        if (this.state.userData.address !== 'NA') {
            return (
                <button className="continue-btn" type="submit" onClick={() => { this.PlaceOrder() }}>Continue</button>
            )
        } else {
            return (
                <button className="continue-btn" type="submit" style={{ backgroundColor: 'grey' }} disabled>Continue</button>
            )
        }
    }
    itemSummary = () => {
        if (!sessionStorage.getItem('ltk')) {
            console.log('not logged in, so no summary')
            return (
                <div className="item-summary-nologin">
                    <div className="item-summary-nologin-left">
                        <p className="item-summary-nologin-heading"><span>3</span>Item Summary </p>
                    </div>
                </div>
            )
        } else {
            let buyNow = sessionStorage.getItem('buyNow');
            console.log(buyNow);

            if (this.state.item === '') {
                this.fetchItemDetails(buyNow);
                return;
            }
            else {
                let item = this.state.item[0];
                let itemDesc = item.description.length > 35 ? item.description.substring(0, 35) + '...' : item.description;
                // console.log('item before return: ', item);
                // console.log('img: ', item.image);
                return (
                    <form action="https://proud-erin-trout.cyclic.app/paynow" method="POST">
                        {/* all input type="hidden" is the actual data that is passed to paynow api */}
                        {/* <input type="hidden" name="order_id" value={this.state.id} /> */}
                        <input type="hidden" name="id" value={this.state.orderId} />
                        <input type="hidden" name="name" value={this.state.userData.name ? this.state.userData.name : ''} />
                        <input type="hidden" name="email" value={this.state.userData.email ? this.state.userData.email : ''} />
                        <input type="hidden" name="phone" value={this.state.userData.phone ? this.state.userData.phone : ''} />
                        <input type="hidden" name="total_amount" value={item.new_price * this.state.orderItmCount} />

                        <div className="order-summary">
                            <div className="order-summary-heading"><span>3</span> Order Summary</div>
                            {/* <!-- item --> */}
                            <div className="checkout-item">
                                <div className="img-icon" style={{ height: '80px', width: 'auto' }}>
                                    <img src={item.image} alt="item name" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                </div>
                                <div className="checkout-item-details order-details">
                                    <div className="checkout-item-description">{itemDesc}</div>
                                    <div className="checkout-item-color">{item.color}</div>
                                    <span className="checkout-old-price">₹{item.old_price}</span>
                                    <span className="checkout-new-price">₹{item.new_price}</span>
                                    <span className="checkout-discount">{item.discount} &#x00025; off</span>
                                    <span className="checkout-offers">{item.offers}</span>
                                </div>
                            </div>
                            {/* <!-- item count --> */}
                            <div className="checkout-item-count">
                                <button type="button" className="count-minus" onClick={() => { this.handleItemCount('-') }}>-</button>
                                <span className="count">{this.state.orderItmCount}</span>
                                <button type="button" className="count-plus" onClick={() => { this.handleItemCount('+') }}>+</button>
                                {/* <button className="remove-checkout-item">Remove</button> */}
                                {this.conditionalContinueButton()}
                            </div>
                        </div>
                    </form>
                )
            }
        }
    }
    render() {
        return (
            <>
                <Header />
                <div style={{ marginTop: '0' }} className="checkout-container">
                    <div className="checkout-page">
                        {this.conditionalLogin()}
                        {this.conditionalAddress()}
                        {this.itemSummary()}
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    componentDidMount() {
        // get the user information using the login token (from sessionStorage)
        // it was saved when user logged in (in login.js)
        if (sessionStorage.getItem('ltk')) {
            // fetch userData
            fetch(userDataUrl, {
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
}

export default Checkout;