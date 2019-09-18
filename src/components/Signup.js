import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {signup} from "../store"
import {required, validateEmail, minLength} from "../validate";

class Signup extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "",
            errors: {}
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    signup = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const {email, password, firstName, lastName, role} = this.state;

        let errors = {};

        errors.email = validateEmail(email)
        errors.password = required(password)
        errors.firstName = minLength(firstName, 1)
        errors.lastName = minLength(lastName, 1)
        errors.role = required(role)

        if(errors.email === "" && errors.password === "" && errors.firstName === "" && errors.lastName === ""){
            dispatch(signup(this.state))

            errors = {}
        }
        this.setState({errors})

    }

    render() {
        const {email, password, firstName, lastName, errors} = this.state;
        const {signUpError} = this.props;

        return (
            <div className="login-page">
                <div className="form">
                    {
                        signUpError && <span className="error-text">{signUpError}</span>
                    }
                    <form className="register-form" onSubmit={this.signup}>
                        <input
                            onChange={this.handleChange}
                            name="email"
                            value={email}
                            type="text" placeholder="email address"/>
                        <div className="error-msg">{errors.email}</div>
                        <input
                            onChange={this.handleChange}
                            name="password"
                            value={password}
                            type="password" placeholder="password"/>
                        <div className="error-msg">{errors.password}</div>
                        <input
                            onChange={this.handleChange}
                            name="firstName"
                            value={firstName}
                            type="text" placeholder="first name"/>
                        <div className="error-msg">{errors.firstName}</div>
                        <input
                            onChange={this.handleChange}
                            name="lastName"
                            value={lastName}
                            type="text" placeholder="last name"/>
                        <div className="error-msg">{errors.lastName}</div>
                        <div className="role">
                            <label htmlFor="student">Student</label>
                            <input
                                onChange={this.handleChange}
                                type="radio" name="role" value="student" id="student"/>
                            <label htmlFor="teacher">Teacher</label>
                            <input
                                onChange={this.handleChange}
                                type="radio" name="role" value="teacher" id="teacher"/>
                        </div>
                        <div style={{color: "red"}}>{errors.role}</div>
                        <button onClick={this.signup}>create</button>
                        <p className="message">
                            Already registered?
                            <Link to="/login">Sign In</Link>
                        </p>
                    </form>

                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        signUpError: state.appReducers.signUpError,
    }
}

export default connect(mapStateToProps)(Signup);
