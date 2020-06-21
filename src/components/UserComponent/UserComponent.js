import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

class UserComponent extends Component {

    onFieldUpdated = (field, value) => {
        this.props.formFieldUpdated(field, value);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitForm();
    };

    render() {
        const { form } = this.props;
        return (
            <Fragment>
                <h1>Send user</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="name"
                        value={form.name}
                        onChange={(event) => this.onFieldUpdated("name", event.target.value)}
                    ></input>
                    <input
                        placeholder="username"
                        value={form.username}
                        onChange={(event) => this.onFieldUpdated("username", event.target.value)}
                    ></input>
                    <input
                        placeholder="email"
                        value={form.email}
                        onChange={(event) => this.onFieldUpdated("email", event.target.value)}
                    ></input>
                    <button type="submit">Send</button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    form: state.user.form
});
const mapActionsToProps = {
    formFieldUpdated: actions.user.formFieldUpdated,
    resetForm: actions.user.resetForm,
    submitForm: actions.user.submitForm,
};

export default connect(mapStateToProps, mapActionsToProps)(UserComponent);