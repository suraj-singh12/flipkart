import React from 'react';
import Header from './header';

const Home = (props) => {
    console.log('>>> Home: ', props);
    
    return (
        <>
            <Header />
            {/* <Search /> */}
            {/* <QuickSearch /> */}
        </>
    )
}

export default Home;