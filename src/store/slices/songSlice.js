import { createSlice } from '@reduxjs/toolkit'

const songSlice = createSlice({
  name: 'song',
  initialState: {
    songName: '',
  },
  reducers: {
    changeId(state, action) {
      state.songName = action.payload
    },
  },
})

export const { changeSong } = songSlice.actions
export const songReducer = songSlice.reducer
