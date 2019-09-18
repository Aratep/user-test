import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";

import SideNav from "./SideNav"
import Modules from "./Modules"
import CreateModuleModal from "./modals/CreateModule"
import EditModuleModal from "./modals/EditModule"

class HomePage extends Component {
    componentWillMount() {
        this.props.dispatch(readEndpoint('users'));
    }
    render() {
        return (
            <div className="container-fluid">
                <CreateModuleModal/>
                <EditModuleModal/>
                <div className="row content">
                    <SideNav/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <Modules/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(HomePage);
