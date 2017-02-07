import React, {Component} from 'react';

class Avatar extends Component {
    constructor() {
        super()
    }
    render() {
        let { avatarUrl, style } = this.props
        avatarUrl = avatarUrl || 'data:image/jpeg;base64,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'

        
        return (
            <div className="avatar" style={style}>
                <img src = {avatarUrl} className="comment-avatar" />
            </div>
        );
    }
}

export default Avatar;