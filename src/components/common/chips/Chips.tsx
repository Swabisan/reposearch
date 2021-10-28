import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

import Chip from "./Chip";

import styles from "./Chips.module.css";

interface Props {
  className?: string;
  children: React.ReactElement;
  onSubmit?: (selections: string[]) => void;
  title?: string;
  useState?: [string[], Dispatch<SetStateAction<string[]>>];
}

const Chips = ({
  className,
  children,
  onSubmit,
  title,
  useState: useOtherState,
}: Props) => {
  const [state, setState] = useState<string[]>([]);
  const [selections, setSelections] = useMemo(
    () => useOtherState || [state, setState],
    [useOtherState, [state, setState]]
  );

  const push = (selection: string) => {
    if (selection && !selections.includes(selection)) {
      const pushed = [...selections, selection].sort();
      setSelections(pushed);
      onSubmit?.(pushed);

      return pushed;
    }
  };

  const pop = () => {
    const [, ...remaining] = [...selections].reverse();
    const popped = [...remaining].reverse();

    setSelections([...remaining].reverse());
    onSubmit?.(popped);
    return popped;
  };

  return (
    <form
      className={className}
      onSubmit={(
        e: React.FormEvent<HTMLFormElement> & { target: { value: string }[] }
      ) => {
        e.preventDefault();
      }}
    >
      <div className={styles.inputArea}>
        {React.cloneElement(children, { push, pop })}
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
            key={selections[index]}
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

export default Chips;
