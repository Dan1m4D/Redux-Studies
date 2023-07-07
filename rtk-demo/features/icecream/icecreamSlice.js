const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numIcecream: 20,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numIcecream--;
    },
    restocked: (state, action) => {
      state.numIcecream += action.payload;
    },
  },
  /* extraReducers: {
        ['cake/ordered']: (state) => {
            state.numIcecream --
        }
    }  */
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.numIcecream--;
    });
  },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
