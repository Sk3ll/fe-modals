import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IContactDetails } from '../utils/types';
import { BACKEND_API_URL } from '../utils/constants';

export default createApi({
  reducerPath: 'contactDetailsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_API_URL }),
  endpoints: build => ({
    createContactDetails: build.mutation<IContactDetails, IContactDetails>({
      query: body => ({
        url: 'contactDetails',
        method: 'POST',
        body,
      }),
    }),
  }),
});
