import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createModule, closeCreateModal} from "../../store"
import {required, minLength} from "../../validate"

class CreateModule extends Component {
    constructor() {
        super();

        this.state = {
            code: "",
            name: "",
            semester: "",
            errors: {}
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    onCloseModal = () => {
        this.props.dispatch(closeCreateModal())
    }

    onCreateModule = (e) => {
        e.preventDefault()
        let errors = {};
        const {code, name, semester} = this.state;
        const id = localStorage.getItem("userId")

        errors.name = minLength(name, 4)
        errors.code = minLength(code, 4)
        errors.semester = required(semester)

        if(errors.name === "" && errors.code === "" && errors.semester === ""){
            this.props.dispatch(createModule(this.state, id))
            errors = {}
        }
        this.setState({errors, code: "", name: "", semester: ""})

    }

    render() {
        const {code, name, semester, errors} = this.state
        const {createModal} = this.props;

        return (
            <div className="modal " id="module" role="dialog" style={{
                display: createModal ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close" >
                                ×
                            </button>
                            <h4 className="modal-title">Create a Module</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onCreateModule}>
                                <input
                                    onChange={this.handleChange}
                                    name="code"
                                    value={code}
                                    type="text" placeholder="code"/>
                                <div className="error-msg">{errors.code}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="name"
                                    value={name}
                                    type="text" placeholder="name"/>
                                <div className="error-msg">{errors.name}</div>
                                <select name="semester" value={semester} onChange={this.handleChange}>
                                    <option >Select Semester</option>
                                    <option value="WS18/19">Wintersemester 18/19</option>
                                    <option value="SS19">Summersemester 19</option>
                                    <option value="WS19/20">Wintersemester 19/20</option>
                                </select>
                                <div className="error-msg">{errors.semester}</div>
                                <button onClick={this.onCreateModule}>create</button>
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
        createModal: state.appReducers.createModal,
    }
}

export default connect(mapStateToProps)(CreateModule);
