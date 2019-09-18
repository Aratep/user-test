import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeAddContentsModal, addNewContent} from "../../store"
import {minLength, required} from "../../validate";
import {readEndpoint} from "redux-json-api";

class AddContents extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            content: "",
            order: "",
            parentID: "",
            errors: {}
        }
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('contents'));
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }

    onCloseModal = () => {
        this.props.dispatch(closeAddContentsModal())
    }

    onAddContents = (e) => {
        e.preventDefault()
        const {title, content, order} = this.state;
        let errors = {};
        errors.title = minLength(title, 4)
        errors.content = required(content)
        errors.order = required(order)

        if(errors.title === "" && errors.content === "" && errors.order === ""){
            this.props.dispatch(addNewContent(this.state, this.props.moduleId))
            errors = {}
        }
        this.setState({errors})
    }

    render() {
        const {title, content, order, parentID, errors} = this.state;
        const {addContents, contents, moduleId} = this.props;
        const moduleContents = contents && contents.data.filter(c => c.relationships.module.data.id === moduleId)


        return (
            <div className="modal " id="module" role="dialog" style={{
                display: addContents ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close" >
                                ×
                            </button>
                            <h4 className="modal-title">Add New Content</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onAddContents}>
                                <input
                                    onChange={this.handleChange}
                                    name="title"
                                    value={title}
                                    type="text" placeholder="title"/>
                                <div className="error-msg">{errors.title}</div>
                                <textarea
                                    onChange={this.handleChange}
                                    name="content"
                                    value={content}
                                    placeholder="content"/>
                                <div style={{marginTop : "0"}} className="error-msg">{errors.content}</div>
                                <input
                                    onChange={this.handleChange}
                                    name="order"
                                    value={order}
                                    type="number" placeholder="order number"/>
                                <div className="error-msg">{errors.order}</div>
                                {/*{*/}
                                    {/*moduleContents && moduleContents.length > 0 && <select name="parentID" value={parentID} onChange={this.handleChange}>*/}
                                        {/*<option >Parent Content</option>*/}
                                        {/*{*/}
                                            {/*moduleContents && moduleContents.map(c => {*/}
                                                {/*return <option value={c.id} key={c.id}>*/}
                                                    {/*{c.id}*/}
                                                {/*</option>*/}
                                            {/*})*/}
                                        {/*}*/}
                                    {/*</select>*/}
                                {/*}*/}

                                <button onClick={this.onAddContents}>add new content</button>
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
        addContents: state.appReducers.addContents,
        contents: state.api.contents,
    }
}

export default connect(mapStateToProps)(AddContents);
