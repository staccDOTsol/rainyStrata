export declare const useEmojiSearch: () => {
    emojis: never[];
    searchMatch: string | null | undefined;
    getCurrentlyTypedEmoji: (e: React.FormEvent<HTMLTextAreaElement>) => string | null;
    search: (e: React.FormEvent<HTMLTextAreaElement>) => Promise<void>;
    reset: () => void;
};
//# sourceMappingURL=useEmojiSearch.d.ts.map