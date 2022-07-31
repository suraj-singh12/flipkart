import React from 'react';
import Filters from './filters';
import axios from 'axios';
import Header from '../../header';
import { Link } from 'react-router-dom';
import './listing.css';
import Footer from '../../Footer';

const urlTopItems = 'https://app2fkartapi.herokuapp.com/filter/popularity/all_items';
const url = 'https://app2fkartapi.herokuapp.com/item/';
const popularityUrl = 'https://app2fkartapi.herokuapp.com/filter/popularity/';

class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            currentPage: 1,
            todosPerPage: 24
        }
        this.handleClick = this.handleClick.bind(this);
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
        axios.get(popularityUrl + this.props.match.params.id)
            .then(res => {
                this.shuffle(res.data);
                this.setState({
                    items: res.data
                })
            }).catch(err => {
                console.log('err', err);
            })
    }
    getContent = (currentData) => {
        // alter here ============================================================>>>>>>>>>xxxxxxxxxxxxxxxxxx


        if (!currentData || currentData.length === 0 || this.state.items.length === 0) {
            console.log('inside this')
            console.log('currentData', currentData)
            return (
                <div className="loader-img">
                    <img src={require("./images/loader.gif")} style={{ height: 'inherit', width: 'auto' }} alt="loader" />
                    <h2>Loading...</h2>
                </div>
            )
        }
        else {
            let itemDesc = '';
            console.log('in getContent')

            let item = this.state.items;
            let reviews;
            let currentItemIndex = (this.state.todosPerPage - 1) * this.state.currentPage ;

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
                        <Link className="custom-card-anchor" to={'/'}>
                            <div className="card-body">
                                <div className="card-title description">{itemDesc}</div>
                                <div className="card-text">
                                    <div className="brand">{item[currentItemIndex + index].brand}</div>
                                    <div className="color">{item[currentItemIndex + index].color}</div>
                                    <span className="rating">
                                        <button className="stars_btn"><span className="stars">{item[currentItemIndex + index].stars ? item[currentItemIndex + index].stars : 3.4}</span> <i className="bi bi-star-fill stars-star"></i></button>
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


    render() {
        const { items, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        let pages = pageNumbers.slice(0, (pageNumbers.length < 5) ? pageNumbers.length - 1 : 5);

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
                    <Filters />
                    <div className="content">
                        <div className="results-strip">
                            <p>Showing {(this.state.currentPage - 1) * this.state.todosPerPage} - {this.state.currentPage * this.state.todosPerPage} of {this.state.items.length} results for "{getItemName.toUpperCase()}"</p>
                            <div className="strip-of-sort-by">
                                <button className="btn btn-sm" >Sort By</button>
                                <button className="btn btn-sm" onClick={() => {this.setState({items: this.shuffle(this.state.items)})}}>Relevance</button>
                                <button className="popularity btn btn-sm" onClick={() => {this.sortByPopularity()}}>Popularity</button>
                                <button className="btn btn-sm">Price -- Low to High</button>
                                <button className="btn btn-sm">Price -- High to Low</button>
                            </div>
                        </div>
                        <div className="d-inline-flex mt-0 flex-wrap flex-box" style={{ borderBottom: '1px solid #d2d1d1', marginBottom:'1rem'}}>
                            {this.getContent(currentTodos)}
                        </div>
                        <div className="d-inline-flex mt-0 flex-wrap flex-box" style={{marginLeft:'42%'}}>
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
        } else if(this.props.match.params.id){
            axios.get(url + this.props.match.params.id)
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
        } else {
            console.log('no id found')
        }
    }
}

export default Listing;