import React from 'react';
import { Link } from 'react-router-dom';

const OrderDisplay = (props) => {
    console.log('props of orderDisplay:', props);

    const features = (item) => {
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

    const renderOrdersItems = ({orderData}) => {
        if (!sessionStorage.getItem('ltk')) {
            return (
                <div style={{ textAlign: 'center', marginTop: '2%', marginBottom: '2%' }}>
                    <h1>Login first to See Orders Items !</h1>
                    <Link to={'/login'} className="btn btn-primary btn-lg">Login</Link>
                </div>
            )
        } else if (orderData && orderData.length > 0) {
            return orderData.map((item) => {
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
                                    {features(item)}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <>
            <div className="order-summary-heading" style={{ width: '69%', margin: 'auto', marginTop: '2%' }}><span>#</span>Your Orders Items</div>
            {renderOrdersItems()}
        </>
    )
}

export default OrderDisplay;
