import { combineReducers } from "redux";

import gameReducer from "./reducers/gameSlice";
import scoreReducer from "./reducers/scoreSlice";

const rootReducer = combineReducers({
  game: gameReducer,
  score: scoreReducer,
});

export default rootReducer;
