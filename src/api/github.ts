import { request } from "@octokit/request";
import { components } from "@octokit/openapi-types";

interface SearchOptions {
  q: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated" | undefined;
  order?: "desc" | "asc" | undefined;
  per_page?: number | undefined;
  page?: number | undefined;
}

export const searchRepositories = async (
  ...selections: string[]
): Promise<components["schemas"]["repo-search-result-item"][]> => {
  const query = selections.join(" ");
  const options: SearchOptions = { q: query };

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
