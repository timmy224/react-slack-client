import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { services } from "../../context";
import { actions } from "../../context";
import { filter } from 'rxjs/operators';

const mapStateToProps = (state) => {
    //console.log('in chat.js:', state.user.username)
    return {
        username: state.user.username,
        routePath: state.route.routePath,
        //messages:state.user.messages,
        channelMessages: state.channel.channelMessages,
        channel_id: state.channel.channel_id
    }
}

const mapActionsToProps = {
    changeRoute: actions.route.changeRoute,
    messageReceived: actions.message.messageReceived
}

class Chat extends React.Component {
    componentDidMount() {
        services.chatService.getMessages$()
            //.pipe(filter(message => message['channel_id'] == this.props.channel))
            .subscribe((message) => {
                console.log("Received a message through the observable: ", message);
                this.props.messageReceived(message)
            })
    }

    onEnterPressed = (message_content) => {
        //console.log("this.props should show up below")
        //console.log(this.props)
        let {username, channel_id} = this.props
        //console.log("before prepareMessage: ", username)
        const message = services.chatService.prepareMessage(message_content, username, channel_id);
        services.socketService.send("send-message", message);
    }

    routeToChannelTest = () => {
        this.props.changeRoute({ path: "/channel-test" });
    };

    printProps = () => {
        console.log(this.props)
    }

    // render() {
    //     let { username, channelMessages } = this.props;
    //     console.log("chat comp: ", this.props)
    //     console.log("in_render_chat.js:", username);
    //     // channelMessages=[{
    //     //         sender: "hello",
    //     //         time_sent: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    //     //         content: "hello",
    //     //         channel_id: 1, 
    //     //     }, {
    //     //         sender: "hello",
    //     //         time_sent: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    //     //         content: "goodbye",
    //     //         channel_id: 2,
    //     //     }
    //     //     ]
        

    //     // if (routePath)  {
    //     //   return <Redirect to={{ pathname: routePath }} />
    //     // }
    //     return (
    //         <div>
    //             <button onClick={this.routeToChannelTest}>Route to Channel Test</button>
    //             {channelMessages.map((message) => {
    //                 console.log("after map: ", message)
    //                 return (
    //                     <Message key={message.sender + message.content}
    //                     time={message.time_sent} usernames={message.sender} text={message.content} />
    //                     );
    //             })}
    //             <InputMessage
    //                 onEnter={this.onEnterPressed}
    //             />
    //         </div>
    //     );
    // }
    render() {
        const { channelMessages } = this.props;
        console.log('chanMess before render return of chat: ', channelMessages)
        // if (routePath)  {
        //   return <Redirect to={{ pathname: routePath }} />
        // }
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
