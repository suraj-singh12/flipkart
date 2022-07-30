import React from 'react';
import Filters from './filters';
import axios from 'axios';
import Header from '../../header';
import { Link } from 'react-router-dom';
import './listing.css';

const urlTopItems = 'https://app2fkartapi.herokuapp.com/filter/popularity/all_items';

class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    shuffle = (arr) => {
        let tmp;
        for (let i = arr.length - 1; i > 0; i--) {
            // Generate random number
            let j = Math.floor(Math.random() * (i + 1));

            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }

        return arr;
    }


    getContent = () => {
        if (!this.state.items) return;

        let itemDesc = '';
        console.log('in getContent')

        return this.state.items.map((item) => {
            itemDesc = item.description.substr(0, 18) + '...';
            return (
                <div className="card custom-card" key={item._id}>
                    <div className="listing-card-image">
                        <img src={item.image} alt={item.brand} className="card-img-top" />
                    </div>
                    <Link className="custom-card-anchor" to={'/'}>
                        <div className="card-body">
                            <div className="card-title description">{itemDesc}</div>
                            <div className="card-text">
                                <div className="brand">{item.brand}</div>
                                <div className="color">{item.color}</div>
                                <span className="rating">
                                    <button className="btn btn-success btn-sm"><span className="stars">{item.stars}</span> <i className="bi bi-star-fill stars-star"></i></button>
                                    <span className="ratings">{item.ratings}</span>
                                    <span className="reviews">{item.reviews}</span>
                                    <span className="badge rounded-pill bg-primary">FAssured</span>
                                </span>
                                <div className="price">
                                    <span className="new_price">&#8377;{item.new_price} </span>
                                    <span className="old_price">&#8377;{item.old_price}</span>
                                    <span className="discount"> {item.discount}% off</span>
                                </div>

                                <div className="delivery_type">{item.delivery_type}</div>
                                <div className="offer">{item.offer} {item.offer2} {item.offer3} {item.offer4} {item.offer5} {item.offer6} {item.offer7}</div>
                            </div>
                        </div>
                    </Link>

                </div>
            )
        })
    }


    render() {
        console.log('in listing')
        return (
            <>
                <Header />
                <div className="main">
                    <Filters />
                    <div className="content">
                        <div className="results-strip">
                            <p>Showing 1 - 40 of 1,15,371 results for "Top Offers"</p>
                            <div className="strip-of-sort-by">
                                <button className="btn btn-sm" >Sort By</button>
                                <button className="btn btn-sm">Relevance</button>
                                <button className="popularity btn btn-sm">Popularity</button>
                                <button className="btn btn-sm">Price -- Low to High</button>
                                <button className="btn btn-sm">Price -- High to Low</button>
                            </div>
                        </div>
                        <div className="d-inline-flex mt-0 flex-wrap flex-box">
                            {this.getContent()}
                        </div>
                    </div >
                </div >
            </>
        )
    }

    componentDidMount() {
        console.log('listing >>>>', this.props);

        if (this.props.match.params.id === 'top_offers') {
            axios.get(urlTopItems)
                .then(res => {
                    console.log('res', res.data);
                    this.shuffle(res.data);
                    this.setState({
                        items: res.data
                    })
                })
                .catch(err => {
                    console.log('err', err);
                })
        }
    }
}

export default Listing;