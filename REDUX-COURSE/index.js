/* REDUX:
Action  - An object with a type property
        - It can have other properties, but they're not obligatory

Action Creator  - Fuction that returns an object
                - Easy to add more properties or parse ars through function args

Reducer - Fuction that accepts state and action as arguments and returns the next state of the application
        - In its simplest form is:
            (state, action) => next_state

Store   - Only one store for application
        - Holds application state
        - Allows access to state via getState()
        - Allows state to be updated via dispatch(action)
        - Allows listeners via subscribe(listener)
        - Handles listeners unsub via the function returned by subscribe(listener)
*/
// 'IMPORTS'
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators; // Binds all actions on the args (inside an object) to the function passed on the args
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// ACTION PART
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// action creator - returns the action
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
    msg: "Ordered Cake!",
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
    msg: "Restocked Cake!",
  };
}

function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
    msg: "Ordered IceCream!",
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
    msg: "Restocked IceCream!",
  };
}

// REDUCER PART

// Initial State FOR SINGLE REDUCERS
/* const initialState = {
  numCakes: 10,
  numIceCreams: 20,
  action: "Shop Opened",
}; */

// Initial State FOR MULTIPLE REDUCERS
const initialCakeState = {
  numCakes: 10,
};

const initialIceCreamState = {
  numIceCreams: 20,
};

// SINGLE Reducer
/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, // Copy of the object, so we just modify what's needed
        numCakes: state.numCakes - 1,
        action: action.msg,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numCakes: state.numCakes + action.payload,
        action: action.msg,
      };

    case ICECREAM_ORDERED:
      return {
        ...state, // Copy of the object, so we just modify what's needed
        numIceCreams: state.numIceCreams - 1,
        action: action.msg,
      };

    case ICECREAM_RESTOCKED:
      return {
        ...state, // Copy of the object, so we just modify what's needed
        numIceCreams: state.numIceCreams + action.payload,
        action: action.msg,
      };

    default:
      return state;
  }
};
*/

// MULTIPLE Reducers
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, // Copy of the object, so we just modify what's needed
        numCakes: state.numCakes - 1,
        action: action.msg,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numCakes: state.numCakes + action.payload,
        action: action.msg,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state, // Copy of the object, so we just modify what's needed
        numIceCreams: state.numIceCreams - 1,
        action: action.msg,
      };

    case ICECREAM_RESTOCKED:
      return {
        ...state, // Copy of the object, so we just modify what's needed
        numIceCreams: state.numIceCreams + action.payload,
        action: action.msg,
      };

    default:
      return state;
  }
};

// STORE PART

// For SINGLE reducer
// const store = createStore(reducer);
// const store = createStore(reducer, applyMiddleware(logger));     // With middleware


// For MULTIPLE reducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial State ->", store.getState());

const unsub = store.subscribe(() => {}          // The middleware is in charge of dump information on console, so we dont need to do so anymore
  //console.log("Update State ->", store.getState())    
);

// Without action bind
/* store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(3));
store.dispatch(restockCake());
store.dispatch(orderCake()); */

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);

// With action bind
actions.orderCake();
actions.orderCake();
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.orderCake();
actions.restockCake(3);
actions.restockIceCream(4);
actions.restockCake();
actions.orderIceCream();
actions.orderCake();
actions.restockIceCream();
actions.restockIceCream();

unsub();
