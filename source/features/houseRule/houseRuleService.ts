import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/features/api';

// 🧩 Interfaces
export interface HouseRuleIcon {
  fileUrl: string;
  fileType: string;
}

export interface HouseRuleData {
  _id: string;
  name: string;
  icon: HouseRuleIcon;
}

export interface HouseRuleResponse {
  data: HouseRuleData[];
}

// ⚙️ RTK Query API
export const houseRuleApi = createApi({
  reducerPath: 'houseRuleApi',
  baseQuery,
  tagTypes: ['HouseRule'],
  endpoints: (builder) => ({
    // GET all house rules
    getHouseRules: builder.query<HouseRuleResponse, void>({
      query: () => '/house-rules',
      providesTags: (result) =>
  result?.data
    ? [
        ...result.data.map(({ _id }) => ({ type: 'HouseRule' as const, id: _id })),
        { type: 'HouseRule', id: 'LIST' },
      ]
    : [{ type: 'HouseRule', id: 'LIST' }],
    }),

    // DELETE a house rule by ID
    deleteHouseRule: builder.mutation<void, string>({
      query: (id) => ({
        url: `/house-rules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'HouseRule', id }],
    }),
  }),
});

// ✅ Export the auto-generated hook
export const { useGetHouseRulesQuery, useDeleteHouseRuleMutation } = houseRuleApi;
