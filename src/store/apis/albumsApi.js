import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
  }),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,

  endpoints(builder) {
    return {
      fetchCategoryPlaylists: builder.query({
        query: ({ token, category }) => {
          return {
            url: `/browse/categories/${category}/playlists`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              country: 'PL',
              // limit: '7',
            },
          }
        },
      }),

      fetchFeaturedPlaylists: builder.query({
        query: (token) => {
          return {
            url: `/browse/featured-playlists`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              country: 'PL',
              locale: 'PL',
              limit: '6',
            },
          }
        },
      }),
      fetchUserPlaylists: builder.query({
        query: (token) => {
          return {
            url: `/me/playlists`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {},
          }
        },
        providesTags: ['/me/playlists'],
      }),
      fetchPlaylistSongs: builder.query({
        query: ({ token, id }) => {
          return {
            url: `playlists/${id}/tracks`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {},
            market: 'PL',
          }
        },
      }),
      fetchPlaylistInfo: builder.query({
        query: ({ token, id }) => {
          return {
            url: `playlists/${id}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {},
            market: 'PL',
          }
        },
      }),
      fetchAlbumInfo: builder.query({
        query: ({ token, id }) => {
          return {
            url: `albums/${id}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {},
            market: 'PL',
          }
        },
      }),
      fetchAlbumSongs: builder.query({
        query: ({ token, id }) => {
          return {
            url: `albums/${id}/tracks`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {},
            market: 'PL',
          }
        },
      }),
      fetchLikedSongs: builder.query({
        query: ({ token, offset }) => {
          return {
            url: `/me/tracks`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: '50',
              offset: offset,
            },
            market: 'PL',
          }
        },
      }),

      fetchCategories: builder.query({
        query: (token) => {
          return {
            url: `/browse/categories`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              country: 'PL',
              locale: 'pl_PL',
              limit: '50',
            },
          }
        },
      }),

      checkSavedTracks: builder.query({
        query: ({ token, id }) => {
          return {
            url: `/me/tracks/contains`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: id,
            },
          }
        },
      }),

      fetchAuthorTopTracks: builder.query({
        query: ({ token, id }) => {
          return {
            url: `/artists/${id}/top-tracks`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              id: id,
              market: 'PL',
            },
          }
        },
      }),

      fetchSearchItems: builder.query({
        query: ({ token, search, type }) => {
          return {
            url: `/search`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              q: search,
              type: type,
              market: 'PL',
            },
          }
        },
      }),

      CheckSavedSongs: builder.query({
        query: ({ token, id }) => {
          return {
            url: '/me/tracks/contains',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },

            params: {
              ids: id,
            },
          }
        },
      }),

      CheckAuthorAlbums: builder.query({
        query: ({ token, id }) => {
          return {
            url: `/artists/${id}/albums`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },

            params: {
              market: 'PL',
            },
          }
        },
      }),

      fetchAuthor: builder.query({
        query: ({ token, id }) => {
          return {
            url: `artists/${id}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        },
      }),

      fetchRelatedAuthors: builder.query({
        query: ({ token, id }) => {
          return {
            url: `artists/${id}/related-artists`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        },
      }),

      fetchUserAlbums: builder.query({
        query: (token) => {
          return {
            url: '/me/albums',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        },
      }),

      getCurrentUser: builder.query({
        query: (token) => {
          return {
            url: `/me`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        },
      }),

      checkUserFollowPlaylist: builder.query({
        query: ({ token, playlistId, userId }) => {
          return {
            url: `/playlists/${playlistId}/followers/contains`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: userId,
            },
          }
        },
      }),

      playClickedSong: builder.mutation({
        query: ({ uri, token, context }) => {
          return {
            url: '/me/player/play',
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: {
              uris: uri,
              context_uri: context,
            },
          }
        },
      }),
      activateDevice: builder.mutation({
        query: ({ token, deviceId }) => {
          return {
            url: '/me/player/',
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: {
              device_ids: [deviceId],
              play: true,
            },
          }
        },
      }),

      likeSong: builder.mutation({
        query: ({ token, id }) => {
          return {
            url: '/me/tracks/',
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: id,
            },
          }
        },
      }),
      removeSong: builder.mutation({
        query: ({ token, id }) => {
          return {
            url: '/me/tracks/',
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: id,
            },
          }
        },
      }),

      CheckUserFollowAlbum: builder.query({
        query: ({ token, albumId }) => {
          return {
            url: '/me/albums/contains',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: albumId,
            },
          }
        },
      }),
      savePlaylist: builder.mutation({
        query: ({ token, playlistOrAlbumId }) => {
          return {
            url: `/playlists/${playlistOrAlbumId}/followers`,
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        },
      }),

      saveAlbum: builder.mutation({
        query: ({ token, playlistOrAlbumId }) => {
          return {
            url: '/me/albums',
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: playlistOrAlbumId,
            },
          }
        },
      }),
      removePlaylist: builder.mutation({
        query: ({ token, playlistOrAlbumId }) => {
          return {
            url: `/playlists/${playlistOrAlbumId}/followers`,
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        },
      }),

      removeAlbum: builder.mutation({
        query: ({ token, playlistOrAlbumId }) => {
          return {
            url: '/me/albums',
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: playlistOrAlbumId,
            },
          }
        },
      }),

      createPlaylist: builder.mutation({
        query: ({ token, userId, playlistName }) => {
          return {
            url: `/users/${userId}/playlists`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              name: playlistName,
            },
          }
        },
      }),

      addImgToPlaylist: builder.mutation({
        query: ({ token, playlistId, imgUrl }) => {
          return {
            url: `v1/playlists/${playlistId}/images`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              imgUrl,
            },
          }
        },
      }),
    }
  },
})

export const {
  useFetchCategoryPlaylistsQuery,
  useFetchFeaturedPlaylistsQuery,
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
} = albumsApi
export { albumsApi }
