import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Chip from "./Chip";
import { Search } from "react-feather";

import styles from "./MultiSelectTextInput.module.css";

interface Props {
  className?: string;
  onSubmit?: (selections: string[]) => void;
  placeholder?: string;
  title?: string;
  useState?: [string[], Dispatch<SetStateAction<string[]>>];
}

const MultiSelectTextInput = ({
  className,
  onSubmit,
  placeholder,
  title,
}: Props) => {
  const [selections, setSelections] = useState<string[]>([]);

  useEffect(() => {
    selections && onSubmit?.(selections);
  }, [onSubmit, selections]);

  const push = (selection: string) => {
    if (selection && !selections.includes(selection)) {
      const pushed = [...selections, selection].sort();
      setSelections(pushed);

      return pushed;
    }
  };

  const pop = () => {
    const [, ...remaining] = [...selections].reverse();
    const popped = [...remaining].reverse();

    setSelections([...remaining].reverse());
    return popped;
  };

  return (
    <form
      className={className}
      onSubmit={(
        e: React.FormEvent<HTMLFormElement> & { target: { value: string }[] }
      ) => {
        e.preventDefault();

        const value = e.target[0].value;
        push(value);
        e.target[0].value = "";
      }}
    >
      <div className={styles.container}>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            onKeyDown={(e: any) => {
              switch (e.key) {
                case "Backspace":
                  if (e.target.value) return;
                /* falls through */
                case "Delete":
                  pop();
                  return;
              }
            }}
            placeholder={placeholder}
          />
          <button className={styles.button}>
            <Search />
          </button>
        </div>

        {selections?.length > 0 ? (
          <button
            type="reset"
            className={styles.clear}
            onClick={() => {
              setSelections([]);
            }}
          >
            <small>
              <i>Clear All</i>
            </small>
          </button>
        ) : null}
      </div>
      <div className={styles.chips}>
        {title && selections?.length > 0 ? <i>{title}</i> : null}
        {selections.map((name, index: number) => (
          <Chip
            key={index}
            onClick={(value: any) => {
              setSelections(
                selections.filter((selection: string) => value !== selection)
              );
            }}
          >
            {name}
          </Chip>
        ))}
      </div>
    </form>
  );
};

export default MultiSelectTextInput;
