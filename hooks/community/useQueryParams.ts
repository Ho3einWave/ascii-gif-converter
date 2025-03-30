import {
    parseAsArrayOf,
    parseAsString,
    parseAsStringLiteral,
    parseAsInteger,
    useQueryStates,
} from "nuqs";

export const useQueryParams = () => {
    return useQueryStates({
        limit: parseAsInteger.withDefault(9),
        offset: parseAsInteger.withDefault(1),
        sort: parseAsStringLiteral(["asc", "desc"]).withDefault("desc"),
        sortBy: parseAsStringLiteral([
            "createdAt",
            "updatedAt",
            "likes",
        ]).withDefault("createdAt"),
        search: parseAsString,
        tags: parseAsArrayOf(parseAsString),
        creator_email: parseAsString,
    });
};
