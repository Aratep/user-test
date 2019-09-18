import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {PrivateRoute} from './components/HOC/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Module from './components/Module';
import News from './components/News';
import Rooms from './components/Rooms';
import Session from './components/Session';
import Content from './components/Content';
import MyModules from './components/MyModules';

export const AppRouting = () => (
    <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/content/:id" component={Content}/>
        <PrivateRoute path="/session/:id" component={Session}/>
        <PrivateRoute path="/module/:id" component={Module}/>
        <PrivateRoute path="/news/:id" component={News}/>
        <PrivateRoute path="/rooms" component={Rooms}/>
        <PrivateRoute path="/my-modules" component={MyModules}/>
        <PrivateRoute path="/" component={HomePage}/>
    </Switch>
)