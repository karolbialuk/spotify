import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: '',
  },
  reducers: {
    changeSearch(state, action) {
      state.search = action.payload
    },
  },
})

export const { changeSearch } = searchSlice.actions
export const searchReducer = searchSlice.reducer
