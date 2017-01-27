"use strict"

import React, {Component} from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import Gotop from '../components/gotop'
import {apiUrl} from '../config/index'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Store from '../store/index'
import Actions from '../actions/index'

import {handle} from '../tools/index'

class App extends Component {

    render() {
        let {user} = this.props;
        return (
            <div >
                <Header user = {user}/>
                { this.props.children }
                <Gotop/>
                <Footer/>
            </div>
        );
    }
}

//export default App;

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)