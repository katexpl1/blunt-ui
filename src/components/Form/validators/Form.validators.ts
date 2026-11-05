type Validator = (value: string) => string | undefined;

export const required =
  (message = "Required"): Validator =>
  (value) => {
    if (!value.trim()) {
      return message;
    }

    return undefined;
  };

export const minLength =
  (n: number, message?: string): Validator =>
  (value) => {
    if (value.length < n) {
      return message ?? `Must be at least ${n} characters`;
    }

    return undefined;
  };

export const maxLength =
  (n: number, message?: string): Validator =>
  (value) => {
    if (value.length > n) {
      return message ?? `Must be at most ${n} characters`;
    }

    return undefined;
  };

export const isEmail =
  (message = "Enter a valid email"): Validator =>
  (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return message;
    }

    return undefined;
  };

export const isUrl =
  (message = "Enter a valid URL"): Validator =>
  (value) => {
    try {
      new URL(value);

      return undefined;
    } catch {
      return message;
    }
  };

export const pattern =
  (regex: RegExp, message: string): Validator =>
  (value) => {
    if (!regex.test(value)) {
      return message;
    }

    return undefined;
  };

export function composeValidators(...validators: Validator[]): Validator {
  return (value) => {
    for (const validator of validators) {
      const error = validator(value);

      if (error !== undefined) {
        return error;
      }
    }

    return undefined;
  };
}
