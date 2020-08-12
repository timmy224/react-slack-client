import React, { Component } from "react";
import PropTypes from "prop-types";


class Message extends Component {
    render() {
        const {sender, time, text} = this.props;
        return (
            <div className="message">
                <div className="message-username">
                    {sender} ({time}):
          </div>
                <div className="message-text">{text}</div>
            </div>
        );
    }
}

Message.propTypes = {
    sender: PropTypes.string,
    time: PropTypes.string,
    text: PropTypes.string,
}

export default Message;
