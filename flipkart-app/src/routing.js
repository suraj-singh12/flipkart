import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Listing from './component/listing/listing';
import Details from './component/details/itemDetails';

const Router = ({location}) => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            {/* using params in /listing (see :id) */}
            <Route path="/listing/:id" component={Listing} />
            <Route path="/details" component={Details} />
        </BrowserRouter>
    )
}

export default Router;