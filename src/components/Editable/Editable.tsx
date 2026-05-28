import { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Wrapper, Preview, EditInput } from "./Editable.styles";
import type { EditableProps } from "./Editable.types";

export function Editable({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  onCancel,
  placeholder = "Click to edit",
  disabled = false,
}: EditableProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    if (disabled) return;
    setDraft(currentValue);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const commit = () => {
    if (!isControlled) setInternalValue(draft);
    onChange?.(draft);
    onSubmit?.(draft);
    setIsEditing(false);
  };

  const cancel = () => {
    onCancel?.(currentValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commit();
    } else if (e.key === "Escape") {
      cancel();
    }
  };

  if (isEditing) {
    return (
      <Wrapper>
        <EditInput
          ref={inputRef}
          value={draft}
          size={Math.max(draft.length, placeholder.length, 10)}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          aria-label="Edit value"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Preview
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? undefined : 0}
        $disabled={disabled}
        $empty={!currentValue}
        onClick={startEditing}
        onKeyDown={(e) => e.key === "Enter" && startEditing()}
      >
        {currentValue || placeholder}
      </Preview>
    </Wrapper>
  );
}

Editable.displayName = "Editable";
