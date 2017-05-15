import React, {Component} from 'react';

class Admin extends Component {

    constructor(props, context) {
        super(props, context)
        this.loadData = this.loadData.bind(this)
        this.state = {
            data: []
        }
    }
    loadData() {

    }
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
               <div className="admin-title">club 后台管理</div>

            </div>
        );
    }
}

export default Admin;