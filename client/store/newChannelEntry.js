import socket from "../socket";
import axios from 'axios';

const WRITE_CHANNEL = "WRITE_CHANNEL";
const GET_CHANNEL = "GET_CHANNEL";

export function writeChannel(content) {
  const action = { type: WRITE_CHANNEL, content };
  return action;
}

export function getChannel(channel) {
  const action = { type: GET_CHANNEL, channel };
  return action;
}

export function postChannel(channel, history) {
  return function thunk(dispatch) {
    return axios
      .post("/api/channels", channel)
      .then(res => res.data)
      .then(newChannel => {
        const action = getChannel(newChannel);
        dispatch(action);
        socket.emit("new-channel", newChannel);
        history.push(`/channels/${newChannel.id}`);
      });
  };
}

export default function reducer(state = '', action) {
  switch (action.type) {
    case GET_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel]
      };
    case WRITE_CHANNEL:
      return action.content;
    default:
      return state;
  }
}
