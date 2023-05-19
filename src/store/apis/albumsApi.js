import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
  }),

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
              limit: '7',
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
    }
  },
})

export const {
  useFetchCategoryPlaylistsQuery,
  useFetchFeaturedPlaylistsQuery,
  useFetchUserPlaylistsQuery,
  useFetchPlaylistSongsQuery,
  useFetchPlaylistInfoQuery,
} = albumsApi
export { albumsApi }
