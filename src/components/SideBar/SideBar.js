import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";
import { services } from "../../context";
import { filter } from 'rxjs/operators';

class SideBar extends Component {
    fetchChannels = () => {
        this.props.fetchChannels();
    }

    // did not implement visuals for last 25 messages received
    // selectChannel = (event) => {
    //     this.props.selectChannel(event.target.value)
    //     console.log(event.target.value)
    // }

    fetchChannelMessages = (event) => {
        this.props.selectChannel(event.target.value)
        this.props.fetchChannelMessages(event.target.value);
    }

    componentDidMount() {
        // messages get filtered here based on selected channel ? 
        services.chatService.getMessages$()
            .pipe(filter(message => message['channel_id'] == this.props.channel))
            .subscribe(message => {
            console.log("Received a message through the observable: ", message);
        });
    }

    render() {
        const { channels, channel_id, channelMessages } = this.props;
        console.log(channels)
        console.log(channel_id)
        console.log(channelMessages)

        return (
            <div>
                {
                    !channels.length ?
                        <button onClick={this.fetchChannels}>Fetch channels</button>
                        : (channels.map((el) => <button
                            value={el}
                            //onClick={this.selectChannel}
                            onClick={this.fetchChannelMessages}
                            key={el}>
                            Channel #{el}
                        </button>))
                }
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    console.log('in ChannelTest state:', state);
    return {
        channels: state.channel.channels,
        channel_id: state.channel.channel_id,
        channelMessages: state.channel.channelMessages,
    };
};

const mapActionsToProps = {
    fetchChannels: actions.channel.fetchChannelIDs,
    selectChannel: actions.channel.selectChannel,
    fetchChannelMessages: actions.channel.fetchMessagesChannel,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);



// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { actions } from "../../context";

// class SideBar extends Component {

//   fetchChannelMessages = (event) => {
//     this.props.selectChannel(event.target.value)
//     this.props.fetchChannelMessages();
//   };

//   fetchChannels = () => {
//     this.props.fetchChannels();
//   };

//   render() {
//     const { messages, channels } = this.props;
//     return (
//         <div>
//             {
//                 !channels.length ?
//                     <button onClick={this.fetchChannels}>Fetch channels</button>
//                     : (channels.map((el) => <button
//                         value={el}
//                         //onClick={this.selectChannel}
//                         onClick={this.fetchChannelMessages}
//                         key={el}>
//                         Channel #{el}
//                     </button>))
//             }
//         </div>
//     )
//   }
// }
// //NEED TO ROUTE TO NEW NESTED ROUTEPATH IN ORDER TO DISPLAY CHANNEL CHANGES WHEN ^BUTTON IS CLICKED .
// //THIS SHOULD RENDER A DIFFERENT CHAT COMPONENT THAT HAS THE EL.ID
// //WITHIN EACH CHAT COMPONENT THE FETCH MESSAGES SHOULD BE MAPPED AND RENDERED AS THE MESSAGES.

// // OR CHANGE MESSAGE RETRIEVAL IN CHAT COMPONENT BASED ON WHICH BUTTON IS CLICKED
// //     return !messages.length ? (
// //       <button onCLick={this.fetchMessages}>Messages</button>
// //     ) : (
// //       messages.map((msg) => <p>{msg}</p>)
// //     );
// //   }
// // }
// const mapStateToProps = (state) => {
//   return {
//     channels: state.channel.channels,
//     messages: state.channel.messages,
//   };
// };

// const mapActionsToProps = {
//   fetchChannels: actions.channel.fetchChannelIDs,
//   selectChannel: actions.channel.selectChannel,
//   fetchChannelMessages: actions.channel.fetchMessagesChannel,
// };

// export default connect(mapStateToProps, mapActionsToProps)(SideBar);
