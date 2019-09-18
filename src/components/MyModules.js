import React, {Component} from 'react';
import {connect} from "react-redux";
import {readEndpoint} from "redux-json-api";
import {Link} from "react-router-dom";

import SideNav from "./SideNav"

class MyModules extends Component {
    componentWillMount() {
        this.props.dispatch(readEndpoint('modules'));
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {modules} = this.props
        const userStorage = JSON.parse(localStorage.getItem("currentUser"))

        let studentModules = []
        const currentUser = userStorage.data[0] || userStorage.data

        currentUser.relationships.takes.data.map(us=> {
            let mod = modules && modules.data && modules.data.filter(m => {
                return m.id === us.id
            })
            studentModules.push(mod)
        })

        studentModules && studentModules.map(mod => {

        })

        return (
            <div className="container-fluid">
                <div className="row content">
                    <SideNav/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <div className="prof-heading">
                                <h3>My Modules</h3>
                                {!modules && <div>loading</div>}
                            </div>
                            <span className="pointer" onClick={this.goBack}>Go Back</span>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Semester</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    studentModules && studentModules.map((mod, i) => {
                                        return mod && mod.map(m => {
                                            return <tr key={m.id}>

                                                <td><Link to={`/module/${m.id}`}>{m.id}</Link></td>

                                                <td>{m.attributes.code}</td>
                                                <td>{m.attributes.name}</td>
                                                <td>{m.attributes.semester}</td>
                                            </tr>
                                        })
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modules: state.api.modules,
    }
}

export default connect(mapStateToProps)(MyModules);