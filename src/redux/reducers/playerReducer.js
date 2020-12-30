import {
  SET_PLAYER,
  CLEAR_PLAYER,
} from '../actions/types';

const initialState = {
  player: '',
  players: {},
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER: {
      return {
        ...state,
        players: { ...state.players, ...action.payload.players },
        player: action.payload.player,
      };
    }
    case CLEAR_PLAYER: {
      return { ...state, player: '' };
    }
    default:
      return state;
  }
}
