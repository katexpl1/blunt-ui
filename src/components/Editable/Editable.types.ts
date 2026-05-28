export interface EditableProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: (previousValue: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
