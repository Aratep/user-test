import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeEditContentModal, editContent} from "../../store"
import {minLength, required} from "../../validate";

class EditContentModal extends Component {
    constructor() {
        super();

        this.state = {
            order: "",
            content: "",
            title: "",
            errors: {}
        }
    }

    componentWillMount() {
        setTimeout(() => this.setDefaultValues(), 500)
    }

    setDefaultValues = () => {
        const {currentContent} = this.props;
        const {title, content, order} = this.state;
        const defTitle = title || (currentContent && currentContent.length > 0 && currentContent[0].attributes.title)
        const defContent = content || (currentContent && currentContent.length > 0 && currentContent[0].attributes.content)
        const defOrder = order || (currentContent && currentContent.length > 0 && currentContent[0].attributes.order)

        this.setState({title: defTitle, content: defContent, order: defOrder})

    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value})
    }

    onCloseModal = () => {
        this.props.dispatch(closeEditContentModal())
    }

    onEditContent = (e) => {
        e.preventDefault()
        const {currentContent, dispatch, contId} = this.props;
        const {title, content, order} = this.state;
        const defTitle = title || (currentContent && currentContent.length > 0 && currentContent[0].attributes.title)
        const defContent = content || (currentContent && currentContent.length > 0 && currentContent[0].attributes.content)
        const defOrder = order || (currentContent && currentContent.length > 0 && currentContent[0].attributes.order)

        this.setState({title: defTitle, content: defContent, order: defOrder})

        let errors = {};
        errors.title = minLength(title, 4)
        errors.content = required(content)
        errors.order = required(order)

        if(errors.title === "" && errors.content === "" && errors.order === ""){
            dispatch(editContent(this.state, contId))
            errors = {}
        }
        this.setState({errors})
    }

    render() {
        const {order, content, title, errors} = this.state;
        const {editContentModal, currentContent} = this.props;

        const defTitle = title || (currentContent && currentContent.length > 0 && currentContent[0].attributes.title)
        const defContent = content || (currentContent && currentContent.length > 0 && currentContent[0].attributes.content)
        const defOrder = order || (currentContent && currentContent.length > 0 && currentContent[0].attributes.order)

        return (
            <div className="modal " id="module" role="dialog" style={{
                display: editContentModal ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close">
                                ×
                            </button>
                            <h4 className="modal-title">Edit Content</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onEditContent}>
                                <input
                                    onChange={this.handleChange}
                                    name="title"
                                    value={defTitle || ""}
                                    type="text" placeholder="title"/>
                                <div className="error-msg">{errors.title}</div>
                                <textarea
                                    onChange={this.handleChange}
                                    name="content"
                                    value={defContent || ""}
                                    placeholder="content"/>
                                <div style={{marginTop : "0"}} className="error-msg">{errors.content}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="order"
                                    value={defOrder || ""}
                                    type="number" placeholder="order number"/>
                                <div className="error-msg">{errors.order}</div>
                                <button onClick={this.onEditContent}>add new content</button>
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
        editContentModal: state.appReducers.editContentModal,
        currentContent: state.appReducers.currentContent,
    }
}

export default connect(mapStateToProps)(EditContentModal);
