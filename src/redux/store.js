import { createStore } from "redux";
import rootReducer from "./reducer";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {}
};

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  const state = store.getState();
  saveState({
    game: state.game,
    score: state.score,
  });
});

export default store;
