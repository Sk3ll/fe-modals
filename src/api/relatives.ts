import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API_URL } from '../utils/constants';
import { IRelative } from '../utils/types';

export default createApi({
  reducerPath: 'relativeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_API_URL }),
  endpoints: build => ({
    createRelative: build.mutation<IRelative, IRelative>({
      query: body => ({
        url: 'relatives',
        method: 'POST',
        body,
      }),
    }),
  }),
});
