import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";

import SideNav from "./SideNav";
import EditNewsModal from "./modals/EditNewsModal";
import {openEditNewsModal, setCurrentNews, removeNews} from "../store"

class News extends Component {
    constructor() {
        super();

        this.state = {}
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('news'))
    }

    onOpenEditNewsModal = () => {
        this.props.dispatch(openEditNewsModal())
    }

    onRemoveNews = (id) => {
        if (window.confirm("Remove this news?"))
            this.props.dispatch(removeNews(id))
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {news, match} = this.props
        const currNews = news && news.data.filter(n => n.id === match.params.id)
        const role = localStorage.getItem("role")
        this.props.dispatch(setCurrentNews(currNews))

        return (
            <div className="container-fluid">
                <EditNewsModal newsId={match.params.id}/>
                <div className="row content">
                    <SideNav/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">

                            <div className="prof-heading">
                                <h3>News</h3>
                                {!currNews && <div>loading</div>}
                            </div>
                            <span className="pointer" onClick={this.goBack}>Go Back</span>
                            {
                                currNews && <div style={{marginTop: "20px"}}>
                                    <table style={{width: "43%"}} className="table table-hover">
                                        <tbody>

                                        <tr>
                                            <td>Title</td>
                                            <td>{currNews[0].attributes.title}</td>
                                        </tr>
                                        <tr>
                                            <td>Text</td>
                                            <td>{currNews[0].attributes.text}</td>
                                        </tr>
                                        <tr>
                                            <td>Date</td>
                                            <td>{currNews[0].attributes.date}</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                    {
                                        role === "teacher" && <div style={{width: "40%"}}>
                                            <button
                                                onClick={this.onOpenEditNewsModal}
                                                className={`btn-success glyphicon glyphicon-pencil`}/>
                                            <button
                                                onClick={this.onRemoveNews.bind(this, currNews[0].id)}
                                                style={{float: "right"}}
                                                className={`btn-danger glyphicon glyphicon-remove `}/>
                                        </div>
                                    }

                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        news: state.api.news,
    }
}

export default connect(mapStateToProps)(News);
