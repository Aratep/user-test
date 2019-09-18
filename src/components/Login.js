import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {validateEmail, required} from "../validate"
import {login} from "../store"

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            errors: {},
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    login = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const {email, password} = this.state;

        let errors = {};

        errors.email = validateEmail(email)
        errors.password = required(password)

        if(errors.email === "" && errors.password === ""){
            dispatch(login(email, password))
            errors = {}

        }
        this.setState({errors})

    }

    render() {
        const {email, password, errors} = this.state;
        const {users} = this.props;

        if(users && users.data && users.data.length > 0 ) {
            localStorage.setItem("currentUser", JSON.stringify(users));
            localStorage.setItem("userId", users.data[0].id)
            localStorage.setItem("role", users.data[0].attributes.role)
        }

        return (
            <div className="login-page">
                <div className="form">

                    <form className="login-form" onSubmit={this.login}>
                        <input
                            onChange={this.handleChange}
                            name="email"
                            value={email}
                            type="text" placeholder="email"/>
                        <div className="error-msg">{errors.email}</div>
                        <input
                            onChange={this.handleChange}
                            name="password"
                            value={password}
                            type="password" placeholder="password"/>
                        <span className="error-msg">{errors.password}</span>
                        <button onClick={this.login}>login</button>
                        <p className="message">Not registered?
                            <Link to="/signup">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        users: state.api.users,
    }

}

export default connect(mapStateToProps)(Login);
