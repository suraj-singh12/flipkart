import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const cartUrl = 'https://app2fkartapi.herokuapp.com/cart/get/';
// https://app2fkartapi.herokuapp.com/cart/get/alpha1@alpha.com
class Cart extends React.Component {
    constructor(props) {
        super(props);
        console.log('>>> Cart: ', props);

        this.state = {
            cartItems: {}
        }
    }

    renderCartItems = () => {
        if (!sessionStorage.getItem('ltk')) {
            return (
                <>
                    <h1>Login first to See Cart Items !</h1>
                    <Link to={'/login'}>Login</Link>
                </>
            )
        }
    }
    render() {
        return (
            <>
                {this.renderCartItems()}
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