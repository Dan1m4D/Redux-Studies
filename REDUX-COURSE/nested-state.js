const initialState = {
  name: "Daniel",
  address: {
    street: "Super Streert",
    city: "Sims",
    country: "PT",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const producer = require('immer').produce

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
        // TLDD -> too long, didn't do
        /* return {
            ...state,
            address: {
            ...state.address,
            street: action.payload,
            },
        }; */
        return producer(state,(draft) => {
            draft.address.street = action.payload
        })

    default:
      return state;
  }
};

const redux = require("redux");

const store = redux.createStore(reducer);
console.log("Initial State ->", store.getState());

const unsub = store.subscribe(() =>
  console.log("Update State ->", store.getState())
);

store.dispatch(updateStreet("Sudo street"));

unsub();
