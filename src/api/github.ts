import { request } from "@octokit/request";
import { components } from "@octokit/openapi-types";

export type SortBy =
  | "stars"
  | "forks"
  | "help-wanted-issues"
  | "updated"
  | undefined;
export type SortOrder = "desc" | "asc";

export interface SortOptions {
  sort?: SortBy;
  order?: SortOrder;
}

interface SearchOptions {
  q: string;
  per_page?: number;
  page?: number;
}

export interface SearchQualifiers {
  [qualifier: string]: string[];
}

export const searchRepositories = async (
  selections: string[]
): Promise<components["schemas"]["repo-search-result-item"][]> => {
  const query = selections.join(" ");
  const options: SearchOptions & SortOptions = { q: query };

  if (query) {
    try {
      const response = await request("GET /search/repositories", {
        ...options,
      });

      return response.data.items;
    } catch (error: any) {
      if (error.status === 403) {
        // Warn Rate Limit
      }
      console.error({ ...(error as {}) });
    }
  }

  return [];
};
