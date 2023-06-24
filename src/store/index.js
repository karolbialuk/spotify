import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { albumsApi } from './apis/albumsApi'
import { uriReducer, changeId, changePlay } from './slices/uriSlice'
import { songReducer, changeSong } from './slices/songSlice'
import { searchReducer, changeSearch } from './slices/searchSlice'
import { categoryReducer, changeCategory } from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    uri: uriReducer,
    song: songReducer,
    search: searchReducer,
    category: categoryReducer,
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
  useFetchLikedSongsQuery,
  usePlayClickedSongMutation,
  useActivateDeviceMutation,
  useLikeSongMutation,
  useCheckSavedTracksQuery,
  useRemoveSongMutation,
  useFetchCategoriesQuery,
  useFetchSearchItemsQuery,
  useFetchAlbumInfoQuery,
  useFetchAlbumSongsQuery,
  useCheckSavedSongsQuery,
  useFetchAuthorTopTracksQuery,
  useFetchAuthorQuery,
  useCheckAuthorAlbumsQuery,
  useFetchRelatedAuthorsQuery,
  useSavePlaylistMutation,
  useSaveAlbumMutation,
  useFetchUserAlbumsQuery,
  useGetCurrentUserQuery,
  useCheckUserFollowPlaylistQuery,
  useRemovePlaylistMutation,
  useRemoveAlbumMutation,
  useCheckUserFollowAlbumQuery,
  useCreatePlaylistMutation,
  useAddImgToPlaylistMutation,
  useAddItemToPlaylistMutation,
} from './apis/albumsApi'

export { changeId, changeSong, changePlay, changeSearch, changeCategory }
