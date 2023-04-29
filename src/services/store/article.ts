import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidAPIKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY

export const articleAPI = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('content-type', 'application/octet-stream')
            headers.set('X-RapidAPI-Key', rapidAPIKey)
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
})

export const { useLazyGetSummaryQuery } = articleAPI