import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";

import { editSession, closeEditSessionModal} from "../../store"
import {minLength, required} from "../../validate";

class EditSessionModule extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            date: "",
            keywords: "",
            roomId: "",
            errors: ""
        }
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('sessions'))
        this.props.dispatch(readEndpoint('rooms'));
        setTimeout(() => this.setDefaultValues(), 1000)
    }

    setDefaultValues = () => {
        const {currentSession} = this.props;
        const {title, keywords} = this.state;
        const defTitle = title || (currentSession && currentSession.length > 0 && currentSession[0].attributes.title)
        const defKeywords = keywords || (currentSession && currentSession.length > 0 && currentSession[0].attributes.keywords)

        let dateNow = new Date();
        let date = dateNow.toISOString();
        this.setState({title: defTitle, keywords: defKeywords, date})
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;

        let dateNow = new Date();
        let date = dateNow.toISOString();

        this.setState({[name]: value, date})
    }

    onCloseModal = () => {
        this.props.dispatch(closeEditSessionModal())
    }

    onEditSession = (e) => {
        e.preventDefault()
        const {currentSession, dispatch, sessId} = this.props;
        const {title, keywords, roomId} = this.state;
        const defTitle = title || (currentSession && currentSession.length > 0 && currentSession[0].attributes.title)
        const defKeywords = keywords || (currentSession && currentSession.length > 0 && currentSession[0].attributes.keywords)
        let dateNow = new Date();
        let date = dateNow.toISOString();
        this.setState({title: defTitle, keywords: defKeywords, date})
        // dispatch(editSession(this.state, sessId))

        let errors = {};
        errors.title = minLength(title, 4)
        errors.keywords = required(keywords)
        errors.roomId = required(roomId)

        if(errors.title === "" && errors.keywords === "" && errors.roomId === ""){
            dispatch(editSession(this.state, sessId))
            errors = {}
        }
        this.setState({errors})
    }

    render() {
        const {title, keywords, roomId, errors} = this.state;
        const {editSessionModal, currentSession, rooms} = this.props;
        const defTitle = title || (currentSession && currentSession.length > 0 && currentSession[0].attributes.title)
        const defKeywords = keywords || (currentSession && currentSession.length > 0 && currentSession[0].attributes.keywords)

        return (
            <div className="modal " id="module" role="dialog" style={{
                display: editSessionModal ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close">
                                ×
                            </button>
                            <h4 className="modal-title">Edit Session</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onEditSession}>
                                <input
                                    onChange={this.handleChange}
                                    name="title"
                                    value={defTitle || ""}
                                    type="text" placeholder="title"/>
                                <div className="error-msg">{errors.title}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="keywords"
                                    value={defKeywords || ""}
                                    type="text" placeholder="keywords"/>
                                <div className="error-msg">{errors.keywords}</div>
                                <select name="roomId" value={roomId} onChange={this.handleChange}>
                                    <option >Select Room</option>
                                    {
                                        rooms && rooms.data.map(room => {
                                            return <option value={room.id} key={room.id}>
                                                {room.attributes.name}
                                            </option>
                                        })
                                    }
                                </select>
                                <div className="error-msg">{errors.roomId}</div>
                                <button onClick={this.onEditSession}>edit session</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.onCloseModal}
                                    type="button" className="btn btn-default">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        editSessionModal: state.appReducers.editSessionModal,
        currentSession: state.appReducers.currentSession,
        news: state.appReducers.news,
        rooms: state.api.rooms,
    }
}

export default connect(mapStateToProps)(EditSessionModule);
