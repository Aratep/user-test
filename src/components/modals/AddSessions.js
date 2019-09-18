import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";

import {addNewSeesion, closeAddSessionsModal} from "../../store"
import {minLength, required} from "../../validate";

class AddSessions extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            date: "",
            keywords: "",
            roomId: "",
            errors: {}
        }
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('rooms'));
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value})
    }

    onCloseModal = () => {
        this.props.dispatch(closeAddSessionsModal())
    }

    onAddNewSession = (e) => {
        e.preventDefault()
        const {moduleId} = this.props;
        const {title, keywords, roomId, date} = this.state
        let errors = {}
        errors.title = minLength(title, 4)
        errors.keywords = required(keywords)
        errors.roomId = required(roomId)
        errors.date = required(date)

        if (errors.keywords === "" && errors.title === "" && errors.roomId === "" && errors.date === "") {
            this.props.dispatch(addNewSeesion(this.state, moduleId))
            errors = {}
        }
        this.setState({errors})
    }

    render() {
        const {addSessions, rooms} = this.props;
        const {title, keywords, date, roomId, errors} = this.state;

        return (
            <div className="modal " id="module" role="dialog" style={{
                display: addSessions ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close">
                                ×
                            </button>
                            <h4 className="modal-title">Add a Session</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onAddNewSession}>
                                <input
                                    onChange={this.handleChange}
                                    name="title"
                                    value={title}
                                    type="text" placeholder="title"/>
                                <div className="error-msg">{errors.title}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="keywords"
                                    value={keywords}
                                    type="text" placeholder="keywords"/>
                                <div className="error-msg">{errors.keywords}</div>
                                <select name="roomId" value={roomId} onChange={this.handleChange}>
                                    <option>Select Room</option>
                                    {
                                        rooms && rooms.data.map(room => {
                                            return <option value={room.id} key={room.id}>
                                                {room.attributes.name}
                                            </option>
                                        })
                                    }
                                </select>
                                <div className="error-msg">{errors.roomId}</div>
                                <input
                                    onChange={this.handleChange}
                                    type="datetime-local"
                                    name="date" value={date}/>
                                <div className="error-msg">{errors.date}</div>
                                <button onClick={this.onAddNewSession}>add session</button>
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
        addSessions: state.appReducers.addSessions,
        rooms: state.api.rooms,
    }
}

export default connect(mapStateToProps)(AddSessions);
