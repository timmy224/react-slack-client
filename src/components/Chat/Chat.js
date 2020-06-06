import React from "react";
import { connect } from "react-redux";
import { filter } from 'rxjs/operators';
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { services } from "../../context";
import { actions } from "../../context";

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        routePath: state.route.routePath,
        channelMessages: state.message.channelMessages,
        channel_id: state.channel.channel_id,
        currentInput: state.message.currentInput,
    }
}

const mapActionsToProps = {
    changeRoute: actions.route.changeRoute,
    messageReceived: actions.message.messageReceived
}

class Chat extends React.Component {
    componentDidMount() {
        services.chatService.getMessages$()
            .pipe(filter(message => message['channel_id'] == this.props.channel_id))
            .subscribe((message) => {
                console.log("Received a message through the observable: ", message);
                this.props.messageReceived(message)
            })
    }

    onEnterPressed = () => {
        let {username, channel_id} = this.props;
        let message_content = this.props.currentInput;
        const message = services.chatService.prepareMessage(message_content, username, channel_id);
        services.socketService.send("send-message", message);
    }

    routeToChannelTest = () => {
        this.props.changeRoute({ path: "/channel-test" });
    };

    printProps = () => {
        console.log(this.props)
    }

    render() {
        const { channelMessages } = this.props;
        return (
            <div>
                <button onClick={this.printProps}>Print Prop</button>
                <button onClick={this.routeToChannelTest}>Route to Channel Test</button>
                {channelMessages.map((message) => {
                    console.log('username, time_sent, ', message.username, message.time_sent)
                    console.log('in chat.js:', message)
                    return (<Message key={message.username + message.content}
                        time={message.time_sent} usernames={message.sender} text={message.content} />);
                })}
                <InputMessage
                    onEnter={this.onEnterPressed}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
