import React from 'react';
import Header from './header';
import Strip from './top_strip';

const Home = (props) => {
    console.log('>>> Home: ', props);

    return (
        <>
            <Header />
            <Strip />
            {/* carousel */}
            <div id="image-slider" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item">
                        <img src={require('./carousel-imgs/gaming-laptop.jpeg')} alt="gaming laptop" className="d-block" style={{width: '100%'}} />
                    </div>
                    <div className="carousel-item active">
                        <img src={require('./carousel-imgs/infinix-laptop.jpeg')} alt="Infinix Laptop" className="d-block" style={{width: '100%'}} />
                    </div>
                    <div className="carousel-item">
                        <img src={require('./carousel-imgs/mobile-offer.jpg')} alt="Mobile Offer" className="d-block" style={{width: '100%'}} />
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
        </>
    )
}

export default Home;