import React, { useState } from "react";
import { Search } from "react-feather";

import styles from "./SearchBar.module.css";

interface Props {
  push?: (selection: string) => void;
  pop?: () => void;
}

const SearchBar = ({ push, pop }: Props) => {
  const [input, setInput] = useState("");

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case "Backspace":
              if ((e.target as HTMLInputElement).value) return;
            /* falls through */
            case "Delete":
              pop?.();
              return;
          }
        }}
        placeholder="Search for a GitHub repo..."
        value={input}
      />
      <button
        className={styles.button}
        onClick={() => {
          push?.(input);
          setInput("");
        }}
      >
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
