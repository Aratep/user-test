import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {
    createResource,
    updateResource,
    deleteResource,
    reducer as api,
    setAxiosConfig, readEndpoint,
} from 'redux-json-api';

import history from "./history"

//INITIAL STATE
const initialState = {
    appReducers: {
        message: "",
        createModal: false,
        editModal: false,
        moduleId: null,
        module: {},
        addNews: false,
        addSessions: false,
        addContents: false,
        editNewsModal: false,
        currentNews: [],
        currentSession: [],
        currentContent: [],
        addRoomModal: false,
        editRoomModal: false,
        editSessionModal: false,
        editContentModal: false,
        roomId: null,
        takes: [],
        currentUser: [],
        signUpError: "",
        isError: false
    }
}

//ACTION TYPES
export const actionTypes = {
    SET_SUCCESS_MESSAGE: "SET_SUCCESS_MESSAGE",
    REMOVE_SUCCESS_MESSAGE: "REMOVE_SUCCESS_MESSAGE",
    OPEN_EDIT_MODAL: "OPEN_EDIT_MODAL",
    OPEN_CREATE_MODAL: "OPEN_CREATE_MODAL",
    CLOSE_EDIT_MODAL: "CLOSE_EDIT_MODAL",
    CLOSE_CREATE_MODAL: "CLOSE_CREATE_MODAL",
    SET_MODULE_ID: "SET_MODULE_ID",
    SET_MODULE: "SET_MODULE",
    OPEN_ADD_NEWS_MODAL: "OPEN_ADD_NEWS_MODAL",
    CLOSE_ADD_NEWS_MODAL: "CLOSE_ADD_NEWS_MODAL",
    OPEN_ADD_SESSIONS_MODAL: "OPEN_ADD_SESSIONS_MODAL",
    CLOSE_ADD_SESSIONS_MODAL: "CLOSE_ADD_SESSIONS_MODAL",
    OPEN_ADD_CONTENTS_MODAL: "OPEN_ADD_CONTENTS_MODAL",
    CLOSE_ADD_CONTENTS_MODAL: "CLOSE_ADD_CONTENTS_MODAL",
    OPEN_EDIT_NEWS_MODAL: "OPEN_EDIT_NEWS_MODAL",
    CLOSE_EDIT_NEWS_MODAL: "CLOSE_EDIT_NEWS_MODAL",
    SET_CURRENT_NEWS: "SET_CURRENT_NEWS",
    SET_CURRENT_SESSION: "SET_CURRENT_SESSION",
    SET_CURRENT_CONTENT: "SET_CURRENT_CONTENT",
    OPEN_ADD_ROOM_MODAL: "OPEN_ADD_ROOM_MODAL",
    CLOSE_ADD_ROOM_MODAL: "CLOSE_ADD_ROOM_MODAL",
    OPEN_EDIT_ROOM_MODAL: "OPEN_EDIT_ROOM_MODAL",
    CLOSE_EDIT_ROOM_MODAL: "CLOSE_EDIT_ROOM_MODAL",
    OPEN_EDIT_SESSION_MODAL: "OPEN_EDIT_SESSION_MODAL",
    CLOSE_EDIT_SESSION_MODAL: "CLOSE_EDIT_SESSION_MODAL",
    OPEN_EDIT_CONTENT_MODAL: "OPEN_EDIT_CONTENT_MODAL",
    CLOSE_EDIT_CONTENT_MODAL: "CLOSE_EDIT_CONTENT_MODAL",
    SET_ROOM_ID: "SET_ROOM_ID",
}

// REDUCERS
const appReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SUCCESS_MESSAGE:
            return Object.assign({}, state, {
                message: action.message
            })
        case actionTypes.REMOVE_SUCCESS_MESSAGE:
            return Object.assign({}, state, {
                message: ""
            })
        case actionTypes.OPEN_EDIT_MODAL:
            return Object.assign({}, state, {
                editModal: true
            })
        case actionTypes.CLOSE_EDIT_MODAL:
            return Object.assign({}, state, {
                editModal: false
            })
        case actionTypes.OPEN_CREATE_MODAL:
            return Object.assign({}, state, {
                createModal: true
            })
        case actionTypes.CLOSE_CREATE_MODAL:
            return Object.assign({}, state, {
                createModal: false
            })
        case actionTypes.SET_MODULE_ID:
            return Object.assign({}, state, {
                moduleId: action.id
            })
        case actionTypes.SET_MODULE:
            return Object.assign({}, state, {
                module: action.module
            })
        case actionTypes.OPEN_ADD_NEWS_MODAL:
            return Object.assign({}, state, {
                addNews: true
            })
        case actionTypes.CLOSE_ADD_NEWS_MODAL:
            return Object.assign({}, state, {
                addNews: false
            })
        case actionTypes.OPEN_ADD_SESSIONS_MODAL:
            return Object.assign({}, state, {
                addSessions: true
            })
        case actionTypes.CLOSE_ADD_SESSIONS_MODAL:
            return Object.assign({}, state, {
                addSessions: false
            })
        case actionTypes.OPEN_ADD_CONTENTS_MODAL:
            return Object.assign({}, state, {
                addContents: true
            })
        case actionTypes.CLOSE_ADD_CONTENTS_MODAL:
            return Object.assign({}, state, {
                addContents: false
            })
        case actionTypes.OPEN_EDIT_NEWS_MODAL:
            return Object.assign({}, state, {
                editNewsModal: true
            })
        case actionTypes.CLOSE_EDIT_NEWS_MODAL:
            return Object.assign({}, state, {
                editNewsModal: false
            })
        case actionTypes.SET_CURRENT_NEWS:
            return Object.assign({}, state, {
                currentNews: action.news
            })
        case actionTypes.SET_CURRENT_SESSION:
            return Object.assign({}, state, {
                currentSession: action.session
            })
        case actionTypes.SET_CURRENT_CONTENT:
            return Object.assign({}, state, {
                currentContent: action.content
            })
        case actionTypes.OPEN_ADD_ROOM_MODAL:
            return Object.assign({}, state, {
                addRoomModal: true
            })
        case actionTypes.CLOSE_ADD_ROOM_MODAL:
            return Object.assign({}, state, {
                addRoomModal: false
            })
        case actionTypes.OPEN_EDIT_ROOM_MODAL:
            return Object.assign({}, state, {
                editRoomModal: true
            })
        case actionTypes.CLOSE_EDIT_ROOM_MODAL:
            return Object.assign({}, state, {
                editRoomModal: false
            })
        case actionTypes.OPEN_EDIT_SESSION_MODAL:
            return Object.assign({}, state, {
                editSessionModal: true
            })
        case actionTypes.CLOSE_EDIT_SESSION_MODAL:
            return Object.assign({}, state, {
                editSessionModal: false
            })
        case actionTypes.OPEN_EDIT_CONTENT_MODAL:
            return Object.assign({}, state, {
                editContentModal: true
            })
        case actionTypes.CLOSE_EDIT_CONTENT_MODAL:
            return Object.assign({}, state, {
                editContentModal: false
            })
        case actionTypes.SET_ROOM_ID:
            return Object.assign({}, state, {
                roomId: action.id
            })
        //for signup errors
        case "API_CREATE_FAILED": //API_UPDATE_FAILED
            return Object.assign({}, state, {
                signUpError: "This e-mail address is already in use for a user"
            })
        case "API_UPDATE_FAILED": //API_UPDATE_FAILED
            return Object.assign({}, state, {
                signUpError: "This e-mail address is already in use for a user"
            })
        default:
            return state
    }
}

export const setSuccessMessage = (message) => {
    return {type: actionTypes.SET_SUCCESS_MESSAGE, message};
}

export const removeSuccessMessage = () => {
    return {type: actionTypes.REMOVE_SUCCESS_MESSAGE};
}

export const openEditModal = () => {
    return {type: actionTypes.OPEN_EDIT_MODAL};
}

export const closeEditModal = () => {
    return {type: actionTypes.CLOSE_EDIT_MODAL};
}

export const openCreateModal = () => {
    return {type: actionTypes.OPEN_CREATE_MODAL};
}

export const closeCreateModal = () => {
    return {type: actionTypes.CLOSE_CREATE_MODAL};
}

export const setModuleId = (id) => {
    return {type: actionTypes.SET_MODULE_ID, id};
}

export const setRoomId = (id) => {
    return {type: actionTypes.SET_ROOM_ID, id};
}

export const openAddNewsModal = () => {
    return {type: actionTypes.OPEN_ADD_NEWS_MODAL};
}

export const closeAddNewsModal = () => {
    return {type: actionTypes.CLOSE_ADD_NEWS_MODAL};
}

export const openAddSessionsModal = () => {
    return {type: actionTypes.OPEN_ADD_SESSIONS_MODAL};
}

export const closeAddSessionsModal = () => {
    return {type: actionTypes.CLOSE_ADD_SESSIONS_MODAL};
}

export const openAddContentsModal = () => {
    return {type: actionTypes.OPEN_ADD_CONTENTS_MODAL};
}

export const closeAddContentsModal = () => {
    return {type: actionTypes.CLOSE_ADD_CONTENTS_MODAL};
}

export const openEditNewsModal = () => {
    return {type: actionTypes.OPEN_EDIT_NEWS_MODAL};
}

export const closeEditNewsModal = () => {
    return {type: actionTypes.CLOSE_EDIT_NEWS_MODAL};
}

export const setCurrentNews = (news) => {
    return {type: actionTypes.SET_CURRENT_NEWS, news};
}

export const setCurrentContent = (content) => {
    return {type: actionTypes.SET_CURRENT_CONTENT, content};
}

export const setCurrentSession = (session) => {
    return {type: actionTypes.SET_CURRENT_SESSION, session};
}

export const openAddRoomModal = () => {
    return {type: actionTypes.OPEN_ADD_ROOM_MODAL};
}

export const closeAddRoomModal = () => {
    return {type: actionTypes.CLOSE_ADD_ROOM_MODAL};
}

export const openEditRoomModal = () => {
    return {type: actionTypes.OPEN_EDIT_ROOM_MODAL};
}

export const closeEditRoomModal = () => {
    return {type: actionTypes.CLOSE_EDIT_ROOM_MODAL};
}

export const openEditSessionModal = () => {
    return {type: actionTypes.OPEN_EDIT_SESSION_MODAL};
}

export const closeEditSessionModal = () => {
    return {type: actionTypes.CLOSE_EDIT_SESSION_MODAL};
}

export const openEditContentModal = () => {
    return {type: actionTypes.OPEN_EDIT_CONTENT_MODAL};
}

export const closeEditContentModal = () => {
    return {type: actionTypes.CLOSE_EDIT_CONTENT_MODAL};
}

export const login = (email, password) => dispatch => {
    new Promise((resolve, reject) => {
        resolve(dispatch(readEndpoint(`users?email=${email}&password=${password}`)));
    }).then(
        () => history.push("/"),
        error => alert(error)
    );
}

export const removeCurrentUser = () => (dispatch, getState) => {
    const state = getState()
    if (state.api.users) {
        state.api.users = []
    }
}


export const signup = (state) => dispatch => {
    const {email, password, firstName, lastName, role} = state;

    dispatch(createResource({
        type: 'users',
        attributes: {role, email, password, "first-name": firstName, "last-name": lastName},
        relationships: {
            sessions: {
                data: {
                    type: 'sessions',
                    id: 1
                }
            }
        }
    })).then((data) => {
        localStorage.setItem("currentUser", JSON.stringify(data))
        localStorage.setItem("userId", data.data.id)
        localStorage.setItem("role", data.data.attributes.role)

        dispatch(setSuccessMessage("Your account created successfully!"));
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
        history.push('/');
    })
        .catch(err => console.log(err));
}

export const updateProfile = (state, id) => dispatch => {
    const {email, firstName, lastName, password} = state;

    dispatch(updateResource({
        type: 'users',
        id,
        attributes: {email, "first-name": firstName, "last-name": lastName, password}
    })).then((data) => {
        localStorage.setItem("currentUser", JSON.stringify(data))
        dispatch(setSuccessMessage("Your profile was updated successfully!"))
        history.push("/")
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    })
        .catch(err => console.log(err));
}

export const createModule = (state, id) => dispatch => {
    const {code, name, semester} = state;

    dispatch(createResource({
        type: 'modules',
        attributes: {code, name, semester},
        relationships: {
            creator: {
                data: {
                    type: 'users',
                    id
                }
            },
            teacher: {
                data: {
                    type: 'users',
                    id
                }
            }
        }
    })).then((data) => {
        dispatch(setSuccessMessage("Module was created successfully!"))
        dispatch(closeCreateModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const editModule = (state, id) => dispatch => {
    const {code, name, semester} = state;

    dispatch(updateResource({
        type: 'modules',
        id,
        attributes: {code, name, semester},
    })).then((data) => {
        dispatch(setSuccessMessage("Module was updated successfully!"))
        dispatch(closeEditModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const removeModule = (id) => dispatch => {
    new Promise((resolve, reject) => {
        resolve(
            dispatch(deleteResource({
                type: 'modules',
                id,
            }))
        );
    }).then(
        result => {
            dispatch(setSuccessMessage("Module deleted!"))
            setTimeout(() => dispatch(removeSuccessMessage()), 5000)
        },
        error => alert(error)
    );
}

export const subscribe = (userId, moduleId) => dispatch => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    dispatch(updateResource({
        type: 'modules',
        id: moduleId,
        relationships: {
            students: {
                data: [{
                    type: 'users',
                    id: userId
                }]
            }
        }
    })).then((data) => {
        const take = {type: "modules", id: data.data.id}
        const rel = currentUser.data.relationships || currentUser.data[0].relationships
        rel.takes.data.push(take)
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        history.push("/my-modules")
        dispatch(setSuccessMessage("You've subscribed successfully!"))
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const addNews = (state, id) => dispatch => {
    const {title, date, text} = state;

    dispatch(createResource({
        type: 'news',
        attributes: {title, date, text},
        relationships: {
            module: {
                data: {
                    type: "modules",
                    id
                }
            }
        }
    })).then(() => {
        dispatch(setSuccessMessage("You've added news successfully!"))
        dispatch(closeAddNewsModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const editNews = (state, id) => dispatch => {
    const {title, date, text} = state;
    dispatch(updateResource({
        type: 'news',
        id,
        attributes: {title, date, text},
    })).then(() => {
        dispatch(setSuccessMessage("You've updated news successfully!"))
        dispatch(closeEditNewsModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const removeNews = (id) => dispatch => {
    dispatch(deleteResource({
        type: 'news',
        id,
    }))
    history.push("/")
    dispatch(setSuccessMessage("News deleted!"))
    setTimeout(() => dispatch(removeSuccessMessage()), 5000)
}

export const addNewContent = (state, id) => dispatch => {
    const {title, content, order, parentID} = state;

    dispatch(createResource({
        type: 'contents',
        attributes: {title, content, order},
        relationships: {
            module: {
                data: {
                    type: "modules",
                    id
                }
            },
            // parent: {
            //     data: {
            //         type: "contents",
            //         id: parentID
            //     }
            // }
        }
    })).then(() => {
        dispatch(setSuccessMessage("You've added a new content successfully!"))
        dispatch(closeAddContentsModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const editContent = (state, id) => dispatch => {
    const {title, content, order} = state;

    dispatch(updateResource({
        type: 'contents',
        id,
        attributes: {title, content, order},
    })).then(() => {
        dispatch(setSuccessMessage("Content was updated successfully!"))
        dispatch(closeEditContentModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const removeContent = (id) => dispatch => {
    console.log(id)
    dispatch(deleteResource({
        type: 'contents',
        id,
    }))
    history.push("/")
    dispatch(setSuccessMessage("Content deleted!"))
    setTimeout(() => dispatch(removeSuccessMessage()), 5000)
}

export const addNewRoom = (state, id) => dispatch => {
    const {name, address, capacity, features} = state;

    dispatch(createResource({
        type: 'rooms',
        attributes: {name, address, capacity, features},
        relationships: {
            module: {
                data: {
                    type: "modules",
                    id
                }
            }
        }
    })).then(() => {
        dispatch(setSuccessMessage("You've added a new room successfully!"))
        dispatch(closeAddRoomModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const editRoom = (state, id) => dispatch => {
    const {name, address, capacity, features} = state;

    dispatch(updateResource({
        type: 'rooms',
        id,
        attributes: {name, address, capacity, features},
    })).then(() => {
        dispatch(setSuccessMessage("You've updated room successfully!"))
        dispatch(closeEditRoomModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const removeRoom = (id) => dispatch => {
    dispatch(deleteResource({
        type: 'rooms',
        id,
    }))
}

export const addNewSeesion = (state, moduleId) => dispatch => {
    const {title, keywords, date, roomId} = state;
    const d = date+":00"

    dispatch(createResource({
        type: 'sessions',
        attributes: {title, keywords, date:d},
        relationships: {
            module: {
                data: {
                    type: "modules",
                    id: moduleId
                }
            },
            room: {
                data: {
                    type: "rooms",
                    id: roomId
                }
            }
        }
    })).then((data) => {
        dispatch(setSuccessMessage("You've added a new session successfully!"))
        dispatch(closeAddSessionsModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const editSession = (state, id) => dispatch => {
    const {title, keywords, date, roomId} = state;
    dispatch(updateResource({
        type: 'sessions',
        id,
        attributes: {title, keywords, date},
        relationships: {
            room: {
                data: {
                    type: "rooms",
                    id: roomId
                }
            }
        }
    })).then(() => {
        dispatch(setSuccessMessage("Session was updated successfully!"))
        dispatch(closeEditSessionModal());
        setTimeout(() => dispatch(removeSuccessMessage()), 5000)
    });
}

export const removeSession = (id) => dispatch => {
    dispatch(deleteResource({
        type: 'sessions',
        id,
    }))
    history.push("/")
}

const reducers = combineReducers({
    api,
    appReducers
});

export const store = createStore(
    reducers,
    initialState, composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.dispatch(setAxiosConfig({
    baseURL: 'https://mht.uzi.uni-halle.de/client-seitige-web-anwendungen/api/angzz'
}));