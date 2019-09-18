import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";

import SideNav from "./SideNav"
import AddRoomModal from "./modals/AddRoomModal"
import EditRoomModal from "./modals/EditRoomModal"
import {openAddRoomModal, openEditRoomModal, setRoomId, removeRoom, setSuccessMessage, removeSuccessMessage} from "../store"

class Rooms extends Component {
    constructor() {
        super();

        this.state = {}
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('rooms'));
    }

    onOpenAddRoomModal = () => {
        this.props.dispatch(openAddRoomModal())
    }

    onOpenEditRoomModal = (id) => {
        this.props.dispatch(setRoomId(id))
        this.props.dispatch(openEditRoomModal())
    }

    onRemoveRoom = (id) => {
        const {rooms, dispatch} = this.props
        const room = rooms.data.filter(room => room.id === id)
        if(room[0].relationships.sessions.data.length > 0) {
            dispatch(setSuccessMessage("Can't remove this room"))
            setTimeout(() => dispatch(removeSuccessMessage()), 3000)
        } else {
            if (window.confirm("Remove this module?"))
                this.props.dispatch(removeRoom(id))
        }
    }

    render() {
        const role = localStorage.getItem("role")
        const {rooms} = this.props

        return (
            <div className="container-fluid">
                <AddRoomModal/>
                <EditRoomModal/>
                <div className="row content">
                    <SideNav/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <h3 className="prof-heading">All Rooms</h3>
                            {
                                role === "teacher" &&
                                <span onClick={this.onOpenAddRoomModal} className="pointer">Add a Room</span>
                            }
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Capacity</th>
                                    <th>Features</th>
                                    {
                                        role === "teacher" && <th>Edit/Delete</th>
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {rooms && rooms.data.length <= 0 && <div className="prof-heading">No Rooms</div>}
                                {
                                    rooms && rooms.data.map(room => {
                                        return <tr key={room.id}>
                                            <td>{room.id}</td>
                                            <td>{room.attributes.name}</td>
                                            <td>{room.attributes.address}</td>
                                            <td>{room.attributes.capacity}</td>
                                            <td>{room.attributes.features}</td>
                                            {
                                                role === "teacher" && <td>
                                                    <button
                                                        onClick={this.onOpenEditRoomModal.bind(this, room.id)}
                                                        className={`btn-success glyphicon glyphicon-pencil`}/>
                                                    <button
                                                        onClick={this.onRemoveRoom.bind(this, room.id)}
                                                        className={`btn-danger glyphicon glyphicon-remove `}/>
                                                </td>
                                            }

                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        rooms: state.api.rooms
    }
}

export default connect(mapStateToProps)(Rooms);
