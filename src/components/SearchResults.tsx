import React from "react";

interface Props {
  results: any[];
}

const SearchResults = ({ results }: Props) => {
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
