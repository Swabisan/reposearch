import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";

import { SortBy, SortOptions, SortOrder } from "../../api/github";

import styles from "./Sort.module.css";

const Sort = () => {
  const [sort, setSort] = useState<SortBy>(undefined);
  const [order, setOrder] = useState<SortOrder>("desc");
  const toggleSortOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  const icon = order === "desc" ? <ArrowDown /> : <ArrowUp />;

  return (
    <div className={styles.container}>
      <select></select>
      <button
        className={styles.sortOrder}
        onClick={() => toggleSortOrder()}
        type="button"
      >
        {icon}
      </button>
    </div>
  );
};

export default Sort;
