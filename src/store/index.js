import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { albumsApi } from './apis/albumsApi'
import { uriReducer, changeId } from './slices/uriSlice'
import { songReducer, changeSong } from './slices/songSlice'

export const store = configureStore({
  reducer: {
    uri: uriReducer,
    song: songReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware)
  },
})

setupListeners(store.dispatch)

export {
  useFetchFeaturedPlaylistsQuery,
  useFetchCategoryPlaylistsQuery,
  useFetchUserPlaylistsQuery,
  useFetchPlaylistSongsQuery,
  useFetchPlaylistInfoQuery,
} from './apis/albumsApi'

export { changeId, changeSong }
