import {
  SET_SCORE, SHOW_SCORE, CLEAR_PLAYER, RESTART_GAME,
} from '../actions/types';

const initialState = {
  scoreBoard: false,
  results: {},
};

export default function scoreReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCORE: {
      const { player, ...game } = action.payload;

      return {
        ...state,
        results: { ...state.results, [player]: [...(state[player] || []), { ...game, player }] },
      };
    }
    case SHOW_SCORE: {
      return { ...state, scoreBoard: true };
    }
    case CLEAR_PLAYER: {
      return { ...state, scoreBoard: false };
    }
    case RESTART_GAME: {
      return { ...state, scoreBoard: false };
    }
    default:
      return state;
  }
}
