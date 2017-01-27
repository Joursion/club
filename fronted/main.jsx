"use strict"

import React, { Component, ProTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Store from './store'

import './antd.css';
import './style/sclub.scss';

//pages
import App from './container/app'
import Index from './container/index';
import Item from './container/item'
import Ask from './container/ask'
import Job from './container/job'
import Signin from './container/signin'
import Signup from './container/signup'
import Activity from './container/activity'
import About from './container/about'
import Message from './container/message'
import User from './container/user'
//page
import ItemPage from './container/item_page'
import AskPage from './container/ask_page'
import ActivityPage from './container/activity_page'
import JobPage from './container/job_page'
//import Touxiang from './container/touxiang'
import CreateItem from './container/create_item'
import CreateActivity from './container/create_activity'
import CreateAsk from './container/create_ask'
import Reset from './container/reset'

ReactDOM.render(
      <Provider store = { Store } >
        <Router history = { browserHistory } >
            <Route path = '/' component = {App} >
                <IndexRoute component = { Index } />
                <Route path = "item" component = { Item } />
                <Route path = "activity" component = { Activity }/>
                <Route path = "message" component = { Message }/>
                <Route path = "job" component = { Job } />
                <Route path = "about" component = { About } />
                <Route path = "signin" component = { Signin } />
                <Route path = 'signup' component = {Signup} />
                <Route path = "ask" component = { Ask }/>
                //<Route path = "id" component = { User } />
                <Route path = '/item/:id' component = {ItemPage} />
                <Route path = '/activity/:id' component = {ActivityPage} />
                <Route path = '/ask/:id' component = {AskPage} />
                <Route path = '/job/:id' component = {JobPage} />
                <Route path = '/create_item' component = {CreateItem} />
                <Route path = '/create_activity' component = {CreateActivity} />
                <Route path = '/create_ask' component = {CreateAsk} />
                <Route path = '/reset' component = {Reset} />
                <Route path = '/user' component = {User} />
            </Route>
        </Router>
    </Provider> 
    , document.querySelector(".root")
);
