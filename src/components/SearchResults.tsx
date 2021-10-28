import React from "react";
import { components } from "@octokit/openapi-types";

interface Props {
  results: components["schemas"]["repo-search-result-item"][];
}

const SearchResults = ({ results }: Props) => {
  console.log(results);

  return (
    <div>
      <ul>
        {results.map((result) => {
          return (
            <li key={result.id}>
              <a href={result.html_url}>{result.name as string}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
