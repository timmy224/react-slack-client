import React, { Component } from "react";
import PropTypes from "prop-types";


class Message extends Component {
    render() {
        const { sender, time, text } = this.props;
        return (
            <div data-test="MessageComponent">
                <div className="message" data-test="message">
                    <div className="message-username" data-test="sender">{sender}</div>
                    <div className="message-dt" data-test="dt">{time}</div>
                    <div className="message-text" data-test="text">{text}</div>
                </div>
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
