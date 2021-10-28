import React, { useCallback, useState } from "react";
import { components } from "@octokit/openapi-types";

import { searchRepositories } from "../api/github";
import SearchResults from "./SearchResults";

import styles from "./App.module.css";
import MultiSelectTextInput from "./MultiSelectTextInput";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState(
    [] as components["schemas"]["repo-search-result-item"][]
  );

  return (
    <div className="app">
      <header className="app-header">
        <MultiSelectTextInput
          className={styles.searchBar}
          onSubmit={useCallback(async (userInput) => {
            setLoading(true);
            setRepositories(
              await searchRepositories(...userInput).then((value) => {
                setLoading(false);
                return value;
              })
            );
          }, [])}
          placeholder="Search for a GitHub repo..."
          title="Keywords:"
        />
      </header>
      <section>
        <div>{loading ? "loading..." : null}</div>
        {repositories?.length > 0 ? (
          <SearchResults results={repositories} />
        ) : (
          "no results"
        )}
      </section>
    </div>
  );
};

export default App;
