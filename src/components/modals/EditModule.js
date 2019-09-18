import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeEditModal, editModule} from "../../store"
// import {readEndpoint} from "redux-json-api";

class EditModule extends Component {
    constructor() {
        super();

        this.state = {
            code: "",
            name: "",
            semester: ""
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    onCloseModal = () => {
        this.props.dispatch(closeEditModal())
    }

    onEditModule = (e) => {
        e.preventDefault()
        const {code, name, semester} = this.state;
        const { modules, moduleId} = this.props;
        const module = modules && modules.data.filter(module => module.id === moduleId)
        const defCode = code || (module && module[0] && module[0].attributes.code)
        const defName = name || (module && module[0] && module[0].attributes.name)
        const defSemester = semester || (module && module[0] && module[0].attributes.semester)
        this.setState({code: defCode, name: defName, semester:defSemester})
        this.props.dispatch(editModule(this.state, moduleId))
    }

    render() {
        const {code, name, semester} = this.state;
        const {editModal, modules, moduleId} = this.props;
        const module = modules && modules.data.filter(module => module.id === moduleId)

        const defCode = code || (module && module[0] && module[0].attributes.code)
        const defName = name || (module && module[0] && module[0].attributes.name)
        const defSemester = semester || (module && module[0] && module[0].attributes.semester)

        return (
            <div className="modal" id="module" role="dialog" style={{
                display: editModal ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close">×</button>
                            <h4 className="modal-title">Edit Module</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onCreateModule}>
                                <input
                                    onChange={this.handleChange}
                                    name="code"
                                    value={defCode || ""}
                                    type="text" placeholder="code"/>
                                <input
                                    onChange={this.handleChange}
                                    name="name"
                                    value={defName || ""}
                                    type="text" placeholder="name"/>
                                <select name="semester" value={defSemester} onChange={this.handleChange}>
                                    <option value="SS18">SS18</option>
                                    <option value="WS18/19">WS18/19</option>
                                    <option value="SS19">SS19</option>
                                    <option value="WS19/20">WS19/20</option>
                                </select>
                                <button onClick={this.onEditModule}>edit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.onCloseModal} type="button" className="btn btn-default">
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
        editModal: state.appReducers.editModal,
        moduleId: state.appReducers.moduleId,
        modules: state.api.modules,
    }
}

export default connect(mapStateToProps)(EditModule);
