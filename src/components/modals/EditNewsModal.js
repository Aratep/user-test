import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeEditNewsModal, editNews} from "../../store"
import {readEndpoint} from "redux-json-api";
import {minLength, required} from "../../validate";

class EditNewsModal extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            date: "",
            text: "",
            errors: {}
        }
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('news'))
        setTimeout(() => this.setDefaultValues(), 1000)
    }

    setDefaultValues = () => {
        const {currentNews} = this.props;
        const {title, text} = this.state;
        const defTitle = title || (currentNews && currentNews.length > 0 && currentNews[0].attributes.title)
        const defText = text || (currentNews && currentNews.length > 0 && currentNews[0].attributes.text)

        let dateNow = new Date();
        let date = dateNow.toISOString();
        this.setState({title: defTitle, text: defText, date})
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
        this.props.dispatch(closeEditNewsModal())
    }

    onEditNews = (e) => {
        e.preventDefault()
        const {currentNews, dispatch, newsId} = this.props;
        const {title, text} = this.state;

        const defTitle = title || (currentNews && currentNews.length > 0 && currentNews[0].attributes.title)
        const defText = text || (currentNews && currentNews.length > 0 && currentNews[0].attributes.text)
        let dateNow = new Date();
        let date = dateNow.toISOString();
        this.setState({title: defTitle, text: defText, date})

        let errors = {};
        errors.title = minLength(title, 4)
        errors.text = required(text)

        if(errors.title === "" && errors.text === ""  ){
            dispatch(editNews(this.state, newsId))
            errors = {}
        }
        this.setState({errors})

    }

    render() {
        const {title, text, errors} = this.state;
        const {editNewsModal, currentNews} = this.props;
        const defTitle = title || (currentNews && currentNews.length > 0 && currentNews[0].attributes.title)
        const defText = text || (currentNews && currentNews.length > 0 && currentNews[0].attributes.text)

        return (
            <div className="modal " id="module" role="dialog" style={{
                display: editNewsModal ? "block" : "none"
            }}>
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={this.onCloseModal} type="button" className="close">
                                ×
                            </button>
                            <h4 className="modal-title">Edit News</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.onEditNews}>
                                <input
                                    onChange={this.handleChange}
                                    name="title"
                                    value={defTitle || ""}
                                    type="text" placeholder="title"/>
                                <div className="error-msg">{errors.title}</div>
                                <textarea
                                    onChange={this.handleChange}
                                    name="text"
                                    value={defText || ""}
                                    placeholder="text"/>
                                <div style={{marginTop : "0"}} className="error-msg">{errors.text}</div>
                                <button onClick={this.onEditNews}>edit news</button>
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
        editNewsModal: state.appReducers.editNewsModal,
        currentNews: state.appReducers.currentNews,
        news: state.appReducers.news,
    }
}

export default connect(mapStateToProps)(EditNewsModal);
