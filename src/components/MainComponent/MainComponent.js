import React, {Component} from "react";
import {connect} from "react-redux";
import Chat from "../Chat/Chat";
import OrgsSidebar from "../OrgsSidebar/OrgsSidebar";
import SideBar from "../SideBar/SideBar";
import {actions, services} from "../../context";
import {take} from "rxjs/operators";
import ChannelSideBar from "../ChannelSideBar/ChannelSideBar";
import "./MainComponent.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => ({
	routePath: state.route.routePath,
	routeState: state.route.routeState,
	username: state.user.username,
	isInitialized: state.main.isInitialized,
	showChannelSideBar: state.channel.showChannelSideBar,
	orgs: state.org.orgs,
	org: state.org.org,
});

const mapActionsToProps = {
	initMain: actions.main.initMain,
	changeRoute: actions.route.changeRoute,
	logout: actions.user.logout,
};

class MainComponent extends Component {
	componentDidMount() {
		if (!services.socketService.getConnected()) {
			const username = this.props.username
				? this.props.username
				: services.storageService.get("username");
			if (username) {
				this.setupConnectedSubscription();
				services.socketService.connect({username: username});
				this.props.initMain();
			} else {
				const {changeRoute} = this.props;
				changeRoute({path: "/login"});
			}
		}
	}

	setupConnectedSubscription() {
		const {changeRoute} = this.props;
		services.socketService
			.getConnected$()
			.pipe(take(1))
			.subscribe((connected) => {
				if (!connected) {
					changeRoute({
						path: "/alert-user",
						routeState: {alert: "Web socket connection error "},
					});
				}
			});
	}

	render() {
		const {isInitialized, orgs, showChannelSideBar, org} = this.props;
		const {isEmpty} = services.utilityService;
		const sideBar = !isEmpty(orgs) ? (
			<SideBar />
		) : (
			<div id="create-first-org-cta">
				<p id="cta-header">Create an org to get started!</p>
				<p id="cta-icon">
					<FontAwesomeIcon
						icon={faArrowLeft}
						transform="grow-20"
						color="#40e0d0"
					/>
				</p>
			</div>
		);
		const chat = !isEmpty(orgs) ? <Chat /> : null;
		return (
			<div className="main">
				{isInitialized ? (
					<div className="container-fluid px-0 background-view">
						<div className="row main-wrapper">
							<div>
								<OrgsSidebar />
							</div>
							<div className="sidebar-wrapper">{sideBar}</div>
							<div className="chat-wrapper">{chat}</div>
							{showChannelSideBar ? (
								<ChannelSideBar orgName={org.name} />
							) : null}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
