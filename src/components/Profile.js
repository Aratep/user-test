import React, {Component} from 'react';
import {connect} from 'react-redux';

import SideNav from "./SideNav"
import {updateProfile} from "../store"
import {minLength, validateEmail, required} from "../validate";

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errors: {}
        }
    }

    componentWillMount() {
        const strUser = localStorage.getItem("currentUser");
        const user = JSON.parse(strUser).data[0] || JSON.parse(strUser).data;

        this.setState({
            firstName: user.attributes["first-name"],
            lastName: user.attributes["last-name"],
            email: user.attributes.email
        })

    }

    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    onEditProfile = (e) => {
        e.preventDefault();
        const id = localStorage.getItem("userId")
        const {firstName, lastName, email, password} = this.state;

        let errors = {};
        errors.firstName = minLength(firstName, 1)
        errors.lastName = minLength(lastName, 1)
        errors.email = validateEmail(email)
        errors.password = required(password)

        if (errors.firstName === "" && errors.lastName === "" && errors.email === "") {
            this.props.dispatch(updateProfile(this.state, id))
            errors = {}
        }
        this.setState({errors})
    }

    render() {
        const {firstName, lastName, email, password, errors} = this.state;
        const {signUpError} = this.props

        return (
            <div className="container-fluid">
                <div className="row content">
                    <SideNav/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <h3 className="prof-heading">My Profile</h3>
                            <form className="form" onSubmit={this.onEditProfile}>
                                {
                                    signUpError && <span className="error-text">{signUpError}</span>
                                }
                                <input
                                    onChange={this.handleChange}
                                    name="email"
                                    value={email}
                                    type="text" placeholder="email"/>
                                <div className="error-msg">{errors.email}</div>
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
                                <input
                                    onChange={this.handleChange}
                                    name="password"
                                    value={password}
                                    type="password" placeholder="password"/>
                                <div className="error-msg">{errors.password}</div>
                                <button onClick={this.onEditProfile}>edit</button>
                            </form>
                        </div>
                    </div>
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

export default connect(mapStateToProps)(Profile);
