import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products?limit=0',
      transformResponse: (response) => response.products,
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productsApi;