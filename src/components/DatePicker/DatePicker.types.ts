export type DatePickerSizes = "sm" | "md" | "lg";

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  size?: DatePickerSizes;
  disabled?: boolean;
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  formatDate?: (date: Date) => string;
  id?: string;
  error?: boolean | string;
}
