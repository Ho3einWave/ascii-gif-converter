import { useQuery } from "@tanstack/react-query";
import { getUserLikes } from "@/services/actions/getUserLikes";
import { useSession } from "next-auth/react";

export const useUserLikes = () => {
    const { status } = useSession();

    return useQuery({
        queryKey: ["user-likes"],
        queryFn: async () => {
            const response = await getUserLikes();
            if (response.success) {
                return response.data;
            } else {
                return [];
            }
        },
        enabled: status === "authenticated",
    });
};
