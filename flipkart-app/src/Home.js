import React from 'react';
import Header from './header';
import Strip from './top_strip';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

// owl carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// item fetching api
const url = 'https://flipkart-api-f8gv.onrender.com/item/';
// https://flipkart-api-f8gv.onrender.com/item/clothes

class Home extends React.Component {

    constructor(props) {
        super(props);
        console.log('>>> Home: ', props);

        // save the location of current page(except login/register/placeOrder/viewOrder pages, we do this on all pages[home, listing, details]) as last visited page; will use it to when non-logged in user logs in; will redirect him to his previous page (before login)
        let last_page_address = props.match.url + props.location.search;
        sessionStorage.setItem('last_page', last_page_address);
        console.log('last visited page set to: ', sessionStorage.getItem('last_page'))

        this.state = {
            clothes: '',
            mobiles: '',
            watches: '',
            formals: '',
            gaming_mouses: '',
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }
    }

    // to update the size of screen on resize
    updateDimensions = () => {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    };

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
    RenderItems = (itemName, data, noOfItems) => {
        // noOfItems defines how many items to display in carousel; by default I send it 7
        // setting no of items according to screen size
        if (this.state.windowWidth < 700) {
            noOfItems = 3;
        } else if (this.state.windowWidth > 700 && this.state.windowWidth < 992) {
            noOfItems = 4;
        } else {
            noOfItems = 7;
        }

        if (!data) return;
        // shuffle the array items
        this.shuffle(data);
        // console.log(data);
        let itemDesc = '';

        let cards = data.map((item) => {
            itemDesc = item.description.substr(0, 18) + '...';
            return (
                //  myCard 1 
                <Link to={`/details/${itemName}?${item.item_id}`} key={item._id}>
                    <div className="myCard card">
                        <div className="img">
                            <img className="card-img-top" src={item.image} alt={item.brand} />
                        </div>

                        <div className="content card-text">
                            <p>{itemDesc}</p>
                            <p className="discount">Min {item.discount} % OFF</p>
                        </div>
                    </div>
                </Link>
            )
        })

        return (
            <OwlCarousel className='items-strip' loop margin={1} items={noOfItems} dotsContainer="false" navContainer="false" nav>
                {cards}
            </OwlCarousel>
        )

    }

    render() {
        return (
            <>
                <Header />
                <Strip />
                {/* carousel */}
                <div id="image-slider" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item">
                            <img src={require('./carousel-imgs/gaming-laptop.jpeg')} alt="gaming laptop" className="d-block" style={{ width: '100%' }} />
                        </div>
                        <div className="carousel-item active">
                            <img src={require('./carousel-imgs/infinix-laptop.jpeg')} alt="Infinix Laptop" className="d-block" style={{ width: '100%' }} />
                        </div>
                        <div className="carousel-item">
                            <img src={require('./carousel-imgs/mobile-offer.jpg')} alt="Mobile Offer" className="d-block" style={{ width: '100%' }} />
                        </div>
                    </div>


                    <button className="carousel-control-prev img-slider-prev-control" type="button" data-bs-target="#image-slider"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next img-slider-next-control" type="button" data-bs-target="#image-slider"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
                {/* items */}
                {/* // <!-- --------------------------------- holder 1 ---------------------------------- --> */}
                <div id="deals_of_day" className="cards-holder container-fluid">
                    <h3 className="cards-heading">Deals of the Day</h3>
                    <hr />
                    {this.RenderItems('clothes', this.state.clothes, 7)}
                </div>

                <div className="cards-holder container-fluid">
                    <h3 className="cards-heading">Attractive Deals</h3>
                    <hr />
                    {this.RenderItems('mobile_phones', this.state.mobiles, 7)}
                </div>
                <div className="cards-holder container-fluid">
                    <h3 className="cards-heading">Items You May Like</h3>
                    <hr />
                    {this.RenderItems('watches', this.state.watches, 7)}
                </div>
                <div className="cards-holder container-fluid">
                    <h3 className="cards-heading">Attire</h3>
                    <hr />
                    {this.RenderItems('formals', this.state.formals, 7)}
                </div>
                <div className="cards-holder container-fluid">
                    <h3 className="cards-heading">Gaming Category</h3>
                    <hr />
                    {this.RenderItems('gaming_mouses', this.state.gaming_mouses, 7)}
                </div>

                <Footer />
            </>
        )
    }

    componentDidMount() {
        // attaching; on every resize updateDimensions will be called
        window.addEventListener('resize', this.updateDimensions);

        fetch(url + 'clothes')
            .then(res => res.json())
            .then(data => {
                this.setState({ clothes: data });
            }).catch(err => {
                console.log(err)
            }
            )

        axios.get(url + 'mobile_phones')
            .then(res => {
                this.setState({ mobiles: res.data });
            })

        axios.get(url + 'watches')
            .then(res => {
                this.setState({ watches: res.data });
            })

        axios.get(url + 'formals')
            .then(res => {
                this.setState({ formals: res.data });
            })

        axios.get(url + 'gaming_mouses')
            .then(res => {
                this.setState({ gaming_mouses: res.data });
            })
    }
    componentWillUnmount() {
        // removing event listener
        window.removeEventListener('resize', this.updateDimensions);
    }
}

export default Home;
