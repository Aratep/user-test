import React, {Component} from 'react';
import {connect} from "react-redux"

import {AppRouting} from "./routes"

class App extends Component {
    render() {
        const {successMessage} = this.props
        return (
            <div>
                {
                    successMessage && <span className="success-message">{successMessage}</span>
                }
                <AppRouting/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        successMessage: state.appReducers.message
    }
}

export default connect(mapStateToProps)(App);
