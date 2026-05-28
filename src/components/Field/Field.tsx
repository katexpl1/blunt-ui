import { Link } from "../Link";
import { Wrapper, FieldLabel, Value } from "./Field.styles";
import type { FieldProps } from "./Field.types";

export function Field({ label, value, href }: FieldProps) {
  return (
    <Wrapper>
      <FieldLabel>{label}</FieldLabel>
      {href ? (
        <Link href={href} external>
          {value}
        </Link>
      ) : (
        <Value>{value ?? "—"}</Value>
      )}
    </Wrapper>
  );
}

Field.displayName = "Field";
