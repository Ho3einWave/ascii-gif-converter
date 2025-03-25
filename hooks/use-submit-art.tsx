import {
    submitArt,
    SubmitArtProps,
    SubmitArtResult,
} from "@/services/actions/submitArt";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSubmitArt = (
    options?: UseMutationOptions<SubmitArtResult, Error, SubmitArtProps>
) => {
    return useMutation({
        mutationFn: async (data: SubmitArtProps) => await submitArt(data),
        ...options,
    });
};
