import { request } from "@octokit/request";

interface SearchOptions {
  q: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated" | undefined;
  order?: "desc" | "asc" | undefined;
  per_page?: number | undefined;
  page?: number | undefined;
}

export const searchRepositories = async (...input: string[]) => {
  const query = input.join(" ");
  const options: SearchOptions = { q: query };

  if (query) {
    try {
      const response = await request("GET /search/repositories", {
        ...options,
      });

      return response.data.items;
    } catch (error) {
      console.error(error);
    }
  }

  return [];
};
