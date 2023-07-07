const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numCake: 10
}

const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers: {
        ordered: (state) => {
            state.numCake --
        },
        restocked: (state, action) => {
            state.numCake += action.payload
        }
    },
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions