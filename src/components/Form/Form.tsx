import type { FormProps } from "./Form.types";
import { StyledForm } from "./Form.styles";

export function Form({ onSubmit, children, ...props }: FormProps) {
  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      noValidate
      {...props}
    >
      {children}
    </StyledForm>
  );
}

Form.displayName = "Form";
