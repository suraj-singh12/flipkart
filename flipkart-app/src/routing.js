import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Listing from './component/listing/listing';
import Details from './component/details/itemDetails';
import Login from './component/login-signup/login';
import Signup from './component/login-signup/signup';
import Checkout from './component/checkout/checkout';
import ViewBooking from './component/viewOrder/viewOrder';
import Cart from './component/cart/cart';


const Router = ({location}) => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            {/* using params in /listing (see :id) */}
            <Route path="/listing/:id" component={Listing} />
            <Route path="/details" component={Details} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/checkout" component={Checkout} />
            <Route path='/viewBooking' component={ViewBooking} />

            <Route path='/cart' component={Cart} />
        </BrowserRouter>
    )
}

export default Router;