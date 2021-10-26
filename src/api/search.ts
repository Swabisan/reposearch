import { request } from "@octokit/request";

interface SearchOptions {
  q: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated" | undefined;
  order?: "desc" | "asc" | undefined;
  per_page?: number | undefined;
  page?: number | undefined;
}

export const findRepositories = async (input: string) => {
  const options: SearchOptions = { q: input };

  try {
    const response = await request("GET /search/repositories", { ...options });

    return response.data.items;
  } catch (error) {
    console.error(error);
  }

  return [];
};
