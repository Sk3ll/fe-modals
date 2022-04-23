import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IChild } from '../utils/types';
import { BACKEND_API_URL } from '../utils/constants';

export default createApi({
  reducerPath: 'childrenAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_API_URL }),
  endpoints: build => ({
    createChild: build.mutation<IChild, IChild>({
      query: body => ({
        url: 'children',
        method: 'POST',
        body,
      }),
    }),
  }),
});
