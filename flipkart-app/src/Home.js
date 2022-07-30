import React from 'react';
import Header from './header';
import Strip from './top_strip';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

// owl carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const url = 'https://app2fkartapi.herokuapp.com/item/';
// https://app2fkartapi.herokuapp.com/item/clothes

class Home extends React.Component {

    constructor(props) {
        super(props);
        console.log('>>> Home: ', props);

        this.state = {
            clothes: '',
            mobiles: '',
            watches: '',
            formals: '',
            gaming_mouses: ''
        }
    }

    RenderItems = (data) => {
        if (!data) return;
        console.log(data);
        let itemDesc = '';

        let cards = data.map((item) => {
            itemDesc = item.description.substr(0, 18) + '...';
            return (
                //  myCard 1 
                <Link to={'/'} id={item._id}>
                    <div className="myCard card">
                        <div className="img">
                            <img className="card-img-top" src={item.image} alt={item.brand} />
                        </div>

                        <div className="content card-text">
                            <p>{itemDesc}</p>
                            <p className="price">From &#8377;{item.new_price}</p>
                            <p className="brief">Top Selling</p>
                        </div>
                    </div>
                </Link>
            )
        })

        return (
            <OwlCarousel className='items-strip owl-theme' loop margin={1} items={7} dotsContainer="false" navContainer="false" nav>
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
                <div id="deals-of-day" className="cards-holder container-fluid">
                    <h3 className="cards-heading">Deals of the Day</h3>
                    <hr />
                    {this.RenderItems(this.state.clothes)}
                </div>

                {/* {this.RenderItems(this.state.mobiles)}
                {this.RenderItems(this.state.watches)}
                {this.RenderItems(this.state.formals)}
                {this.RenderItems(this.state.gaming_mouses)} */}
            </>
        )
    }

    componentDidMount() {
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
}

export default Home;
