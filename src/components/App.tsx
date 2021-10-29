import React, { useCallback, useState } from "react";
import { components } from "@octokit/openapi-types";

import { searchRepositories } from "../api/github";
import Chips from "./common/chips/Chips";
import Filter from "./common/Filter";
import Sort from "./common/Sort";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

import styles from "./App.module.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState<string[]>([]);
  const [repositories, setRepositories] = useState(
    [] as components["schemas"]["repo-search-result-item"][]
  );

  return (
    <div>
      <header>
        <Chips
          className={styles.searchForm}
          onSubmit={useCallback(async (selections: string[]) => {
            setLoading(true);
            setRepositories(
              await searchRepositories(...selections).then((value) => {
                setLoading(false);
                return value;
              })
            );
          }, [])}
          useState={[selections, setSelections]}
          title="Keywords: "
        >
          <SearchBar />
        </Chips>
      </header>
      {selections.length > 0 ? (
        <section>
          <header className={styles.resultsHeader}>
            <Filter /> <Sort />
          </header>
          <div>{loading ? "loading..." : null}</div>
          {repositories?.length > 0 ? (
            <SearchResults results={repositories} />
          ) : (
            "no results"
          )}
        </section>
      ) : (
        "try searching for something"
      )}
    </div>
  );
};

export default App;
