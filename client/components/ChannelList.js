import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router';

function ChannelList(props) {
  return (
    <ul>
      {props.channels.map(channel => {
        return (
          <li key={channel.id}>
            <NavLink to={`/channels/${channel.id}`} activeClassName="active">
              <span>
                # {channel.name}
              </span>
              <span className="badge">
                { props.messages.filter((index) => {
                  return index.channelId === channel.id;
                }).length
              }
              </span>
            </NavLink>
          </li>
        );
      })}
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}

/** Write your `connect` component below! **/

const mapStateToProps = function(state) {
  return {
    channels: state.channels,
    messages: state.messages
  };
};

const ChannelListContainer = withRouter(connect(mapStateToProps)(ChannelList));

export default ChannelListContainer;
