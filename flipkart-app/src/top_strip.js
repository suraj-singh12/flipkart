import React from 'react';
import {Link} from 'react-router-dom';
import StripIcons from './strip_icons.json';
import './top_strip.css';

const Strip = () => {
    return (
        <div id="top-strip">
            <Link to={'/'}>
                <div id="top_offers" className="icons first-icon">
                    <img src={StripIcons['top-offers']} alt="top offers" />
                    <p>Top Offers</p>
                </div>
            </Link>
            <Link to ={'/'}>
                <div id="grocery" className="icons">
                    <img src={StripIcons['grocery']} alt="grocery" />
                    <p>Grocery</p>
                </div>
            </Link>
            <Link to ={'/'}>
                <div id="mobiles" className="icons">
                    <img src={StripIcons['mobile']} alt="mobiles" />
                    <p>Mobiles</p>
                </div>
            </Link>

            <Link to={'/'}>
                <div id="fashion" className="icons">
                    <img src={StripIcons['fashion']} alt="fashion" />
                    <p>Fashion</p>
                </div>
            </Link>

            <Link to={'/'}>
                <div id="electronics" className="icons">
                    <img src={StripIcons['electronics']} alt="electronics" />
                    <p>Electronics</p>
                </div>
            </Link>

            <Link to={'/'}>
                <div id="home" className="icons">
                    <img src={StripIcons['home']} alt="home" />
                    <p>Home</p>
                </div>
            </Link>

            <Link to={'/'}>
                <div id="appliances" className="icons">
                    <img src={StripIcons['appliances']} alt="appliances" />
                    <p>Appliances</p>
                </div>
            </Link>

            <Link to={'/'}>
                <div id="travel" className="icons">
                    <img src={StripIcons['travel']} alt="flights" />
                    <p>Travel</p>
                </div>
            </Link>

            <Link to={'/'}>
                <div id="beauty" className="icons">
                    <img src={StripIcons['toys']} alt="toys" />
                    <p>Beauty, Toys &amp; more</p>
                </div>
            </Link>
        </div >
    )
}

export default Strip;