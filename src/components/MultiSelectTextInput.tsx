import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Chip from "./Chip";

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
  useState: useOtherState,
}: Props) => {
  const [state, setState] = useState<string[]>([]);
  const [selections, setSelections] = useOtherState || [state, setState];

  useEffect(() => {
    selections && onSubmit?.(selections);
  }, [selections]);

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
      <input
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
        onBlur={(e) => {
          push(e.target.value);

          e.target.value = "";
        }}
        placeholder={placeholder}
      />
    </form>
  );
};

export default MultiSelectTextInput;
