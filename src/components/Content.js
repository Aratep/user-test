import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readEndpoint} from "redux-json-api";

import SideNav from "./SideNav";
import EditContentModal from "./modals/EditContentModal";
import {openEditContentModal, setCurrentContent, removeContent} from "../store"

class Content extends Component {
    constructor() {
        super();

        this.state = {}
    }

    componentWillMount() {
        this.props.dispatch(readEndpoint('contents'))
    }

    onOpenEditContentModal = () => {
        this.props.dispatch(openEditContentModal())
    }

    onRemoveContent = (id) => {
        if (window.confirm("Remove this content?"))
            this.props.dispatch(removeContent(id))
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {contents, match} = this.props
        const currentContent = contents && contents.data.filter(c => c.id === match.params.id)
        this.props.dispatch(setCurrentContent(currentContent))
        const role = localStorage.getItem("role")

        return (
            <div className="container-fluid">
                <EditContentModal contId={match.params.id}/>
                <div className="row content">
                    <SideNav/>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <div className="prof-heading">
                                <h3>Content</h3>
                                {!currentContent && <div className="prof-heading">Loading</div>}
                            </div>
                            <span className="pointer" onClick={this.goBack}>Go Back</span>
                            {
                                currentContent && <div style={{marginTop: "20px"}}>
                                    <table style={{width: "43%"}} className="table table-hover">
                                        <tbody>

                                        <tr>
                                            <td>Title</td>
                                            <td>{currentContent[0].attributes.title}</td>
                                        </tr>
                                        <tr>
                                            <td>Content</td>
                                            <td>{currentContent[0].attributes.content}</td>
                                        </tr>
                                        <tr>
                                            <td>order</td>
                                            <td>{currentContent[0].attributes.order}</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                    {/*<div>sub contents</div>*/}
                                    {/*{*/}
                                    {/*currentContent && currentContent[0].relationships.children.data.length > 0 && */}
                                    {/*currentContent[0].relationships.children.data.map()*/}
                                    {/*}*/}
                                    {
                                        role === "teacher" && <div style={{width: "40%"}}>
                                            <button
                                                onClick={this.onOpenEditContentModal}
                                                className={`btn-success glyphicon glyphicon-pencil`}/>
                                            <button
                                                onClick={this.onRemoveContent.bind(this, currentContent[0].id)}
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
        contents: state.api.contents,
    }
}

export default connect(mapStateToProps)(Content);
