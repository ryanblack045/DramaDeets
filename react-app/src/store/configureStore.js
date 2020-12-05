import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './reducers/session'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// used to persist state by loading/storing store into local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

//samesies
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const reducer = combineReducers({
  session
});


const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);


store.subscribe(() => {
  saveState({
    // entities: ,
    session: store.getState().session ,
    // ui: ,
    // errors ,
    // directionsRedux: store.getState().directionsRedux,
    // trips: store.getState().trips,
    // stops: store.getState().stops,
    // cars: store.getState().cars,
    // setDuration: store.getState().setDuration,
  });
});

export default store
