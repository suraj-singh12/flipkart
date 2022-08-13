import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../header';
import Footer from '../../Footer';

import './itemDetails.css';

const url = 'https://app2fkartapi.herokuapp.com/item/';
// 'https://app2fkartapi.herokuapp.com/item/clothes?itemId=12';
const wishlistUrl = 'https://app2fkartapi.herokuapp.com/wishlist/add';
const wishlistCheckUrl = 'https://app2fkartapi.herokuapp.com/wishlist/getItemById/';
// https://app2fkartapi.herokuapp.com/wishlist/getItemById/suraj@gmail.com/clothes/45
const addToCartUrl = 'https://app2fkartapi.herokuapp.com/cart/add'

class ItemDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            id: ''
        }
    }

    setRatingReviews = (r, type) => {
        if (r && !r.toLowerCase().includes(type))
            r = r + type;
        else if (r)
            r = r.toLowerCase();
        else if (type === 'rating')
            r = "Brand New";
        else
            r = 'Be the first Reviewer';
        return r;
    }

    features = (item) => {
        let data = [];
        for (let i in item) {
            if (i.includes('more_data'))
                data.push(i);
        }

        if (data.length === 0) {
            return (
                <ul>
                    <li>Nice to have</li>
                </ul>
            )
        }

        let finalMoreData = data.map((d) => {
            console.log(d);
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

    addToWishlist = () => {
        // add to favorites, 
        // this.props.search.pathname.split('/')[2] is the item type.
        // this.props.search.search.split('?')[1] is the item id.

        if (!sessionStorage.getItem('userInfo')) {
            alert('Login first to add to Wishlist !!');
            this.props.history.push('/login');
        } else {
            let itemState = {
                item_id: this.props.location.search.split('?')[1],
                item_type: this.props.location.pathname.split('/')[2],
                name: sessionStorage.getItem('userInfo').split(',')[0],
                email: sessionStorage.getItem('userInfo').split(',')[1],
            }

            let checkUrl = wishlistCheckUrl + `${itemState.email}/${itemState.item_type}/${itemState.item_id}`;
            axios.get(checkUrl)
                .then(res => {
                    if (res.data.length === 0) {
                        console.log('adding to wishlist');
                        console.log('itemType, itemId:', itemState.item_type, itemState.item_id)

                        fetch(wishlistUrl, {
                            method: 'POST',
                            headers: {
                                'accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(itemState)
                        })
                            .then((data) => {
                                console.log('data', data);
                            })
                    } else {
                        console.log('item already exists in wishlist'); 
                    }
                })




        }
    }

    addToCart = () => {
        if (!sessionStorage.getItem('userInfo')) {
            alert('Login first to add to Wishlist !!');
            this.props.history.push('/login');
        } else {
            let itemState = {
                item_id: this.props.location.search.split('?')[1],
                item_type: this.props.location.pathname.split('/')[2],
                name: sessionStorage.getItem('userInfo').split(',')[0],
                email: sessionStorage.getItem('userInfo').split(',')[1],
            }

            // if the item is added to cart already, it won't be added (api takes care of it internally)
            fetch(addToCartUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemState)
            })
            .then(() => {
                console.log('item add to cart (if not exists)')
            })

        }
    }

    buyNow = () => {
        let buyNow = {
            itemType: this.props.location.pathname.split('/')[2],
            itemId: this.props.location.search.split('?')[1]
        }
        sessionStorage.setItem('buyNow', JSON.stringify(buyNow));
        console.log('item saved, redirecting')
        this.props.history.push(`/checkout`);
    }
    // itemCardCss = {
    //     itemCard: {
    //         fontFamily:'Arial, Helvetica, sans-serif',
    //         width: '27%',
    //         maxHeight: '570px',
    //         margin: '2%',
    //         marginLeft: '3%',
    //         float: 'left',
    //         position: 'sticky !important',
    //         top: '0'
    //     },

    //     itemCardImgDiv: {
    //         margin: 'auto',
    //         height: '400px',
    //         // width: '80%',
    //         // width: 'auto',
    //         marginTop: '6%'
    //     },

    //     itemCardImage: {
    //         // width: 'auto',
    //         // height: 'inherit'
    //         maxHeight: '100%',
    //         maxWidth: '100%'
    //     }
    // }
    render() {
        // console.log('item_received: ', this.state.item);
        let item = this.state.item[0];
        if (!item || item.length === 0)
            return;

        sessionStorage.setItem('last_page', this.props.location.pathname + this.props.location.search);
        console.log('last page set');
        // let type1 = ['clothes', 'bags', 'gowns', 'jackets', 'jeans', 'lehngas', 'pants', 'powerbanks', 'sarees', 'shirts',  'suits', 'sweaters', 'fans', 'tracks', 'mobile_phones', 'refrigerators']
        // let type2 = ['washing_machines', 'telivision_tvs', 'monitors', 'laptops', 'dslr', 'camera', 'airconditioners_ac']
        // let upcoming = this.props.location.pathname.split('/');
        // upcoming = upcoming[upcoming.length -1];

        // let isThereType1 = false;
        // for(let itm of type1) {
        //     if(itm.includes(upcoming)) {
        //         console.log('contains');
        //         isThereType1 = true; 
        //         break;
        //     }
        // }

        // let isThereType2 = false;
        // for(let itm of type2) {
        //     if(itm.includes(upcoming)) {
        //         console.log('contains2');
        //         isThereType2 = true;
        //         break;
        //     }
        // }
        // if(!isThereType1 && isThereType2) {
        //     // here will set the css
        //     console.log('changing the css');
        //     let imageDiv = this.itemCardCss.itemCardImgDiv;
        //     imageDiv.height = 'auto';
        //     imageDiv.width = 'auto';

        //     let image = this.itemCardCss.itemCardImage;
        //     image.height = 'auto';
        //     image.width = 'auto';
        // }

        console.log('itemDetails Props: ', this.props);

        let rating = this.setRatingReviews(item.rating, 'rating');
        let reviews = this.setRatingReviews(item.reviews, 'reviews');
        let itemOffer = item.offer;
        if (itemOffer)
            itemOffer = '+' + itemOffer;

        return (
            <>
                <Header />
                <div className="item-main">
                    {/* <!-- main content here --> */}

                    {/* <!-- (left) item-card: is a custom class --> */}
                    <div className="card item-card">
                        <i className="bi bi-heart heart-icon" onClick={() => { this.addToWishlist() }}></i>
                        <div className="item-card-img-div">
                            <img src={item.image} alt={item.brand} />
                        </div>
                        <div className="card-body item-card-body">
                            <button className="btn btn-warning btn-lg item-card-btn1" onClick={() => { this.addToCart() }}><i style={{ color: 'white' }} className="bi bi-cart-fill"></i> Add To Cart</button>
                            <button className="btn btn-danger btn-lg item-card-btn2" onClick={() => {this.buyNow()}}><i className="bi bi-lightning-fill"></i> Buy Now</button>
                        </div>
                    </div>

                    {/* <!-- (right) content --> */}
                    <div className="item-content">
                        <div className="item-description">{item.description}</div>
                        <div className="rating">
                            <span className="item-span item-stars">{item.stars ? item.stars : item.hidden_stars} <i className="bi bi-star-fill"></i></span>
                            <span className="item-span item_details_ratings">{rating}</span>
                            <span className="item-span item_details_reviews">{reviews}</span>
                        </div>
                        <div className="price">
                            <span className="item-span item-new-price">₹{item.new_price}</span>
                            <span className="item-span item-old-price">₹{item.old_price}</span>
                            <span className="item-span item-discount">{item.discount}% off</span>
                            {/* additional offers */}
                            <div>
                                <span className="offer1">{itemOffer}</span>
                                <span className="offer1" style={{ marginBottom: '1%' }}>{item.offer2}</span>
                            </div>
                        </div>
                        <div className="others">
                            <span className="item-span">{item.color}</span>
                        </div>
                        <div className="item-offer">
                            <div className="offer1">Available offers</div>
                            <div className="offer1"><i className="bi tags-color bi-tag-fill"></i> <span className="offer-header">Bank Offer</span> 5% Cashback on Flipkart Axis Bank CardT&C</div>
                            <div className="offer1"><i className="bi tags-color bi-tag-fill"></i> <span className="offer-header">Bank Offer</span> Extra 10% off on Prepaid TransactionsT&C</div>
                            <div className="offer1"><i className="bi tags-color bi-tag-fill"></i> <span className="offer-header">Combo Offer</span> Buy 2 items save 3%;Buy 3-4 save 7%;Buy 5+ save 10%See all productsT&C</div>
                            <div className="offer1"><i className="bi tags-color bi-tag-fill"></i> <span className="offer-header">Partner Offer</span> Sign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100*Know More</div>
                        </div>

                        <div className="highlight-services">

                            <div style={{ float: 'left', marginTop: '2%', width: '70%' }} className="features">
                                <span style={{ fontSize: '1.2rem' }} className="item-span">Features: </span>
                                {this.features(item)}
                            </div>
                            <div className="services">
                                <span style={{ fontSize: '1.2rem' }} className="item-span">Highlights: </span>
                                <div><i className="bi bi-recycle"></i> 7 day replacement policy</div>
                                <div><i className="fa fa-rupee" style={{ color: 'blue' }}></i> Cash on delivery available</div>
                            </div>
                        </div>

                        <div className="summary">
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    componentDidMount() {
        console.log(this.props);

        let itemType = this.props.location.pathname.split('/')[2];
        let itemId = this.props.location.search.split('?')[1];
        console.log(itemType, itemId);

        axios.get(url + itemType + '?itemId=' + itemId)
            .then(res => {
                console.log(res.data);
                this.setState({
                    item: res.data,
                    id: itemId
                })
            }).catch(err => {
                console.log(err);
            })
    }
}

export default ItemDetails;
