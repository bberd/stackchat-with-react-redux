import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import the messages sub-reducer
import messages from './messages';
import channels from './channels';
import name from './name';
import newChannelEntry from './newChannelEntry';
import newMessageEntry from './newMessageEntry';

const reducer = combineReducers({
  messages,
  channels,
  name,
  newChannelEntry,
  newMessageEntry
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

// store is exported by default
export default store;

// ...but we also export everything from messages!
export * from './messages';
