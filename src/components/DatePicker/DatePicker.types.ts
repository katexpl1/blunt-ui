export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps {
  // Single mode (unchanged)
  name?: string;
  value?: string;
  // Shared
  onChange: (name: string, value: string) => void;
  label?: string;
  size?: DatePickerSize;
  disabled?: boolean;
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  formatDate?: (date: Date) => string;
  placeholder?: string;
  error?: boolean | string;
  required?: boolean;
  helperText?: string;
  // Range mode (all optional — only used when mode="range")
  mode?: "single" | "range";
  nameFrom?: string;
  nameTo?: string;
  valueFrom?: string;
  valueTo?: string;
}
