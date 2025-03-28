import { deleteArtById } from "@/services/actions/deleteArtById";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteArtById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await deleteArtById(id);
            if (res.success) {
                return res;
            } else {
                throw new Error(res.message);
            }
        },
        onError: (err) => {
            toast.error("Failed to delete the art");
        },
        onSuccess: () => {
            toast.success("Art deleted successfully!");
            queryClient.refetchQueries({
                queryKey: ["user-arts"],
            });
        },
    });
};
