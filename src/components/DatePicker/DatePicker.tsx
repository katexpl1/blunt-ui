import { useEffect, useId, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  CalendarHeader,
  CalendarPopover,
  ClearButton,
  DatePickerWrapper,
  DayCell,
  DayGrid,
  DayHeader,
  HelperText,
  IconSlot,
  MonthYear,
  NavButton,
  TriggerContainer,
  TriggerText,
} from "./DatePicker.styles";
import type { DatePickerProps } from "./DatePicker.types";

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

    if (date < min) return true;
  }

  if (maxDate) {
    const max = new Date(
      maxDate.getFullYear(),
      maxDate.getMonth(),
      maxDate.getDate(),
    );

    if (date > max) return true;
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

export function DatePicker({
  value = null,
  onChange,
  placeholder = "Select date...",
  size = "md",
  disabled = false,
  clearable = false,
  minDate,
  maxDate,
  formatDate,
  id,
  error,
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() =>
    (value ?? today).getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(() => (value ?? today).getMonth());

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  const displayValue = value
    ? formatDate
      ? formatDate(value)
      : defaultFormatDate(value)
    : "";

  const handleDayClick = (day: number) => {
    onChange?.(new Date(viewYear, viewMonth, day));
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
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
    <DatePickerWrapper ref={wrapperRef}>
      <TriggerContainer
        id={inputId}
        $size={size}
        $error={!!error}
        $disabled={disabled}
        role="combobox"
        aria-haspopup="true"
        aria-expanded={open}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (!disabled) setOpen((o) => !o);
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            setOpen((o) => !o);
          }

          if (e.key === "Escape") setOpen(false);
        }}
      >
        <TriggerText $hasValue={!!value}>
          {displayValue || placeholder}
        </TriggerText>
        {clearable && value ? (
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

      {typeof error === "string" && <HelperText $error>{error}</HelperText>}

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
            {DAY_NAMES.map((name) => (
              <DayHeader key={name}>{name}</DayHeader>
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
              const isSelected = value ? isSameDay(date, value) : false;
              const isToday = isSameDay(date, today);
              const isDisabled = isDateDisabled(date, minDate, maxDate);

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
  );
}

DatePicker.displayName = "DatePicker";
