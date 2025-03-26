import {
    ASCIIArt,
    getArtById,
    GetArtByIdResponse,
} from "@/services/api/getArtById";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetArtById = (
    id: string,
    options?: Omit<
        UseQueryOptions<ASCIIArt, Error, ASCIIArt>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery({
        queryFn: async () => {
            const res = await getArtById(id);
            if (res.success) {
                return res.data;
            }
            throw new Error("Failed to fetch art");
        },
        queryKey: ["art", id],
        staleTime: Infinity,
        ...options,
    });
};
