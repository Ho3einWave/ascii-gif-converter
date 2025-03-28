import { getUserArts } from "@/services/actions/getUserArts";
import { useQuery } from "@tanstack/react-query";

export const useGetUserArts = () => {
    return useQuery({
        queryKey: ["user-arts"],
        queryFn: async () => {
            const res = await getUserArts();
            if (res.success) {
                return res.data;
            } else {
                throw new Error(res.message);
            }
        },
    });
};
