// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        channels: {},
        create_channel_name: '',
        show_taken_msg: false,
        showCreateModal: false,
        isPrivate: false,
        privateChannelUsers: [],
        numChannelMembers: 0,
        showChannelSideBar: false,
        channelMemberNames: [],
        removeMember: '',
        addMember: ''
        
    };

  const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

        switch (type) {
            case types.FETCH_CHANNELS:
                return {
                    ...state,
                    channels: payload,
                };
            case types.CHANNEL_NAME_TAKEN:
                return {
                    ...state,
                    show_taken_msg: payload,
                }               
            case types.CHANNEL_NAME_SET:
                return {
                    ...state,
                    create_channel_name: payload,
                }
            case types.SHOW_CREATE_MODAL:
                return{
                    ...state,
                    showCreateModal: payload,
                }
            case types.CREATE_PRIVATE:
                return{
                    ...state,
                    isPrivate: payload,
                }
            case types.PRIVATE_CHANNEL_USERS:
                return{
                    ...state,
                    privateChannelUsers: payload,
                }
            case types.FETCH_TOTAL_MEMBERS:
                return{
                    ...state,
                    numChannelMembers: payload
                }
            case types.SHOW_CHANNEL_SIDE_BAR:
                return{
                    ...state,
                    showChannelSideBar: payload
                }
                case types.FETCH_CHANNEL_MEMBER_NAMES:
                    return{
                        ...state,
                        channelMemberNames: payload
                    }
                case types.UPDATE_ADD_MEMBER:
                    return{
                        ...state,
                        addMember:payload
                    }
                case types.REMOVE_CHANNEL_MEMBER:
                    return{
                        ...state,
                        removeMember: payload
                    }
            default: 
                return state;
        }
    };

  return reducer;
};

export default initReducer;
