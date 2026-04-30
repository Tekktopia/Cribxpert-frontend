import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';

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

export const houseRuleApi = createApi({
  reducerPath: 'houseRuleApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['HouseRule'],
  keepUnusedDataFor: 3600,
  refetchOnMountOrArgChange: 1800,
  refetchOnReconnect: false,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getHouseRules: builder.query<HouseRuleResponse, void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('house_rules')
          .select('*, icon:house_rules_icons(file_url, file_type)')
          .order('name');
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return {
          data: {
            data: (data ?? []).map((r) => ({
              _id: r.id,
              name: r.name,
              icon: {
                fileUrl: r.icon?.file_url ?? '',
                fileType: r.icon?.file_type ?? '',
              },
            })),
          },
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'HouseRule' as const, id: _id })),
              { type: 'HouseRule', id: 'LIST' },
            ]
          : [{ type: 'HouseRule', id: 'LIST' }],
    }),

    deleteHouseRule: builder.mutation<void, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('house_rules').delete().eq('id', id);
        if (error) return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'HouseRule', id },
        { type: 'HouseRule', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetHouseRulesQuery, useDeleteHouseRuleMutation } = houseRuleApi;
