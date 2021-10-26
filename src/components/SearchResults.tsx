import React from "react";

interface Props {
  results: any[];
}

const SearchResults = ({ results }: Props) => {
  console.log(results);
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => {
          return <li key={result.id}>{result.name as string}</li>;
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
