import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../header';
import Footer from '../../Footer';

const cartUrl = 'https://crazy-dove-yoke.cyclic.app/cart/get/';
// https://crazy-dove-yoke.cyclic.app/cart/get/alpha1@alpha.com
const cartRemoveUrl = ' https://crazy-dove-yoke.cyclic.app/cart/delete/';
//  https://crazy-dove-yoke.cyclic.app/cart/delete/alpha14@alpha.com/keyboard/18
const placeOrderUrl = 'https://crazy-dove-yoke.cyclic.app/orders/add';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        console.log('>>> Cart: ', props);

        // save the location of current page(except login/register/placeOrder/viewOrder pages, we do this on all pages[home, listing, details]) as last visited page; will use it to when non-logged in user logs in; will redirect him to his previous page (before login)
        let last_page_address = props.match.url + props.location.search;
        sessionStorage.setItem('last_page', last_page_address);
        console.log('last visited page set to: ', sessionStorage.getItem('last_page'))

        this.state = {
            cartItems: {},
            dummyOrderItmCount: 1,   // instead of this, each item is allotted this count, and this one is a dummy, used for just re-rendering the page when count changes
            orderId: (Math.random() * 10000).toFixed(0)
        }
    }

    handleItemCount = (sign, item) => {
        console.log('item: ', item);
        console.log('button pressed')
        if (sign === '+') {
            item.orderItmCount++;
        } else if (item.orderItmCount > 1) {
            item.orderItmCount--;
        }
        console.log(item.orderItmCount);
        this.setState({ dummyOrderItmCount: item.orderItmCount });
    }

    getOrderItmCount = (item) => {
        return item.orderItmCount;
    }


    features = (item) => {
        let data = [];
        for (let i in item) {
            if (i.includes('more_data'))
                data.push(i);
        }

        if (data.length === 0) {
            return (
                <></>
            )
        }

        let finalMoreData = data.map((d) => {
            // console.log(d);
            return (
                <li className="more_data" key={Math.random() * 10000}>{item[`${d}`]}</li>
            )
        })

        return (
            <ul>
                {finalMoreData}
            </ul>
        )
    }

    removeItemFromCart = (item) => {
        console.log('removing item: ', item);

        axios.delete(cartRemoveUrl + item.email + '/' + item.item_type + '/' + item.item_id)
            .then((res) => {
                console.log('item removed: ', res);
            })
            .then(() => {
                // fetch the updated cart items
                let email = sessionStorage.getItem('userInfo').split(',')[1];
                axios.get(cartUrl + email)
                    .then((res) => {
                        this.setState({ cartItems: res.data });
                        return res.data;
                    })
                    .then((data) => {
                        console.log('cart items fetched: ', data)
                    })
            })
    }

    style = {
        removeFromCartBtn: {
            display: 'inline-block',
            textTransform: 'uppercase',
            boxShadow: 'none',
            outline: '0',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginRight: '25px',
            border: '0',
            marginLeft: '10px',
            background: 'transparent'
        }
    }


    placeOrder = (item, event) => {
        // event.preventDefault();
        console.log('placing order: ', item);
        let userData = sessionStorage.getItem('userInfo').split(',');

        let orderDetails = item;
        orderDetails.order_id = this.state.orderId;
        orderDetails.item_type = item.item_type.replace('_', ' ');
        orderDetails.amount = item.new_price;
        orderDetails.quantity = this.getOrderItmCount(item);
        orderDetails.total_amount = this.getOrderItmCount(item) * item.new_price;
        orderDetails.name = userData[0];
        orderDetails.email = userData[1];
        orderDetails.phone = userData[2];

        // let orderDetails = {
        //     order_id: this.state.orderId,
        //     item_id: item.item_id,
        //     item_type: item.item_type.replace('_', ' '),
        //     amount: item.new_price,
        //     quantity: this.getOrderItmCount(item),
        //     total_amount: this.getOrderItmCount(item) * item.new_price,

        //     name: userData[0],
        //     email: userData[1],
        //     phone: userData[2]
        // }
        console.log('orderDetails: ', orderDetails);

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

    renderCartItems = () => {
        if (!sessionStorage.getItem('ltk')) {
            return (
                <div style={{ textAlign: 'center', marginTop: '2%', marginBottom: '2%' }}>
                    <h1>Login first to See Cart Items !</h1>
                    <Link to={'/login'} className="btn btn-primary btn-lg">Login</Link>
                </div>
            )
        } else if (this.state.cartItems.length > 0) {
            let items = this.state.cartItems;
            let userData = sessionStorage.getItem('userInfo').split(',');

            return items.map((item) => {
                item.orderItmCount = item.orderItmCount ? item.orderItmCount : 1;     // item count for individual item in cart
                let itemDesc = item.description.length > 35 ? item.description.substring(0, 35) + '...' : item.description;
                return (
                    <div className="order-summary" key={item._id} style={{ margin: 'auto', display: 'block' }}>
                        <form action="https://proud-erin-trout.cyclic.app/paynow" method="POST">
                            {/* all input type="hidden" is the actual data that is passed to paynow api */}
                            {/* <input type="hidden" name="order_id" value={this.state.id} /> */}
                            <input type="hidden" name="id" value={this.state.orderId} />
                            <input type="hidden" name="name" value={userData[0] ? userData[0] : ''} />
                            <input type="hidden" name="email" value={userData[1] ? userData[1] : ''} />
                            <input type="hidden" name="phone" value={userData[2] ? userData[2] : ''} />
                            <input type="hidden" name="total_amount" value={item.new_price * this.getOrderItmCount(item)} />

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
                                    {/* <span className="checkout-offers">{item.offers}</span> */}
                                    {this.features(item)}
                                </div>
                            </div>
                            {/* <!-- item count --> */}
                            <div className="checkout-item-count">
                                <button type="button" className="count-minus" onClick={() => { this.handleItemCount('-', item) }}>-</button>
                                <span className="count">{this.getOrderItmCount(item)}</span>
                                <button type="button" className="count-plus" onClick={() => { this.handleItemCount('+', item) }}>+</button>
                                <button type="button" className="remove-from-cart-btn" style={this.style.removeFromCartBtn} onClick={() => { this.removeItemFromCart(item) }}>Remove</button>
                                <button type="submit" className="continue-btn" style={{ float: 'none' }} onClick={(event) => { this.placeOrder(item,event) }}>Place Order</button>
                            </div>
                        </form>
                    </div>
                )
            })
        }
    }


    render() {
        return (
            <>
                <Header />
                <div className="order-summary-heading" style={{ width: '69%', margin: 'auto', marginTop: '2%' }}><span>#</span>Your Cart Items</div>
                {this.renderCartItems()}
                <Footer />
            </>
        )
    }

    componentDidMount() {
        // fetch the cart items 

        if (!sessionStorage.getItem('ltk')) {
            console.log('not logged in');
            return;
        }

        let email = sessionStorage.getItem('userInfo').split(',')[1];
        console.log('email: ', email);

        axios.get(cartUrl + email)
            .then((res) => {
                this.setState({ cartItems: res.data });
                return res.data;
            })
            .then((data) => {
                console.log('cart items fetched: ', data)
            })
    }
}

export default Cart;