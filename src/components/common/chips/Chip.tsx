import React from "react";

import styles from "./Chip.module.css";

interface Props {
  onClick?: (value: string) => void;
}

const Chip = ({ children, onClick }: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={styles.chip}
      onClick={(e: any) => {
        onClick?.(e.target.innerText as string);
      }}
    >
      {children}
    </button>
  );
};

export default Chip;
