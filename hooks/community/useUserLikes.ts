import { useQuery } from "@tanstack/react-query";
import { getUserLikes } from "@/services/actions/getUserLikes";
import { useSession } from "next-auth/react";

export const useUserLikes = () => {
    const { status } = useSession();

    return useQuery({
        queryKey: ["user-likes", status],
        queryFn: async () => {
            const response = await getUserLikes();
            console.log("response", response);
            if (response.success) {
                console.log("response.data 1", response.data);
                return response.data;
            } else {
                console.log("response.data 2", response.data);
                return [];
            }
        },
        enabled: status === "authenticated",
    });
};
