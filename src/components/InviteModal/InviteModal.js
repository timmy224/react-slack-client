import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { actions } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state)=>{
    return { 
        showInviteModal: state.invitation.showInviteModal,
    }
}
const mapActionsToProps = {
    handleInviteShow: actions.invitation.showInviteModal,
}

class InviteModal extends Component {
    handleSubmit = () => {

    }

    resetModal = () => {

    }

    handleUserChange = () => {

    }

    handleChannelName = () => {

    }

    handleHide = () => {
    	const { handleInviteShow } = this.props
        handleInviteShow(false);
    }

    render() {
        const { handleInviteShow, showInviteModal } = this.props;
        return (
            <div>
                <Modal show={showInviteModal} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite users to your org</Modal.Title>
                </Modal.Header>
                <form>
                </form>
                <Modal.Footer>
                    <button 
                    type='submit' 
                    onClick={this.handleSubmit}
                    >Submit
                    </button>
                </Modal.Footer>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(InviteModal);






