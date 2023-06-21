import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
  },
  reducers: {
    changeCategory(state, action) {
      state.category = action.payload
    },
  },
})

export const { changeCategory } = categorySlice.actions
export const categoryReducer = categorySlice.reducer
