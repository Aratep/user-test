import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import history from "../history"
import {removeCurrentUser} from "../store"

class SideNav extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
        }
    }

    logOut = (e) => {
        e.preventDefault();
        this.props.dispatch(removeCurrentUser())

        localStorage.removeItem("currentUser");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        history.push("/login")
        window.location.reload()
    }

    render() {
        const strUser = localStorage.getItem("currentUser");
        const user = (JSON.parse(strUser).data && JSON.parse(strUser).data[0]) || JSON.parse(strUser).data
        const role = localStorage.getItem("role")
        return (
            <div className="col-sm-3 sidenav">
                <h5>You're signed in as <b>{role}</b></h5>
                <h4>{user.attributes["first-name"]} {user.attributes["last-name"]} </h4>
                <h5>{user.attributes.email} </h5>
                <ul className="nav nav-pills nav-stacked">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">My profile</Link></li>
                    <li><Link to="/rooms">Rooms</Link></li>
                    <li><span style={{padding: "10px 15px"}} className="pointer" onClick={this.logOut}>Log Out</span></li>
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        users: state.appReducers.currentUser,
    }
}

export default connect(mapStateToProps)(SideNav);
