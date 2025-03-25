import { create } from "zustand";

interface SignInModalStore {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const useSignInModal = create<SignInModalStore>((set) => ({
    open: false,
    setOpen: (open) => set({ open }),
}));
