import React, { useState } from "react";

import { findRepositories } from "../../api/search";

import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";

const RepoSearch = () => {
  const [repositories, setRepositories] = useState([] as any[]);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar
          onSearch={async (input) => {
            setRepositories(await findRepositories(input));
          }}
          placeholder="Search repositories..."
        />
        <SearchResults results={repositories} />
      </header>
    </div>
  );
};

export default RepoSearch;
