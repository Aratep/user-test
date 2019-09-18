import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";

import SideNav from "./SideNav";
import EditSessionModal from "./modals/EditSessionModal";
import {openEditSessionModal, setCurrentSession, removeSession} from "../store"

class Session extends Component {
    constructor() {
        super();

        this.state = {}
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('sessions'))
        this.props.dispatch(readEndpoint('rooms'))
    }

    onOpenEditSessionModal = () => {
        this.props.dispatch(openEditSessionModal())
    }

    onRemoveSession = (id) => {
        if (window.confirm("Remove this session?"))
            this.props.dispatch(removeSession(id))
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {sessions, match, rooms} = this.props
        const currentSession = sessions && sessions.data.filter(n => n.id === match.params.id)
        this.props.dispatch(setCurrentSession(currentSession))
        const role = localStorage.getItem("role")
        const roomId = currentSession && currentSession[0].relationships.room.data.id
        const room = rooms && rooms.data.filter(room => room.id === roomId)

        return (
            <div className="container-fluid">
                <EditSessionModal sessId={match.params.id}/>
                <div className="row content">
                    <SideNav/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <div className="prof-heading">
                                <h3>Session</h3>
                                {currentSession && currentSession.length <= 0 &&
                                <div className="prof-heading">Loading</div>}
                            </div>
                            <span className="pointer" onClick={this.goBack}>Go Back</span>
                            {
                                currentSession && <div style={{marginTop: "20px"}}>
                                    <table style={{width: "43%"}} className="table table-hover">
                                        <tbody>

                                        <tr>
                                            <td>Title</td>
                                            <td>{currentSession[0].attributes.title}</td>
                                        </tr>
                                        <tr>
                                            <td>Keywords</td>
                                            <td>{currentSession[0].attributes.keywords}</td>
                                        </tr>
                                        <tr>
                                            <td>Date</td>
                                            <td>{currentSession[0].attributes.date}</td>
                                        </tr>
                                        <tr>
                                            <td>Room</td>
                                            <td>
                                                <div>Room Name: <b>{room && room[0].attributes.name}</b></div>
                                                <div>Room Address: <b>{room && room[0].attributes.address}</b></div>
                                                <div>Room Capacity: <b>{room && room[0].attributes.capacity}</b></div>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                    {
                                        role === "teacher" && <div style={{width: "40%"}}>
                                            <button
                                                onClick={this.onOpenEditSessionModal}
                                                className={`btn-success glyphicon glyphicon-pencil`}/>
                                            <button
                                                onClick={this.onRemoveSession.bind(this, currentSession[0].id)}
                                                style={{float: "right"}}
                                                className={`btn-danger glyphicon glyphicon-remove `}/>
                                        </div>
                                    }

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
        sessions: state.api.sessions,
        rooms: state.api.rooms,
    }
}

export default connect(mapStateToProps)(Session);
