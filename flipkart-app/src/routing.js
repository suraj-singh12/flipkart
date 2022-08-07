import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Listing from './component/listing/listing';
import Details from './component/details/itemDetails';
import Login from './component/login-signup/login';
import Signup from './component/login-signup/signup';


const Router = ({location}) => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            {/* using params in /listing (see :id) */}
            <Route path="/listing/:id" component={Listing} />
            <Route path="/details" component={Details} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
        </BrowserRouter>
    )
}

export default Router;