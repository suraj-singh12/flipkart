import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../header';
import Footer from '../../Footer';

const wishlistUrl = 'https://crazy-dove-yoke.cyclic.app/wishlist/get/';
// https://crazy-dove-yoke.cyclic.app/wishlist/get/alpha1@alpha.com
const wishlistRemoveUrl = ' https://crazy-dove-yoke.cyclic.app/wishlist/delete/';

class Wishlist extends React.Component {
    constructor(props) {
        super(props);
        console.log('>>> Wishlist: ', props);

        // save the location of current page(except login/register/placeOrder/viewOrder pages, we do this on all pages[home, listing, details]) as last visited page; will use it to when non-logged in user logs in; will redirect him to his previous page (before login)
        let last_page_address = props.match.url + props.location.search;
        sessionStorage.setItem('last_page', last_page_address);
        console.log('last visited page set to: ', sessionStorage.getItem('last_page'))

        this.state = {
            wishlistItems: {},
            orderId: (Math.random() * 10000).toFixed(0)
        }
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

    removeItemFromWishlist = (item) => {
        console.log('removing item: ', item);

        axios.delete(wishlistRemoveUrl + item.email + '/' + item.item_type + '/' + item.item_id)
            .then((res) => {
                console.log('item removed: ', res);
            })
            .then(() => {
                // fetch the updated wishlist items
                let email = sessionStorage.getItem('userInfo').split(',')[1];
                axios.get(wishlistUrl + email)
                    .then((res) => {
                        this.setState({ wishlistItems: res.data });
                        return res.data;
                    })
                    .then((data) => {
                        console.log('wishlist items fetched: ', data)
                    })
            })
    }

    style = {
        removeFromWishlistBtn: {
            float: 'right',
            border: 'none',
        }
    }


    renderWishlistItems = () => {
        if (!sessionStorage.getItem('ltk')) {
            return (
                <div style={{ textAlign: 'center', marginTop: '2%', marginBottom: '2%' }}>
                    <h1>Login first to See Wishlist Items !</h1>
                    <Link to={'/login'} className="btn btn-primary btn-lg">Login</Link>
                </div>
            )
        } else if (this.state.wishlistItems.length > 0) {
            let items = this.state.wishlistItems;

            return items.map((item) => {
                let itemDesc = item.description.length > 35 ? item.description.substring(0, 35) + '...' : item.description;
                return (
                    <div className="order-summary" style={{ margin: 'auto', display: 'block', height: 'auto', paddingBottom:'3%' }} key={item._id}>
                        <Link to={`/details/${item.item_type}?${item.item_id}`}>
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
                                    {this.features(item)}
                                </div>
                            </div>
                        </Link>
                        <button style={this.style.removeFromWishlistBtn} type="button" onClick={() => { this.removeItemFromWishlist(item) }}><i class="bi bi-trash"></i></button>
                    </div>
                )
            })
        }
    }


    render() {
        return (
            <>
                <Header />
                <div className="order-summary-heading" style={{ width: '69%', margin: 'auto', marginTop: '2%' }}><span>#</span>Your Wishlist Items</div>
                {this.renderWishlistItems()}
                <Footer />
            </>
        )
    }

    componentDidMount() {
        // fetch the wishlist items 

        if (!sessionStorage.getItem('ltk')) {
            console.log('not logged in');
            return;
        }

        let email = sessionStorage.getItem('userInfo').split(',')[1];
        console.log('email: ', email);

        axios.get(wishlistUrl + email)
            .then((res) => {
                this.setState({ wishlistItems: res.data });
                return res.data;
            })
            .then((data) => {
                console.log('wishlist items fetched: ', data)
            })
    }
}

export default Wishlist;