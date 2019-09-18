import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";
import {Link} from "react-router-dom"

import {removeModule, openCreateModal, openEditModal, setModuleId, subscribe} from "../store"

class Modules extends Component {
    constructor() {
        super();

        this.state = {
        }
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('modules'));
    }

    onOpenCreateModal = () => {
        this.props.dispatch(openCreateModal())
    }

    onOpenEditModal = (id) => {
        this.props.dispatch(setModuleId(id))
        this.props.dispatch(openEditModal())
    }

    removeModule = (id) => {
        if(window.confirm("Remove this module?"))
            this.props.dispatch(removeModule(id))
    }

    onSubscribe = (moduleId) => {
        const userId = localStorage.getItem("userId")
        this.props.dispatch(subscribe(userId, moduleId))
    }

    render() {
        const {modules} = this.props;
        const role = localStorage.getItem("role")
        const id = localStorage.getItem("userId")
        const userStorage = JSON.parse(localStorage.getItem("currentUser"))
        const currentUser = userStorage.data[0] || userStorage.data;
        let subscribed = []
        currentUser.relationships.takes.data.map(us => {
            subscribed.push(us.id)
        })

        const teacherModules = modules && modules.data && modules.data.filter(module => {
            return module.relationships.teacher.data.id === id
        })

        const allModules = role === "teacher" ? teacherModules : modules && modules.data

        return (
            <div className="modules">
                <h3 className="prof-heading">{role === "teacher" ? "My Modules" : "Modules"}</h3>
                {
                    role === "teacher" && <span onClick={this.onOpenCreateModal} className="pointer">
                        Create a Module
                    </span>
                }
                {
                    role === "student" && <Link to="/my-modules" className="pointer">
                        My Modules
                    </Link>
                }
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Semester</th>
                        {
                            role === "teacher" && <th>Edit/Delete</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {allModules && allModules.length <= 0 && <tr className="prof-heading">
                        <th>Have no modules</th>
                    </tr>}
                    {
                        allModules && allModules.map(module => {
                            return <tr key={module.id}>
                                {
                                    role === "teacher" && <td><Link to={`/module/${module.id}`}>{module.id}</Link></td>
                                }
                                {
                                    role === "student" && <td><span>{module.id}</span></td>
                                }
                                <td>{module.attributes.code}</td>
                                <td>{module.attributes.name}</td>
                                <td>{module.attributes.semester}</td>
                                {
                                    role === "teacher" && <td>
                                        <button
                                            onClick={this.onOpenEditModal.bind(this, module.id)}
                                            className={`btn-success glyphicon glyphicon-pencil`}/>
                                        <button
                                            onClick={this.removeModule.bind(this, module.id)}
                                            className={`btn-danger glyphicon glyphicon-remove `}/>
                                    </td>
                                }
                                {
                                    role === "student" && <td>
                                        <span>
                                                {
                                                    !subscribed.includes(module.id) &&
                                                    <span id={module.id}
                                                          className="pointer"
                                                          onClick={this.onSubscribe.bind(this, module.id)}>
                                                    Subscribe
                                                </span>
                                                }
                                            {
                                                subscribed.includes(module.id) &&
                                                <span style={{color: "green"}}>Subscribed</span>
                                            }
                                            </span>
                                    </td>
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        modules: state.api.modules,
    }
}

export default connect(mapStateToProps)(Modules);
