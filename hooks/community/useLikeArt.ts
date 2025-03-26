import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeArt } from "@/services/actions/likeArt";
import { toast } from "sonner";

export const useLikeArt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: likeArt,
        onSuccess: (data) => {
            if (data.success) {
                console.log("refetching");
                queryClient.refetchQueries({
                    queryKey: ["ascii-arts"],
                    type: "all",
                    exact: false,
                });
                queryClient.refetchQueries({
                    queryKey: ["user-likes"],
                    type: "all",
                    exact: false,
                });

                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
    });
};
