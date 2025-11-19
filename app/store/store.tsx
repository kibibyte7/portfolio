// stores/useTerminalStore.ts
import { create } from "zustand";
import { Project } from "../projects/projects";

interface TerminalState {
    commandHistory: string[];
    inputValue: string;
    historyIndex: number;
    isProjectOpen: boolean;
    selectedProject?: Project;
    currentMediaIndex: number;

    // Setters
    setCommandHistory: (history: string[] | ((prev: string[]) => string[])) => void;
    setInputValue: (val: string) => void;
    setHistoryIndex: (i: number) => void;
    setIsProjectOpen: (b: boolean) => void;
    setSelectedProject: (p?: Project) => void;
    setCurrentMediaIndex: (i: number) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
    commandHistory: [],
    inputValue: "",
    historyIndex: 0,
    isProjectOpen: false,
    selectedProject: undefined,
    currentMediaIndex: 0,

    setCommandHistory: (updater) => set((state) => ({
        commandHistory: typeof updater === "function" ? updater(state.commandHistory) : updater
    })),
    setInputValue: (v) => set({ inputValue: v }),
    setHistoryIndex: (i) => set({ historyIndex: i }),
    setIsProjectOpen: (b) => set({ isProjectOpen: b }),
    setSelectedProject: (p) => set({ selectedProject: p }),
    setCurrentMediaIndex: (i) => set({ currentMediaIndex: i }),
}));
