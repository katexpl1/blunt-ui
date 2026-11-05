import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  CalendarHeader,
  CalendarPopover,
  ClearButton,
  DatePickerWrapper,
  DayCell,
  DayGrid,
  DayHeader,
  IconSlot,
  MonthYear,
  NavButton,
  TriggerContainer,
  TriggerText,
} from "./DatePicker.styles";
import type { DatePickerProps } from "./DatePicker.types";
import { FormField } from "../Form/FormField";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate) {
    const min = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate(),
    );

    if (date < min) {
      return true;
    }
  }

  if (maxDate) {
    const max = new Date(
      maxDate.getFullYear(),
      maxDate.getMonth(),
      maxDate.getDate(),
    );

    if (date > max) {
      return true;
    }
  }

  return false;
}

function defaultFormatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAccessibleDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function parseDateString(str: string): Date | null {
  if (!str) {
    return null;
  }
  const parts = str.split("-");
  if (parts.length !== 3) {
    return null;
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }
  return new Date(year, month - 1, day);
}

function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type RangePhase = "from" | "to";

export function DatePicker({
  name,
  label,
  value,
  onChange,
  placeholder = "Select date...",
  size = "md",
  disabled = false,
  clearable = false,
  minDate,
  maxDate,
  formatDate,
  error,
  required,
  helperText,
  mode = "single",
  nameFrom,
  nameTo,
  valueFrom,
  valueTo,
}: DatePickerProps) {
  const isRange = mode === "range";

  const parsedValue = parseDateString(value ?? "");
  const parsedFrom = parseDateString(valueFrom ?? "");
  const parsedTo = parseDateString(valueTo ?? "");

  const today = new Date();

  const getInitialViewDate = (): Date => {
    if (isRange) {
      return parsedFrom ?? parsedTo ?? today;
    }
    return parsedValue ?? today;
  };

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() =>
    getInitialViewDate().getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(() =>
    getInitialViewDate().getMonth(),
  );
  const [rangePhase, setRangePhase] = useState<RangePhase>("from");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        if (isRange) {
          setRangePhase("from");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, isRange]);

  useEffect(() => {
    if (!isRange && parsedValue) {
      setViewYear(parsedValue.getFullYear());
      setViewMonth(parsedValue.getMonth());
    }
  }, [value, isRange]);

  useEffect(() => {
    if (isRange && parsedFrom) {
      setViewYear(parsedFrom.getFullYear());
      setViewMonth(parsedFrom.getMonth());
    }
  }, [valueFrom, isRange]);

  const getDisplayValue = (): string => {
    if (!isRange) {
      if (!parsedValue) {
        return "";
      }
      return formatDate
        ? formatDate(parsedValue)
        : defaultFormatDate(parsedValue);
    }

    if (!parsedFrom && !parsedTo) {
      return "";
    }

    const formatter = formatDate ?? defaultFormatDate;

    if (parsedFrom && parsedTo) {
      return `${formatter(parsedFrom)} - ${formatter(parsedTo)}`;
    }

    if (parsedFrom) {
      return `${formatter(parsedFrom)} - ...`;
    }

    return "";
  };

  const displayValue = getDisplayValue();

  const hasRangeValue = isRange ? !!(parsedFrom || parsedTo) : !!parsedValue;

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(viewYear, viewMonth, day);

    if (!isRange) {
      onChange(name ?? "", formatDateToString(clickedDate));
      setOpen(false);
      return;
    }

    if (rangePhase === "from") {
      onChange(nameFrom ?? "", formatDateToString(clickedDate));
      setRangePhase("to");
      return;
    }

    // rangePhase === "to"
    if (!parsedFrom) {
      // No from date yet — treat as new from
      onChange(nameFrom ?? "", formatDateToString(clickedDate));
      setRangePhase("to");
      return;
    }

    if (isSameDay(clickedDate, parsedFrom)) {
      // Same date clicked twice — clear both and reset
      onChange(nameFrom ?? "", "");
      onChange(nameTo ?? "", "");
      setRangePhase("from");
      return;
    }

    if (clickedDate >= parsedFrom) {
      // Clicked date is after or equal to from — set as to
      onChange(nameTo ?? "", formatDateToString(clickedDate));
      setRangePhase("from");
      setOpen(false);
      return;
    }

    // Clicked date is before from — swap: clicked becomes from, old from becomes to
    onChange(nameTo ?? "", formatDateToString(parsedFrom));
    onChange(nameFrom ?? "", formatDateToString(clickedDate));
    setRangePhase("from");
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRange) {
      onChange(nameFrom ?? "", "");
      onChange(nameTo ?? "", "");
      setRangePhase("from");
    } else {
      onChange(name ?? "", "");
    }
  };

  const handleTriggerClick = () => {
    if (disabled) {
      return;
    }
    const willOpen = !open;
    setOpen(willOpen);
    if (!willOpen && isRange) {
      setRangePhase("from");
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      const willOpen = !open;
      setOpen(willOpen);
      if (!willOpen && isRange) {
        setRangePhase("from");
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
      if (isRange) {
        setRangePhase("from");
      }
    }
  };

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const cells: { day: number; currentMonth: boolean }[] = [];

  const prevMonthDays = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1,
  );

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, currentMonth: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true });
  }

  const remaining = 42 - cells.length;

  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, currentMonth: false });
  }

  return (
    <FormField
      label={label}
      error={error}
      helperText={helperText}
      required={required}
    >
      <DatePickerWrapper ref={wrapperRef}>
        <TriggerContainer
          $size={size}
          $error={!!error}
          $disabled={disabled}
          role="combobox"
          aria-haspopup="true"
          aria-expanded={open}
          tabIndex={disabled ? -1 : 0}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        >
          <TriggerText $hasValue={hasRangeValue}>
            {displayValue || placeholder}
          </TriggerText>
          {clearable && hasRangeValue ? (
            <ClearButton
              type="button"
              onClick={handleClear}
              aria-label="Clear date"
            >
              <X size={14} />
            </ClearButton>
          ) : (
            <IconSlot aria-hidden="true">
              <Calendar size={14} />
            </IconSlot>
          )}
        </TriggerContainer>

        {open && (
          <CalendarPopover role="dialog" aria-label="Calendar">
            <CalendarHeader>
              <NavButton
                type="button"
                onClick={goToPrevMonth}
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </NavButton>
              <MonthYear>
                {MONTHS[viewMonth]} {viewYear}
              </MonthYear>
              <NavButton
                type="button"
                onClick={goToNextMonth}
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </NavButton>
            </CalendarHeader>

            <DayGrid>
              {DAY_NAMES.map((dayName) => (
                <DayHeader key={dayName}>{dayName}</DayHeader>
              ))}
              {cells.map((cell, i) => {
                if (!cell.currentMonth) {
                  return (
                    <DayCell
                      key={i}
                      type="button"
                      $currentMonth={false}
                      $selected={false}
                      $today={false}
                      disabled
                      tabIndex={-1}
                    >
                      {cell.day}
                    </DayCell>
                  );
                }

                const date = new Date(viewYear, viewMonth, cell.day);
                const isToday = isSameDay(date, today);
                const isDisabled = isDateDisabled(date, minDate, maxDate);

                if (isRange) {
                  const isRangeStart = parsedFrom
                    ? isSameDay(date, parsedFrom)
                    : false;
                  const isRangeEnd = parsedTo
                    ? isSameDay(date, parsedTo)
                    : false;
                  const isInRange =
                    parsedFrom && parsedTo
                      ? date > parsedFrom && date < parsedTo
                      : false;

                  return (
                    <DayCell
                      key={i}
                      type="button"
                      $currentMonth={true}
                      $selected={false}
                      $today={isToday}
                      $rangeStart={isRangeStart}
                      $rangeEnd={isRangeEnd}
                      $inRange={isInRange}
                      disabled={isDisabled}
                      aria-label={formatAccessibleDate(date)}
                      aria-pressed={isRangeStart || isRangeEnd}
                      onClick={() => handleDayClick(cell.day)}
                    >
                      {cell.day}
                    </DayCell>
                  );
                }

                const isSelected = parsedValue
                  ? isSameDay(date, parsedValue)
                  : false;

                return (
                  <DayCell
                    key={i}
                    type="button"
                    $currentMonth={true}
                    $selected={isSelected}
                    $today={isToday}
                    disabled={isDisabled}
                    aria-label={formatAccessibleDate(date)}
                    aria-pressed={isSelected}
                    onClick={() => handleDayClick(cell.day)}
                  >
                    {cell.day}
                  </DayCell>
                );
              })}
            </DayGrid>
          </CalendarPopover>
        )}
      </DatePickerWrapper>
    </FormField>
  );
}

DatePicker.displayName = "DatePicker";
