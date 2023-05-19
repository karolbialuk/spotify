import { createSlice } from '@reduxjs/toolkit'

const uriSlice = createSlice({
  name: 'uri',
  initialState: {
    id: '',
  },
  reducers: {
    changeId(state, action) {
      state.id = action.payload
    },
  },
})

export const { changeId } = uriSlice.actions
export const uriReducer = uriSlice.reducer
