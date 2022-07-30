import axios from 'axios';
import React from 'react';
import { withRouter, Link} from 'react-router-dom';
import StripIcons from './strip_icons.json';
import './top_strip.css';
import Listing from './component/listing/listing';

const Strip = (props) => {
    return (
        <div id="top-strip">
            <Link to={`/listing/top_offers`}>
            <div id="top_offers" className="icons first-icon">
                <img src={StripIcons['top-offers']} alt="top offers" />
                <p>Top Offers</p>
            </div>
            </Link>

            <div id="grocery" className="icons">
                <img src={StripIcons['grocery']} alt="grocery" />
                <p>Grocery</p>
            </div>
            <div id="mobiles" className="icons">
                <img src={StripIcons['mobile']} alt="mobiles" />
                <p>Mobiles</p>
            </div>

            <div id="fashion" className="icons">
                <img src={StripIcons['fashion']} alt="fashion" />
                <p>Fashion</p>
            </div>

            <div id="electronics" className="icons">
                <img src={StripIcons['electronics']} alt="electronics" />
                <p>Electronics</p>
            </div>

            <div id="home" className="icons">
                <img src={StripIcons['home']} alt="home" />
                <p>Home</p>
            </div>

            <div id="appliances" className="icons">
                <img src={StripIcons['appliances']} alt="appliances" />
                <p>Appliances</p>
            </div>

            <div id="travel" className="icons">
                <img src={StripIcons['travel']} alt="flights" />
                <p>Travel</p>
            </div>

            <div id="beauty" className="icons">
                <img src={StripIcons['toys']} alt="toys" />
                <p>Beauty, Toys &amp; more</p>
            </div>
        </div >
    )
}

export default withRouter(Strip);