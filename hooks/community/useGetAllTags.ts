import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "@/services/api/getAllTags";

export const useGetAllTags = () => {
    return useQuery({
        queryKey: ["allTags"],
        queryFn: async () => {
            const res = await getAllTags();
            return res.data;
        },
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
    });
};
