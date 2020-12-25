import {
  SET_PLAYER,
  CLEAR_PLAYER,
  SET_GAME_FINISHED,
  RESTART_GAME,
  SHOW_SCORE,
} from "../actions/types";

const initialState = {
  player: "",
  players: {},
  gameResult: {},
  scoreBoard: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_FINISHED: {
      return {
        ...state,
        gameResult: {
          isFinished: true,
          score: action.payload.score,
          duration: action.payload.duration,
        },
      };
    }
    case SET_PLAYER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CLEAR_PLAYER: {
      return { ...state, player: "", gameResult: {}, scoreBoard: false  };
    }
    case RESTART_GAME: {
      return { ...state, gameResult: {}, scoreBoard: false };
    }
    case SHOW_SCORE: {
      return { ...state, scoreBoard: true, gameResult: {} };
    }
    default:
      return state;
  }
}
