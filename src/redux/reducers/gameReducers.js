import {
  CLEAR_PLAYER,
  SET_GAME_FINISHED,
  RESTART_GAME,
} from '../actions/types';

const initialState = {
  gameResult: {},
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_FINISHED: {
      return {
        ...state,
        gameResult: {
          ...state.gameResult,
          isFinished: true,
          score: action.payload.score,
          duration: action.payload.duration,
        },
      };
    }
    case CLEAR_PLAYER: {
      return { ...state, gameResult: {} };
    }
    case RESTART_GAME: {
      return { ...state, gameResult: {} };
    }
    default:
      return state;
  }
}
