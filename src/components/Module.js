import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom"

import SideNav from "./SideNav";
import {readEndpoint} from "redux-json-api";
import {
    openAddNewsModal, openAddSessionsModal, openAddContentsModal,
    closeAddNewsModal, closeAddSessionsModal, closeAddContentsModal
} from "../store"
import AddNewsModal from "./modals/AddNews"
import AddSessionsModal from "./modals/AddSessions"
import AddContentsModal from "./modals/AddContents"

class Module extends Component {
    constructor() {
        super();

        this.state = {}
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('modules'));
        this.props.dispatch(readEndpoint('users'));
        this.props.dispatch(readEndpoint('news'));
        this.props.dispatch(readEndpoint('sessions'));
        this.props.dispatch(readEndpoint('contents'));
    }

    onOpenAddNewsModal = () => {
        this.props.dispatch(openAddNewsModal())
        this.props.dispatch(closeAddSessionsModal())
        this.props.dispatch(closeAddContentsModal())
    }
    onOpenAddSessionsModal = () => {
        this.props.dispatch(openAddSessionsModal())
        this.props.dispatch(closeAddNewsModal())
        this.props.dispatch(closeAddContentsModal())
    }
    onOpenAddContentsModal = () => {
        this.props.dispatch(openAddContentsModal())
        this.props.dispatch(closeAddNewsModal())
        this.props.dispatch(closeAddSessionsModal())
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {modules, match, users, news, sessions, contents} = this.props;
        const module = modules && modules.data.filter(module => module.id === match.params.id)
        const teacherId = module && module[0].relationships.teacher.data.id
        const currentusers = (users && users.data) || (users && users.data[0])
        const teacher = currentusers && teacherId && currentusers.filter(user => user.id === teacherId)
        const currentNews = news && news.data.filter(n => n.relationships.module.data.id === match.params.id)
        const currentSessions = sessions && sessions.data.filter(s => s.relationships.module.data.id === match.params.id)
        const currentContents = contents && contents.data.filter(c => c.relationships.module.data.id === match.params.id)

        const role = localStorage.getItem("role")

        return (
            <div className="container-fluid">
                <div className="row content">
                    <SideNav/>
                    <AddNewsModal moduleId={match.params.id}/>
                    <AddContentsModal moduleId={match.params.id}/>
                    <AddSessionsModal moduleId={match.params.id}/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <h3 className="prof-heading">Module Details</h3>
                            {
                                role === "teacher" && <div style={{marginBottom: "20px"}}>
                                    Add{" "}
                                    <span onClick={this.onOpenAddNewsModal} className="pointer"><b>News</b></span>,{" "}
                                    <span onClick={this.onOpenAddSessionsModal} className="pointer"><b>Sessions</b></span>,{" "}
                                    <span onClick={this.onOpenAddContentsModal} className="pointer"><b>Contents</b></span>
                                </div>
                            }
                            <span className="pointer" onClick={this.goBack}>Go Back</span>

                            {!module && <div className="prof-heading">loading...</div>}
                            {
                                module && <div className="module">
                                    <table style={{width: "43%"}} className="table table-hover">
                                        <tbody>
                                        <tr>
                                            <td>Module Name</td>
                                            <td>{module[0].attributes.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Module Code</td>
                                            <td>{module[0].attributes.code}</td>
                                        </tr>
                                        <tr>
                                            <td>Semester</td>
                                            <td>{module[0].attributes.semester}</td>
                                        </tr>
                                        <tr>
                                            <td>Teacher</td>
                                            <td>
                                                {teacher && teacher[0].attributes["last-name"]} {" "}
                                                {teacher && teacher[0].attributes["first-name"]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>News</td>
                                            <td>
                                                {currentNews && currentNews.length <= 0 && <span>No News</span>}
                                                {
                                                    currentNews && currentNews.map(n => {
                                                        return <div key={n.id}>
                                                            <Link to={`/news/${n.id}`}>{n.attributes.title}</Link>
                                                        </div>
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sessions</td>
                                            <td>
                                                {currentSessions && currentSessions.length <= 0 && <span>No Sessions</span>}
                                                {
                                                    currentSessions && currentSessions.map(s => {
                                                        return <div key={s.id}>
                                                            <Link to={`/session/${s.id}`}>{s.attributes.title}</Link>
                                                        </div>
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Contents</td>
                                            <td>
                                                {currentContents && currentContents.length <= 0 && <span>No Contents</span>}
                                                {
                                                    currentContents && currentContents.map(c => {
                                                        return <div key={c.id}>
                                                            <Link to={`/content/${c.id}`}>{c.attributes.title}</Link>
                                                        </div>
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        modules: state.api.modules,
        users: state.api.users,
        news: state.api.news,
        sessions: state.api.sessions,
        contents: state.api.contents,
    }
}

export default connect(mapStateToProps)(Module);
