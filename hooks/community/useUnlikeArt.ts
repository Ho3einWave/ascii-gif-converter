import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeArt } from "@/services/actions/unlikeArt";

export const useUnlikeArt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: unlikeArt,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["user-likes"] });
            queryClient.refetchQueries({ queryKey: ["ascii-arts"] });
            console.log("refetched");
        },
    });
};
