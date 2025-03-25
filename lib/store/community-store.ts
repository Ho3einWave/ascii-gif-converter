import { create } from "zustand";

export interface AsciiSubmission {
    id: string;
    title: string;
    description: string;
    author?: string;
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
    addSubmission: (submission: Omit<AsciiSubmission, "id">) => void;
    likeSubmission: (index: number) => void;
    getSubmissionById: (id: string) => AsciiSubmission | undefined;

    setSearchQuery: (query: string) => void;
    setSelectedTags: (tags: string[]) => void;
    setSortBy: (sort: "newest" | "popular") => void;

    // Computed getters
    getFilteredSubmissions: () => AsciiSubmission[];
    getAllTags: () => string[];
}

// Helper to generate a unique ID
const generateId = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
};

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

        // Add IDs to any submissions that don't have them (for backward compatibility)
        const submissionsWithIds = storedSubmissions.map((sub: any) => {
            if (!sub.id) {
                return { ...sub, id: generateId() };
            }
            return sub;
        });

        set({
            submissions: submissionsWithIds,
            filteredSubmissions: get().getFilteredSubmissions(),
            allTags: get().getAllTags(),
        });

        // Save back with IDs if needed
        if (
            JSON.stringify(submissionsWithIds) !==
            JSON.stringify(storedSubmissions)
        ) {
            localStorage.setItem(
                "asciiSubmissions",
                JSON.stringify(submissionsWithIds)
            );
        }
    },

    addSubmission: (submission) => {
        const newSubmission = {
            ...submission,
            id: generateId(),
        };

        const updatedSubmissions = [...get().submissions, newSubmission];
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

    getSubmissionById: (id) => {
        return get().submissions.find((sub) => sub.id === id);
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
                    sub.author?.toLowerCase().includes(query) ||
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
