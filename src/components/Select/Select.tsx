import { useCallback, useId, useRef, useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import type { KeyboardEvent } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  Wrapper,
  Trigger,
  TriggerText,
  TriggerIcons,
  ChevronIcon,
  ClearButton,
  DropdownPanel,
  OptionItem,
  HelperText,
  WidthSetter,
  SearchWrapper,
  SearchInput,
  NoOptions,
} from "./Select.styles";
import type { SelectProps, SelectOption } from "./Select.types";

interface DropdownCoords {
  top: number;
  bottom: number;
  left: number;
  width: number;
  openUpward: boolean;
}

export function Select({
  options,
  placeholder,
  size = "md",
  variant = "default",
  error,
  fullWidth,
  clearable,
  onClear,
  id,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  searchable,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const listId = `${selectId}-list`;
  const searchId = `${selectId}-search`;
  const errorMessage = typeof error === "string" ? error : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownCoords, setDropdownCoords] = useState<DropdownCoords>({
    top: 0,
    bottom: 0,
    left: 0,
    width: 0,
    openUpward: false,
  });
  const [internalValue, setInternalValue] = useState(
    (defaultValue as string) ?? "",
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(
    (option) => option.value === currentValue,
  );

  const filteredOptions =
    searchable && searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : options;

  const updateDropdownCoords = useCallback(() => {
    if (!triggerRef.current) {
      return;
    }
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = dropdownRef.current?.getBoundingClientRect().height ?? 200;
    const spaceBelow = viewportHeight - rect.bottom;
    const openUpward = spaceBelow < dropdownHeight + 4 && rect.top > spaceBelow;

    setDropdownCoords({
      top: rect.bottom + 4,
      bottom: viewportHeight - rect.top + 4,
      left: rect.left,
      width: rect.width,
      openUpward,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    updateDropdownCoords();
    window.addEventListener("scroll", updateDropdownCoords, true);
    window.addEventListener("resize", updateDropdownCoords);
    return () => {
      window.removeEventListener("scroll", updateDropdownCoords, true);
      window.removeEventListener("resize", updateDropdownCoords);
    };
  }, [isOpen, updateDropdownCoords]);

  useLayoutEffect(() => {
    if (isOpen) {
      updateDropdownCoords();
    }
  }, [isOpen, updateDropdownCoords]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideWrapper = wrapperRef.current?.contains(
        event.target as Node,
      );
      const isInsideDropdown = dropdownRef.current?.contains(
        event.target as Node,
      );
      if (!isInsideWrapper && !isInsideDropdown) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
    if (!isOpen) {
      setSearchQuery("");
      setFocusedIndex(-1);
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    if (focusedIndex < 0) {
      return;
    }
    const element = document.getElementById(`${listId}-option-${focusedIndex}`);
    if (element && typeof element.scrollIntoView === "function") {
      element.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, listId]);

  function getNextEnabledIndex(
    currentIndex: number,
    direction: 1 | -1,
  ): number {
    let index = currentIndex + direction;
    while (index >= 0 && index < filteredOptions.length) {
      if (!filteredOptions[index].disabled) {
        return index;
      }
      index += direction;
    }
    return currentIndex;
  }

  function getFirstEnabledIndex(): number {
    return filteredOptions.findIndex((option) => !option.disabled);
  }

  function getLastEnabledIndex(): number {
    for (let i = filteredOptions.length - 1; i >= 0; i--) {
      if (!filteredOptions[i].disabled) {
        return i;
      }
    }
    return -1;
  }

  function handleSelect(option: SelectOption) {
    if (option.disabled) {
      return;
    }
    if (!isControlled) {
      setInternalValue(option.value);
    }
    const syntheticEvent = {
      target: { name: name ?? "", value: option.value },
      currentTarget: { name: name ?? "", value: option.value },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(syntheticEvent);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleClear(event: React.MouseEvent) {
    event.stopPropagation();
    if (!isControlled) {
      setInternalValue("");
    }
    const syntheticEvent = {
      target: { name: name ?? "", value: "" },
      currentTarget: { name: name ?? "", value: "" },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(syntheticEvent);
    onClear?.();
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }

    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
        if (!searchable) {
          setFocusedIndex(getFirstEnabledIndex());
        }
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (searchable) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((previous) => getNextEnabledIndex(previous, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((previous) => getNextEnabledIndex(previous, -1));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setFocusedIndex(getFirstEnabledIndex());
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setFocusedIndex(getLastEnabledIndex());
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && focusedIndex >= 0) {
      event.preventDefault();
      handleSelect(filteredOptions[focusedIndex]);
    }
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((previous) =>
        previous < 0
          ? getFirstEnabledIndex()
          : getNextEnabledIndex(previous, 1),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((previous) =>
        previous < 0
          ? getLastEnabledIndex()
          : getNextEnabledIndex(previous, -1),
      );
      return;
    }

    if (event.key === "Enter" && focusedIndex >= 0) {
      event.preventDefault();
      handleSelect(filteredOptions[focusedIndex]);
    }
  }

  const showClear = clearable && !!currentValue && !disabled;
  const focusedOptionId =
    focusedIndex >= 0 ? `${listId}-option-${focusedIndex}` : undefined;

  return (
    <Wrapper ref={wrapperRef} $fullWidth={fullWidth}>
      <WidthSetter aria-hidden="true">
        {placeholder && <TriggerText>{placeholder}</TriggerText>}
        {options.map((option) => (
          <TriggerText key={option.value}>{option.label}</TriggerText>
        ))}
      </WidthSetter>

      <Trigger
        ref={triggerRef}
        id={selectId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listId : undefined}
        aria-activedescendant={
          isOpen && !searchable ? focusedOptionId : undefined
        }
        aria-invalid={!!error}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        $size={size}
        $variant={variant}
        $error={!!error}
        $disabled={disabled}
        $open={isOpen}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((previous) => !previous)}
        onKeyDown={handleTriggerKeyDown}
      >
        <TriggerText $placeholder={!selectedOption}>
          {selectedOption?.label ?? placeholder ?? "Select..."}
        </TriggerText>
        <TriggerIcons>
          {showClear && (
            <ClearButton
              type="button"
              onClick={handleClear}
              aria-label="Clear selection"
            >
              <X size={14} />
            </ClearButton>
          )}
          <ChevronIcon $open={isOpen} aria-hidden="true">
            <ChevronDown size={14} />
          </ChevronIcon>
        </TriggerIcons>
      </Trigger>

      {isOpen &&
        createPortal(
          <DropdownPanel
            ref={dropdownRef}
            id={listId}
            role="listbox"
            aria-label={placeholder ?? "Options"}
            style={{
              position: "fixed",
              top: dropdownCoords.openUpward ? "auto" : dropdownCoords.top,
              bottom: dropdownCoords.openUpward ? dropdownCoords.bottom : "auto",
              left: dropdownCoords.left,
              width: dropdownCoords.width,
            }}
          >
            {searchable && (
              <SearchWrapper>
                <SearchInput
                  ref={searchRef}
                  id={searchId}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  aria-label="Search options"
                  aria-controls={listId}
                  aria-activedescendant={focusedOptionId}
                />
              </SearchWrapper>
            )}

            {filteredOptions.length === 0 && (
              <NoOptions>No options found</NoOptions>
            )}

            {filteredOptions.map((option, index) => (
              <OptionItem
                key={option.value}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={option.value === currentValue}
                aria-disabled={option.disabled}
                $selected={option.value === currentValue}
                $focused={index === focusedIndex}
                $disabled={option.disabled}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
              >
                {option.label}
              </OptionItem>
            ))}
          </DropdownPanel>,
          document.body,
        )}

      {errorMessage && <HelperText $error>{errorMessage}</HelperText>}
    </Wrapper>
  );
}

Select.displayName = "Select";
