import { getCommunityArts } from "@/services/api/getCommunityArts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetCommunityArtsParams } from "@/services/api/getCommunityArts";

export default function useGetAsciiArts(queryParams: GetCommunityArtsParams) {
    return useQuery({
        queryKey: [
            "ascii-arts",
            queryParams.limit,
            queryParams.offset,
            queryParams.sort,
            queryParams.sortBy,
            queryParams.search,
            queryParams.tags,
            queryParams.creator_email,
        ],
        queryFn: async () => {
            const res = await getCommunityArts(queryParams);
            console.log(res);
            return res;
        },
        staleTime: 5000,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    });
}
