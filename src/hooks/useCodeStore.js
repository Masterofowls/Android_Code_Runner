import { create } from 'zustand';
export const useCodeStore = create((set) => ({
    code: `// Welcome to Code Runner!
// Select a language and start coding...

console.log('Hello, World!');`,
    language: 'javascript',
    setCode: (code) => set({ code }),
    setLanguage: (language) => set({ language }),
}));
