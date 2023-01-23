import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Header from '../../header';
import Footer from '../../Footer';
import './loginSignup.css';

const url = "https://zany-dog-tank-top.cyclic.app/api/auth/login";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: 'testuser@gmail.com',
            password: 'testuser',
            message: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // automatically gets changed as:-   name: event.target.value, email: event.target.value, so on & updates the correct state.
        // this is how we manage multiple input boxes in one go.
    }

    handleSubmit = (event) => {
        event.preventDefault();     // stop page from reloading (due to form submit)
        // here will make a call to api, to register the user.
        fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((res) => res.json())
            .then((data) => {
                // if email is not registered, or password is incorrect, then set the error message to display.
                // console.log('data: ', data)
                if (data.auth === false) {
                    this.setState({ message: data.token });
                    alert('invalid credentials, please try again!');
                } else {
                    // user is a registered user, & password is correct then proceed, login him,
                    // and save the token we get from api, which allows accessing user info to us, 
                    // for a limited time period (set in the API code) after which token becomes invalid.

                    // save the token 
                    sessionStorage.setItem('ltk', data.token);
                    // ltk: login token

                    console.log('login success !');
                    if (sessionStorage.getItem('last_page')) {
                        this.props.history.push(sessionStorage.getItem('last_page'));   // redirect user to his last visited page on website.
                    } else {
                        this.props.history.push('/');
                    }
                }
            })
    }

    conditionalLogin = () => {
        if (sessionStorage.getItem('loginStatus') === 'true') {
            // if already logged In
            return (
                <div className="login-container" >
                    <div className="left-login">
                        <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>Login</p>
                        <p className="left-login-desc">Get access to your Orders, Wishlist and Recommendations</p>
                    </div>
                    <div className="right-login" style={{color:'grey'}}>
                        <div>
                            <input type="email" name="email" value={sessionStorage.getItem('userInfo').split(',')[1]} disabled />
                        </div>
                        <div>
                            <input type="password" name="password" value="********" disabled />
                        </div>
                        <button className="login-btn" type="button" style={{backgroundColor: 'grey'}}>Already Logged In !</button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="login-container" >
                    <div className="left-login">
                        <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>Login</p>
                        <p className="left-login-desc">Get access to your Orders, Wishlist and Recommendations</p>
                    </div>
                    <div className="right-login" style={{color: 'inherit'}}>
                        <div>
                            <input type="email" name="email" placeholder="Enter your Email" onChange={this.handleChange} required />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Enter Password" onChange={this.handleChange} required />
                        </div>
                        <button className="login-btn" type="submit">Login</button>
                        <p className="divider-or">OR</p>
                        <Link to="/signup">
                            <button className="signup-btn">Sign Up</button>
                        </Link>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <>
                <Header />
                <form onSubmit={this.handleSubmit}>
                    {this.conditionalLogin()}
                </form>
                <Footer />
            </>
        )
    }
}

export default Login;