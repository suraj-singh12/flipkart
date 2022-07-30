import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Listing from './component/listing/listing';

const Router = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            {/* using params in /listing (see :id) */}
            <Route path="/listing/:id" component={Listing} />
        </BrowserRouter>
    )
}

export default Router;