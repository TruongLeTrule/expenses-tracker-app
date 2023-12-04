import { create } from "zustand";

const useAppStore = create((set) => ({
  expenses: null,
  setExpenses: (data) => {
    set((state) => ({ expenses: data }));
  },
}));

export default useAppStore;
