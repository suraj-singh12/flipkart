import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Header from '../../header';
import Footer from '../../Footer';
import './loginSignup.css';

const url = "https://zany-dog-tank-top.cyclic.app/api/auth/register";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.value);
        // automatically gets changed as:-   name: event.target.value, email: event.target.value, so on & updates the correct state.
        // this is how we manage multiple input boxes in one go.
    }

    handleSubmit = (event) => {
        event.preventDefault(); // prevent  the page from refreshing due to form submit.

        // here will make a call to api, to register the user.
        fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
            // pushed the details of user, into database.
        })
            .then((data) => {
                console.log(data);
                let message = "User Registered successfully";
                // api sends status 500, if user is already registered else 200.
                if (data.status === 500) {
                    // user already exists
                    // Response {type: 'cors', url: 'https://zany-dog-tank-top.cyclic.app/api/auth/register', redirected: false, status: 500, ok: false, …}
                    message = "User Already Exists!! Please Login";
                }
                // user registered
                // Response {type: 'cors', url: 'https://zany-dog-tank-top.cyclic.app/api/auth/register', redirected: false, status: 200, ok: true, …}
                alert(message);
                this.props.history.push('/login');
            }); // redirecting to login, after user is registered.
        // for dev purpose, all registered users can be seen here: https://zany-dog-tank-top.cyclic.app/api/auth/users 
    }

    render() {
        return (
            <>
                <Header />
                <form onSubmit={this.handleSubmit}>
                    <div className="login-container">
                        <div className="left-login">
                            <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>Looks like you're new here!</p>
                            <p className="left-login-desc">Sign up with your email to get started</p>
                        </div>
                        <div className="right-login" style={{marginTop: '4%'}}>
                            <div>
                                <input type="text" name="name" placeholder="Enter your name" onChange={this.handleChange} required/>
                            </div>
                            <div>
                                <input type="tel" name="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" maxLength="10" placeholder="Enter your Mobile Number" onChange={this.handleChange} required/>
                            </div>
                            <div>
                                <input type="text" name="email" placeholder="Enter your Email" onChange={this.handleChange} required/>
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="Enter Password" onChange={this.handleChange} required/>
                            </div>
                            <button className="signup-btn" type="Submit" style={{ marginTop: '3%' }}>Sign Up</button>
                            <p className="divider-or">OR</p>
                            <Link to="/login">
                                <button className="login-btn">Existing User? Login</button>
                            </Link>
                        </div>
                    </div>
                </form>
                <Footer />
            </>
        )
    }
}

export default Signup;