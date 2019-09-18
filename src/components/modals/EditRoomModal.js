import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeEditRoomModal, editRoom} from "../../store"
import {readEndpoint} from "redux-json-api";

class EditRoomModal extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            address: "",
            capacity: "",
            features: ""
        }
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('rooms'));
        setTimeout(() => this.setDefaultValues(), 500)
    }

    setDefaultValues = () => {
        const {roomId, rooms} = this.props;
        const {name, address, capacity, features} = this.state;

        const currentRoom = roomId && rooms && rooms.data.filter(room => room.id === roomId)

        const defName = name || (currentRoom && currentRoom[0].attributes.name)
        const defAddress = address || (currentRoom && currentRoom[0].attributes.address)
        const defCapacity = capacity || (currentRoom && currentRoom[0].attributes.capacity)
        const defFeatures = features || (currentRoom && currentRoom[0].attributes.features)

        this.setState({name: defName, address: defAddress, capacity: defCapacity, features: defFeatures})

    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value})
    }

    onCloseModal = () => {
        this.props.dispatch(closeEditRoomModal())
    }

    onEditRoom = (e) => {
        e.preventDefault()
        const {roomId, rooms} = this.props;
        const {name, address, capacity, features} = this.state;

        const currentRoom = roomId && rooms && rooms.data.filter(room => room.id === roomId)

        const defName = name || (currentRoom && currentRoom[0].attributes.name)
        const defAddress = address || (currentRoom && currentRoom[0].attributes.address)
        const defCapacity = capacity || (currentRoom && currentRoom[0].attributes.capacity)
        const defFeatures = features || (currentRoom && currentRoom[0].attributes.features)

        this.setState({name: defName, address: defAddress, capacity: defCapacity, features: defFeatures})
        this.props.dispatch(editRoom(this.state, roomId))
    }

    render() {
        const {name, address, capacity, features} = this.state;
        const {editRoomModal, roomId, rooms} = this.props;

        const currentRoom = roomId && rooms && rooms.data.filter(room => room.id === roomId)

        const defName = name || (currentRoom && currentRoom[0].attributes.name)
        const defAddress = address || (currentRoom && currentRoom[0].attributes.address)
        const defCapacity = capacity || (currentRoom && currentRoom[0].attributes.capacity)
        const defFeatures = features || (currentRoom && currentRoom[0].attributes.features)
        //
        return (
            <div className="modal " id="module" role="dialog" style={{
                display: editRoomModal ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close">
                                ×
                            </button>
                            <h4 className="modal-title">Edit Room</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onEditRoom}>
                                <input
                                    onChange={this.handleChange}
                                    name="name"
                                    value={defName || ""}
                                    type="text" placeholder="name"/>
                                <input
                                    onChange={this.handleChange}
                                    name="address"
                                    value={defAddress || ""}
                                    type="text" placeholder="address"/>
                                <input
                                    onChange={this.handleChange}
                                    name="capacity"
                                    value={defCapacity || ""}
                                    type="number" placeholder="capacity"/>
                                <input
                                    onChange={this.handleChange}
                                    name="features"
                                    value={defFeatures || ""}
                                    type="text" placeholder="features"/>
                                <button onClick={this.onEditRoom}>edit a room</button>
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
        editRoomModal: state.appReducers.editRoomModal,
        roomId: state.appReducers.roomId,
        rooms: state.api.rooms,
    }
}

export default connect(mapStateToProps)(EditRoomModal);
