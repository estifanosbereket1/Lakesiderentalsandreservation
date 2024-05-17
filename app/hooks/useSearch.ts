import { create } from "zustand";

interface useSearchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearch = create<useSearchStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useSearch;
