import { create } from "zustand";

export type GameDifficulties = "dumb" | "regular" | "GOD";

type ConfigStore = {
  bestMove?: string;
  computerDifficulty: GameDifficulties;
  playWithComputer: boolean;

  setPlayWithComputer: (v: boolean) => void;
  setComputerDifficulty: (v: GameDifficulties) => void;
  setBestMovie: (v: string) => void;
};

const useConfigStore = create<ConfigStore>((set) => ({
  bestMovie: undefined,
  computerDifficulty: "dumb",
  playWithComputer: true,

  setBestMovie: (v) => set((s) => ({ ...s, bestMove: v })),
  setPlayWithComputer: (v) => set((s) => ({ ...s, playWithComputer: v })),
  setComputerDifficulty: (v) => set((s) => ({ ...s, computerDifficulty: v })),
}));

export default useConfigStore;
