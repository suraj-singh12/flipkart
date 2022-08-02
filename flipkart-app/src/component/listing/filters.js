import React from 'react';
import './filters.css';
const Filters = () => {
    return (
        <div className="filters">
            <p>Price</p>
            <div className="price-select">
                <select className="form-select lower" aria-label="lower-price-select">
                    <option value="min" defaultValue>Min</option>
                    <option value="200">&#8377;200</option>
                    <option value="500">&#8377;500</option>
                    <option value="1000">&#8377;1000</option>
                    <option value="5000">&#8377;500</option>
                    <option value="10000">&#8377;10000</option>
                </select>
                <span>to</span>
                <select className="form-select upper" aria-label="upper-price-select">
                    <option value="max">max</option>
                    <option value="500">&#8377;500</option>
                    <option value="1000">&#8377;1000</option>
                    <option value="5000">&#8377;500</option>
                    <option value="10000">&#8377;10000</option>
                    <option value="max" defaultValue>&#8377;10000+</option>
                </select>
            </div>
            <hr />
            <p>Customer Ratings</p>
            <div className="form-check">
                <label htmlFor="4star">4 <i className="bi bi-star-fill"></i> & above</label>
                <input type="checkbox" className="form-check-input" id="4star" value="4-star+" />
            </div>
            <div className="form-check">
                <label htmlFor="3star">3 <i className="bi bi-star-fill"></i> & above</label>
                <input type="checkbox" className="form-check-input" id="3star" value="4-star+" />
            </div>
            <div className="form-check">
                <label htmlFor="2star">2 <i className="bi bi-star-fill"></i> & above</label>
                <input type="checkbox" className="form-check-input" id="2star" value="4-star+" />
            </div>
            <div className="form-check">
                <label htmlFor="1star">1 <i className="bi bi-star-fill"></i> & above</label>
                <input type="checkbox" className="form-check-input" id="1star" value="4-star+" />
            </div>
            <hr />
            <p>Offers</p>
            <div className="form-check">
                <label htmlFor="buymore">Buy More, Save More</label>
                <input type="checkbox" className="form-check-input" id="buymore" />
            </div>
            <div className="form-check">
                <label htmlFor="nocostemi">No Cost EMI</label>
                <input type="checkbox" className="form-check-input" id="nocostemi" />
            </div>
            <div className="form-check">
                <label htmlFor="specialprice">Special Price</label>
                <input type="checkbox" className="form-check-input" id="specialprice" />
            </div>
            <hr />
            <p>Discount</p>
            <div className="form-check">
                <label htmlFor="50plus">50 &#37; or more</label>
                <input type="checkbox" className="form-check-input" id="50plus" />
            </div>
            <div className="form-check">
                <label htmlFor="40plus">40 &#37; or more</label>
                <input type="checkbox" className="form-check-input" id="40plus" />
            </div>
            <div className="form-check">
                <label htmlFor="30plus">30 &#37; or more</label>
                <input type="checkbox" className="form-check-input" id="30plus" />
            </div>
            <div className="form-check">
                <label htmlFor="20plus">20 &#37; or more</label>
                <input type="checkbox" className="form-check-input" id="20plus" />
            </div>
            <div className="form-check">
                <label htmlFor="10plus">10 &#37; or more</label>
                <input type="checkbox" className="form-check-input" id="10plus" />
            </div>
            <div className="form-check">
                <label htmlFor="10minus">10 &#37; and below</label>
                <input type="checkbox" className="form-check-input" id="10minus" />
            </div>
        </div>
    )
}

export default Filters;