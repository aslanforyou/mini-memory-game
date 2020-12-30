import { combineReducers } from 'redux';

import gameReducer from './reducers/gameReducers';
import scoreReducer from './reducers/scoreReducers';
import playerReducer from './reducers/playerReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  score: scoreReducer,
  player: playerReducer,
});

export default rootReducer;
