import { SET_SCORE } from "../actions/types";

const initialState = {};

export default function scoreReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCORE: {
      const { player, ...game } = action.payload;

      return {
        ...state,
        [player]: [...(state[player] || []), { ...game, player }],
      };
    }
    default:
      return state;
  }
}
