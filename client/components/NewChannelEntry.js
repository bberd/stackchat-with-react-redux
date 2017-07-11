import React, { Component } from "react";
import { connect } from "react-redux";
import { writeChannel as writeChannelName, postChannel } from "../store/index.js";

function NewChannelEntry(props) {
  return (
    <form
      onSubmit={event =>
        props.handleSubmit(event.target.channelName.value, event)}
    >
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input
          value={props.newChannelEntry}
          onChange={props.handleChange}
          className="form-control"
          type="text"
          name="channelName"
          placeholder="Enter channel name"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">
          Create Channel
        </button>
      </div>
    </form>
  );
}

/** Write your `connect` component below! **/
const mapStateToProps = function(state) {
  return {
    newChannelEntry: state.newChannelEntry
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleChange(event) {
      dispatch(writeChannelName(event.target.value));
    },

    handleSubmit(name, event) {
      event.preventDefault();
      dispatch(postChannel({ name }, ownProps.history));
      dispatch(writeChannelName(""));
    }
  };
};

const NewChannelEntryContainer = connect(mapStateToProps, mapDispatchToProps)(
  NewChannelEntry
);
export default NewChannelEntryContainer;
