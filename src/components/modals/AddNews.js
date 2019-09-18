import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeAddNewsModal, addNews} from "../../store"
import {minLength, required} from "../../validate";

class AddNews extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            date: "",
            text: "",
            errors: {}
        }
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
        this.props.dispatch(closeAddNewsModal())
    }

    onAddNews = (e) => {
        e.preventDefault()
        const {title, text} = this.state;
        let errors = {}
        errors.title = minLength(title, 4)
        errors.text = required(text)

        if(errors.title === "" && errors.text === "" ){
            this.props.dispatch(addNews(this.state, this.props.moduleId))
            errors = {}
        }
        this.setState({errors})

    }

    render() {
        const {title, text, errors} = this.state;
        const {addNews} = this.props;

        return (
            <div className="modal " id="module" role="dialog" style={{
                display: addNews ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close" >
                                ×
                            </button>
                            <h4 className="modal-title">Add News</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" >
                                <input
                                    onChange={this.handleChange}
                                    name="title"
                                    value={title}
                                    type="text" placeholder="title"/>
                                <div className="error-msg">{errors.title}</div>

                                <textarea
                                    onChange={this.handleChange}
                                    name="text"
                                    value={text}
                                    placeholder="text"/>
                                <div style={{marginTop : "0"}} className="error-msg">{errors.text}</div>
                                <button onClick={this.onAddNews}>add news</button>
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
        addNews: state.appReducers.addNews,
    }
}

export default connect(mapStateToProps)(AddNews);
