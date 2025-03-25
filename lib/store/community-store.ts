import { create } from "zustand";

export interface AsciiSubmission {
    title: string;
    description: string;
    author: string;
    tags: string[];
    asciiFrame: string;
    metadata: {
        fps: number;
        width: number;
        height: number;
        asciiChars: string;
        invert: boolean;
        createdAt: string;
    };
    id: string;
    likes: number;
}

interface CommunityState {
    // Submissions
    submissions: AsciiSubmission[];

    // Filters
    searchQuery: string;
    selectedTags: string[];
    sortBy: "newest" | "popular";

    // Computed
    filteredSubmissions: AsciiSubmission[];
    allTags: string[];

    // Actions
    loadSubmissions: () => void;
    addSubmission: (submission: AsciiSubmission) => void;
    likeSubmission: (index: number) => void;

    setSearchQuery: (query: string) => void;
    setSelectedTags: (tags: string[]) => void;
    setSortBy: (sort: "newest" | "popular") => void;

    // Computed getters
    getFilteredSubmissions: () => AsciiSubmission[];
    getAllTags: () => string[];
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
    // Initial state
    submissions: [],

    searchQuery: "",
    selectedTags: [],
    sortBy: "newest",

    filteredSubmissions: [],
    allTags: [],

    // Actions
    loadSubmissions: () => {
        const storedSubmissions = JSON.parse(
            localStorage.getItem("asciiSubmissions") || "[]"
        );
        set({
            submissions: storedSubmissions,
            filteredSubmissions: get().getFilteredSubmissions(),
            allTags: get().getAllTags(),
        });
    },

    addSubmission: (submission) => {
        const updatedSubmissions = [...get().submissions, submission];
        localStorage.setItem(
            "asciiSubmissions",
            JSON.stringify(updatedSubmissions)
        );
        set({
            submissions: updatedSubmissions,
            filteredSubmissions: get().getFilteredSubmissions(),
            allTags: get().getAllTags(),
        });
    },

    likeSubmission: (index) => {
        const updatedSubmissions = [...get().submissions];
        if (updatedSubmissions[index]) {
            updatedSubmissions[index].likes += 1;
            localStorage.setItem(
                "asciiSubmissions",
                JSON.stringify(updatedSubmissions)
            );
            set({
                submissions: updatedSubmissions,
                filteredSubmissions: get().getFilteredSubmissions(),
            });
        }
    },

    setSearchQuery: (query) => {
        set({
            searchQuery: query,
            filteredSubmissions: get().getFilteredSubmissions(),
        });
    },

    setSelectedTags: (tags) => {
        set({
            selectedTags: tags,
            filteredSubmissions: get().getFilteredSubmissions(),
        });
    },

    setSortBy: (sort) => {
        set({
            sortBy: sort,
            filteredSubmissions: get().getFilteredSubmissions(),
        });
    },

    // Computed getters
    getFilteredSubmissions: () => {
        const { submissions, searchQuery, selectedTags, sortBy } = get();

        let filtered = [...submissions];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (sub) =>
                    sub.title.toLowerCase().includes(query) ||
                    sub.description.toLowerCase().includes(query) ||
                    sub.author.toLowerCase().includes(query) ||
                    sub.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Filter by selected tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter((sub) =>
                selectedTags.every((tag) => sub.tags.includes(tag))
            );
        }

        // Sort submissions
        if (sortBy === "newest") {
            filtered.sort(
                (a, b) =>
                    new Date(b.metadata.createdAt).getTime() -
                    new Date(a.metadata.createdAt).getTime()
            );
        } else if (sortBy === "popular") {
            filtered.sort((a, b) => b.likes - a.likes);
        }

        return filtered;
    },

    getAllTags: () => {
        const { submissions } = get();
        const tags = submissions.flatMap((sub) => sub.tags);
        return [...new Set(tags)];
    },
}));
