import React, { Component } from 'react';
import axios from 'axios';
import OrderDisplay from './orderDisplay';
import Header from '../../header';
import Footer from '../../Footer';

const url = 'https://crazy-dove-yoke.cyclic.app/orders/get';
// https://crazy-dove-yoke.cyclic.app/orders/get/alpha1@alpha.com
const updateUrl = 'https://crazy-dove-yoke.cyclic.app/orders/update';
// https://crazy-dove-yoke.cyclic.app/orders/update/2575

class ViewOrder extends Component {
    constructor(props) {
        super(props);

        // save the location of current page(except login/register/placeOrder/viewOrder pages, we do this on all pages[home, listing, details]) as last visited page; will use it to when non-logged in user logs in; will redirect him to his previous page (before login)
        let last_page_address = props.match.url + props.location.search;
        sessionStorage.setItem('last_page', last_page_address);
        console.log('last visited page set to: ', sessionStorage.getItem('last_page'))

        this.state = {
            orders: ''
        }
    }

    render() {

        console.log('loginStatus: ', sessionStorage.getItem('loginStatus'));
        if (!sessionStorage.getItem('loginStatus') || sessionStorage.getItem('loginStatus') === 'false') {
            /* if the user is not logged in then we don't want him to reach this page,
             * because only a logged in user can make an order */

            console.log('inside if: ')
            return (
                <>
                    <Header />
                    <div className="container" style={{ textAlign: 'center', padding: '2%', color: 'blue' }}>
                        <h3>
                            Login First to View Order
                        </h3>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Header />
                    <OrderDisplay orderData={this.state.orders} />
                    <Footer />
                </>
            )
        }
    }

    // calling api to get all orders information
    componentDidMount() {
        if (!sessionStorage.getItem('loginStatus') || sessionStorage.getItem('loginStatus') === 'false') {
            // if user is not logged in then nothing to fetch from api
            return;
        }
        console.log(this.props);
        if (this.props.location) {
            // in the url of viewOrder, we get the data of payment (we are redirected from there to this page with that data), 
            // that data can be accessed via queryparams (from this.props.location.search)
            let queryp = this.props.location.search;
            if (queryp) {
                // fetch the status, date, & bank_name from queryparams data
                let data = {
                    "transaction_state": queryp.split('&')[0].split('=')[1],
                    "date": queryp.split('&')[2].split('=')[1],
                    "bank_name": queryp.split('&')[3].split('=')[1]
                }
                // fetch the orderId
                let id = Number(queryp.split('&')[1].split('=')[1].split('_')[1]);

                console.log('>> this.props.location.search (queryparams): ', queryp);
                console.log('>> fetched data from queryparams: ', data);

                // update this order details with the status, date, & bank_name (in database)
                fetch(`${updateUrl}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(
                        console.log('updated  order details')
                    ).then(() => {
                        // get only current user's orders from API
                        let email = sessionStorage.getItem('userInfo').split(',')[1];
                        console.log('info: ', sessionStorage.getItem('userInfo'));
                        console.log(`${url}/${email}`);

                        axios.get(`${url}/${email}`)
                            .then((res) => {
                                this.setState({ orders: res.data });
                            })
                    })
            }

            // else if user has directly come to checkout his orders, then make an api call to fetch all orders of current user
            else {
                let email = sessionStorage.getItem('userInfo').split(',')[1];
                console.log('info: ', sessionStorage.getItem('userInfo'));
                console.log(`${url}/${email}`);

                axios.get(`${url}/${email}`)
                    .then((res) => {
                        this.setState({ orders: res.data });
                    })
            }
        }
    }
}

export default ViewOrder;