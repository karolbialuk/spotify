import { createSlice } from '@reduxjs/toolkit'

const uriSlice = createSlice({
  name: 'uri',
  initialState: {
    id: '',
    play: false,
  },
  reducers: {
    changeId(state, action) {
      state.id = action.payload
    },
    changePlay(state, action) {
      state.play = action.payload
    },
  },
})

export const { changeId, changePlay } = uriSlice.actions
export const uriReducer = uriSlice.reducer
