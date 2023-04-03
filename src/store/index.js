import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { albumsApi } from './apis/albumsApi'

export const store = configureStore({
  reducer: {
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
} from './apis/albumsApi'
