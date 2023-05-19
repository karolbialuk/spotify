import { createSlice } from '@reduxjs/toolkit'
import { fetchSongs } from '../thunks/fetchSongs'

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchSongs.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchSongs.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const usersReducer = songsSlice.reducer
