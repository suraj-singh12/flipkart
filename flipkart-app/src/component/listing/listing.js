import React from 'react';
// import Filters from './filters';
import './filters.css';
import axios from 'axios';
import Header from '../../header';
import { Link } from 'react-router-dom';
import './listing.css';
import Footer from '../../Footer';

const url = 'https://crazy-dove-yoke.cyclic.app/item/';     // item fetching api
const popularityUrl = 'https://crazy-dove-yoke.cyclic.app/filter/popularity/';
const priceUrl = 'https://crazy-dove-yoke.cyclic.app/filter/price/';
// https://crazy-dove-yoke.cyclic.app/filter/price/bags?sort=-1
const ratingUrl = 'https://crazy-dove-yoke.cyclic.app/filter/rating/';
// https://crazy-dove-yoke.cyclic.app/filter/rating/pillows/3
const offerUrl = 'https://crazy-dove-yoke.cyclic.app/filter/offers/';
// https://crazy-dove-yoke.cyclic.app/filter/offers/mouses
const discountUrl = 'https://crazy-dove-yoke.cyclic.app/filter/discount/';
// https://crazy-dove-yoke.cyclic.app/filter/discount/powerbanks/50

class Listing extends React.Component {

    constructor(props) {
        super(props);

        // save the location of current page(except login/register/placeOrder/viewOrder pages, we do this on all pages[home, listing, details]) as last visited page; will use it to when non-logged in user logs in; will redirect him to his previous page (before login)
        let last_page_address = props.match.url + props.location.search;
        sessionStorage.setItem('last_page', last_page_address);
        console.log('last visited page set to: ', sessionStorage.getItem('last_page'))

        this.state = {
            items: '',
            currentPage: 1,
            todosPerPage: 20,
            idReceived: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.filterByPrice = this.filterByPrice.bind(this);
    }
    // change page numbers on clicking
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        })
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

    sortByPopularity = () => {
        let itemName = this.props.match.params.id;
        axios.get(popularityUrl + itemName)
            .then(res => {
                this.shuffle(res.data);
                this.setState({
                    items: res.data,
                    currentPage: 1
                })
            }).catch(err => {
                console.log('err', err);
            })
    }

    sortByPrice = (sortOrder) => {
        console.log('in sortyByPrice')
        let itemName = this.props.match.params.id;
        axios.get(priceUrl + itemName + '?sort=' + sortOrder)
            .then(res => {
                this.setState({
                    items: res.data,
                    currentPage: 1
                })
            }).catch(err => {
                console.log('err', err);
            })
    }

    filterByPrice = (event) => {
        // console.log('inside filterByPrice', event.target);
        console.log(event);
        console.log(event.target);

        let lcost = '', hcost = '';
        if (event.target.id === 'lower-price') {
            lcost = Number(event.target.value);
            sessionStorage.setItem('lcost', lcost);
            if (sessionStorage.getItem('hcost'))
                hcost = Number(sessionStorage.getItem('hcost'));
        }
        else {
            hcost = Number(event.target.value);
            sessionStorage.setItem('hcost', hcost);
            if (sessionStorage.getItem('lcost'))
                lcost = Number(sessionStorage.getItem('lcost'))
        }
        if (lcost && hcost && lcost > hcost) return;
        console.log(lcost, hcost);

        // save in session storage, lcost / hcost once you get them
        let itemName = this.props.match.params.id;
        console.log('itemName', itemName);

        let url = priceUrl + itemName + '?lcost=' + lcost + '&hcost=' + hcost;
        console.log('url: ', url);

        axios.get(url)
            .then(res => {
                this.setState({
                    items: res.data,
                    currentPage: 1
                })
            }).catch(err => {
                console.log('err', err);
            })
    }

    filterByStars = (event) => {
        console.log('filterByStars', event.target);

        if (event.target.checked === true) {
            axios.get(ratingUrl + this.props.match.params.id + '/' + event.target.value)
                .then((res) => {
                    this.setState({
                        items: res.data,
                        currentPage: 1
                    })
                }).catch(err => {
                    console.log('err', err);
                })
        }
    }

    filterByOffer = (event) => {
        console.log('filterByOffer', event.target);
        console.log('isChecked?', event.target.checked);

        if (event.target.checked === true) {
            axios.get(offerUrl + this.props.match.params.id)
                .then((res) => {
                    this.setState({
                        items: res.data,
                        currentPage: 1
                    })
                }).catch(err => {
                    console.log('err', err);
                })
        }
    }

    filterByDiscount = (event) => {
        console.log('filterByDiscount', event.target);

        if (event.target.checked === true) {
            axios.get(discountUrl + this.props.match.params.id + '/' + event.target.value)
                .then((res) => {
                    this.setState({
                        items: res.data,
                        currentPage: 1
                    })
                }).catch(err => {
                    console.log('err', err);
                })
        }
    }

    getFilters = () => {
        return (
            <div className="filters">
                <p>Price</p>
                <div className="price-select">
                    <select className="form-select lower" id="lower-price" aria-label="lower-price-select" onChange={(event) => { this.filterByPrice(event) }}>
                        <option value="min" defaultValue>Min</option>
                        <option value="200">&#8377;200</option>
                        <option value="500">&#8377;500</option>
                        <option value="1000">&#8377;1000</option>
                        <option value="5000">&#8377;500</option>
                        <option value="10000">&#8377;10000</option>
                    </select>
                    <span>to</span>
                    <select className="form-select upper" aria-label="upper-price-select" onChange={(event) => { this.filterByPrice(event) }}>
                        <option value="max">Max</option>
                        <option value="500">&#8377;500</option>
                        <option value="1000">&#8377;1000</option>
                        <option value="5000">&#8377;5000</option>
                        <option value="10000">&#8377;10000</option>
                        <option value="50000" defaultValue>&#8377;10000+</option>
                    </select>
                </div>
                <hr />
                <p>Customer Ratings</p>
                <div className="form-check">
                    <label htmlFor="4star">4 <i className="bi bi-star-fill"></i> & above</label>
                    <input type="checkbox" className="form-check-input" id="4star" value="4" onClick={(event) => { this.filterByStars(event) }} />
                </div>
                <div className="form-check">
                    <label htmlFor="3star">3 <i className="bi bi-star-fill"></i> & above</label>
                    <input type="checkbox" className="form-check-input" id="3star" value="3" onClick={(event) => { this.filterByStars(event) }} />
                </div>
                <div className="form-check">
                    <label htmlFor="2star">2 <i className="bi bi-star-fill"></i> & above</label>
                    <input type="checkbox" className="form-check-input" id="2star" value="2" onClick={(event) => { this.filterByStars(event) }} />
                </div>
                <hr />
                <p>Offers</p>
                <div className="form-check">
                    <label htmlFor="specialprice">Special Price</label>
                    <input type="checkbox" className="form-check-input" id="specialprice" onClick={(event) => { this.filterByOffer(event) }} />
                </div>
                <hr />
                <p>Discount</p>
                <div className="form-check">
                    <label htmlFor="50plus">50 &#37; or more</label>
                    <input type="checkbox" className="form-check-input" id="50plus" value="50" onClick={(event) => { this.filterByDiscount(event) }} />
                </div>
                <div className="form-check">
                    <label htmlFor="40plus">40 &#37; or more</label>
                    <input type="checkbox" className="form-check-input" id="40plus" value="40" onClick={(event) => { this.filterByDiscount(event) }} />
                </div>
                <div className="form-check">
                    <label htmlFor="30plus">30 &#37; or more</label>
                    <input type="checkbox" className="form-check-input" id="30plus" value="30" onClick={(event) => { this.filterByDiscount(event) }} />
                </div>
                <div className="form-check">
                    <label htmlFor="20plus">20 &#37; or more</label>
                    <input type="checkbox" className="form-check-input" id="20plus" value="20" onClick={(event) => { this.filterByDiscount(event) }} />
                </div>
                <div className="form-check">
                    <label htmlFor="10plus">10 &#37; or more</label>
                    <input type="checkbox" className="form-check-input" id="10plus" value="10" onClick={(event) => { this.filterByDiscount(event) }} />
                </div>
            </div>
        )
    }
    getContent = (currentData) => {
        if (!currentData) {
            console.log('inside this')
            console.log('currentData', currentData)
            return (
                <div className="loader-img">
                    <img src={require("./images/loader.gif")} style={{ height: 'inherit', width: 'auto' }} alt="loader" />
                    <h2>Loading...</h2>
                </div>
            )
        } else if (currentData.length === 0) {
            console.log('NO data for this filter');
            return (
                <h1 style={{ margin: '15%', fontStyle: 'italic' }}>No Data found for this filter.</h1>
            )
        }
        else {
            let itemDesc = '';
            console.log('in getContent')

            let item = this.state.items;
            let reviews;
            let currentItemIndex = (this.state.todosPerPage) * this.state.currentPage - this.state.todosPerPage;

            return currentData.map((todo, index) => {
                // itemDesc = item[currentItemIndex + index].description.substr(0, 18) + '...';
                itemDesc = item[currentItemIndex + index].description;
                reviews = item[currentItemIndex + index].reviews ? item[currentItemIndex + index].reviews : '500';
                if (!reviews.toLowerCase().includes('reviews')) {
                    reviews = reviews + ' Reviews';
                }
                return (
                    <div className="card custom-card" key={item[currentItemIndex + index]._id}>
                        <div className="listing-card-image">
                            <img src={item[currentItemIndex + index].image} alt={item[currentItemIndex + index].brand} className="card-img-top" />
                        </div>
                        <Link className="custom-card-anchor" to={`/details/${this.props.match.params.id}?${item[currentItemIndex + index].item_id}`}>
                            <div className="card-body">
                                <div className="card-title description">{itemDesc}</div>
                                <div className="card-text">
                                    <div className="brand">{item[currentItemIndex + index].brand}</div>
                                    <div className="color">{item[currentItemIndex + index].color}</div>
                                    <span className="rating">
                                        <button className="stars_btn"><span className="stars">{item[currentItemIndex + index].stars ? item[currentItemIndex + index].stars : item[currentItemIndex + index].hidden_stars}</span> <i className="bi bi-star-fill stars-star"></i></button>
                                        {/* <span className="ratings">{item[currentItemIndex + index].ratings}</span> */}
                                        <span className="reviews">{reviews}</span>
                                        <span className="badge rounded-pill bg-primary">FAssured</span>
                                    </span>
                                    <div className="price">
                                        <span className="new_price">&#8377;{item[currentItemIndex + index].new_price} </span>
                                        <span className="old_price">&#8377;{item[currentItemIndex + index].old_price ? item[currentItemIndex + index].old_price : item[currentItemIndex + index].new_price + (item[currentItemIndex + index].new_price * 0.4)}</span>
                                        <span className="discount"> {item[currentItemIndex + index].discount}% off</span>
                                    </div>

                                    <div className="delivery_type">{item[currentItemIndex + index].delivery_type}</div>
                                    <div className="offer">{item[currentItemIndex + index].offer} {item[currentItemIndex + index].offer2} {item[currentItemIndex + index].offer3} {item[currentItemIndex + index].offer4} {item[currentItemIndex + index].offer5} {item[currentItemIndex + index].offer6} {item[currentItemIndex + index].offer7}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    }

    updateAgain = () => {
        console.log('updateAgain')
        let itemName = this.props.match.params.id;

        axios.get(url + itemName)
            .then(res => {
                console.log('res', res.data);
                this.shuffle(res.data);
                this.setState({
                    items: res.data
                })
            }).catch(err => {
                console.log('err', err);
            }).finally(() => {
                console.log('finally');
            }
            )
    }

    render() {
        if(sessionStorage.getItem('prevItemId') && this.props.match.params.id !== sessionStorage.getItem('prevItemId')){ 
            sessionStorage.setItem('prevItemId', this.props.match.params.id);
            this.updateAgain();
        } else {
            sessionStorage.setItem('prevItemId', this.props.match.params.id);
        }
        const { items, currentPage, todosPerPage } = this.state;
        console.log(this.state);

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        let pages = pageNumbers.slice(0, (pageNumbers.length < 5) ? pageNumbers.length : 7);

        const renderPageNumbers = pages.map(number => {
            return (
                <ul style={{ listStyleType: 'none' }} key={number}>
                    <li
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number}
                    </li >
                </ul>
            )
        })

        const getItemName = (this.props.match.params.id && this.props.match.params.id.includes('_') === true) ? this.props.match.params.id.split('_')[0] + this.props.match.params.id.split('_')[1] : this.props.match.params.id;
        console.log('in listing')
        return (
            <>
                <Header />
                <div className="main">
                    {this.getFilters()}
                    <div className="content">
                        <div className="results-strip">
                            <p>Showing {(this.state.currentPage - 1) * this.state.todosPerPage} - {this.state.currentPage * this.state.todosPerPage} of {this.state.items.length} results for "{getItemName.toUpperCase()}"</p>
                            <div className="strip-of-sort-by">
                                <button className="btn btn-sm" >Sort By</button>
                                <button className="btn btn-sm" onClick={() => { this.setState({ items: this.shuffle(this.state.items) }) }}>Relevance</button>
                                <button className="popularity btn btn-sm" onClick={() => { this.sortByPopularity() }}>Popularity</button>
                                <button className="btn btn-sm" onClick={() => { this.sortByPrice(1) }}>Price -- Low to High</button>
                                <button className="btn btn-sm" onClick={() => { this.sortByPrice(-1) }}>Price -- High to Low</button>
                            </div>
                        </div>
                        <div className="d-inline-flex mt-0 flex-wrap flex-box" style={{ marginBottom: '1rem' }}>
                            {this.getContent(currentTodos)}
                        </div>
                        <div className="d-inline-flex mt-0 flex-wrap flex-box" style={{ marginLeft: '42%' }}>
                            {renderPageNumbers}
                        </div>
                    </div >
                </div >
                <Footer />
            </>
        )
    }

    componentDidMount() {
        console.log('listing >>>>', this.props);
        // this.setState({idReceived: this.props.match.params.id});
        let itemName = this.props.match.params.id;

        axios.get(url + itemName)
            .then(res => {
                console.log('res', res.data);
                this.shuffle(res.data);
                this.setState({
                    items: res.data
                })
            }).catch(err => {
                console.log('err', err);
            }).finally(() => {
                console.log('finally');
            }
            )
    }
}

export default Listing;