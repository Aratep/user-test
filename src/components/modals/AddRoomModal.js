import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeAddRoomModal, addNewRoom} from "../../store"
import {minLength, required} from "../../validate";

class AddRoom extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            address:  "",
            capacity: "",
            features: "",
            errors: {}
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value})
    }

    onAddRoom = (e) => {
        e.preventDefault()
        const {name, address, capacity, features} = this.state;
        let errors = {};
        errors.name = minLength(name, 4)
        errors.address = minLength(address, 4)
        errors.capacity = required(capacity)
        errors.features = required(features)

        if(errors.name === "" && errors.address === "" && errors.capacity === "" && errors.features === ""){
            this.props.dispatch(addNewRoom(this.state))
            errors = {}
        }
        this.setState({errors})

    }

    onCloseModal = () => {
        this.props.dispatch(closeAddRoomModal())
    }

    render() {
        const {addRoomModal} = this.props;
        const {name, address, capacity, features, errors} = this.state;

        return (
            <div className="modal " id="module" role="dialog" style={{
                display: addRoomModal ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close" >
                                ×
                            </button>
                            <h4 className="modal-title">Add New Room</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onAddRoom}>
                                <input
                                    onChange={this.handleChange}
                                    name="name"
                                    value={name}
                                    type="text" placeholder="name"/>
                                <div className="error-msg">{errors.name}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="address"
                                    value={address}
                                    type="text" placeholder="address"/>
                                <div className="error-msg">{errors.address}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="capacity"
                                    value={capacity}
                                    type="number" placeholder="capacity"/>
                                <div className="error-msg">{errors.capacity}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="features"
                                    value={features}
                                    type="text" placeholder="features"/>
                                <div className="error-msg">{errors.features}</div>
                                <button onClick={this.onAddRoom}>add a room</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.onCloseModal}
                                    type="button" className="btn btn-default" >
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
        addRoomModal: state.appReducers.addRoomModal,
    }
}

export default connect(mapStateToProps)(AddRoom);
