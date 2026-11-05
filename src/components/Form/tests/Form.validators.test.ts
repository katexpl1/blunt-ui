import {
  required,
  minLength,
  maxLength,
  isEmail,
  isUrl,
  pattern,
  composeValidators,
} from "../validators/Form.validators";

describe("required", () => {
  it("returns undefined for a non-empty value", () => {
    expect(required()("hello")).toBeUndefined();
  });

  it("returns default message for an empty string", () => {
    expect(required()("")).toBe("Required");
  });

  it("returns default message for whitespace-only string", () => {
    expect(required()("   ")).toBe("Required");
  });

  it("returns custom message when provided", () => {
    expect(required("This field is required")("")).toBe(
      "This field is required",
    );
  });
});

describe("minLength", () => {
  it("returns undefined when value meets minimum length", () => {
    expect(minLength(3)("abc")).toBeUndefined();
  });

  it("returns undefined when value exceeds minimum length", () => {
    expect(minLength(3)("abcdef")).toBeUndefined();
  });

  it("returns default message when value is too short", () => {
    expect(minLength(5)("ab")).toBe("Must be at least 5 characters");
  });

  it("returns custom message when provided", () => {
    expect(minLength(5, "Too short")("ab")).toBe("Too short");
  });
});

describe("maxLength", () => {
  it("returns undefined when value is within maximum length", () => {
    expect(maxLength(10)("hello")).toBeUndefined();
  });

  it("returns undefined when value equals maximum length", () => {
    expect(maxLength(5)("hello")).toBeUndefined();
  });

  it("returns default message when value is too long", () => {
    expect(maxLength(3)("toolong")).toBe("Must be at most 3 characters");
  });

  it("returns custom message when provided", () => {
    expect(maxLength(3, "Too long")("toolong")).toBe("Too long");
  });
});

describe("isEmail", () => {
  it("returns undefined for a valid email", () => {
    expect(isEmail()("user@example.com")).toBeUndefined();
  });

  it("returns error for missing at-sign", () => {
    expect(isEmail()("notanemail")).toBe("Enter a valid email");
  });

  it("returns error for missing domain", () => {
    expect(isEmail()("user@")).toBe("Enter a valid email");
  });

  it("returns custom message when provided", () => {
    expect(isEmail("Invalid email")("bad")).toBe("Invalid email");
  });
});

describe("isUrl", () => {
  it("returns undefined for a valid http URL", () => {
    expect(isUrl()("https://example.com")).toBeUndefined();
  });

  it("returns undefined for a valid http URL with path", () => {
    expect(isUrl()("http://example.com/path?q=1")).toBeUndefined();
  });

  it("returns error for a plain string without protocol", () => {
    expect(isUrl()("example.com")).toBe("Enter a valid URL");
  });

  it("returns error for an empty string", () => {
    expect(isUrl()("")).toBe("Enter a valid URL");
  });

  it("returns custom message when provided", () => {
    expect(isUrl("Not a URL")("bad")).toBe("Not a URL");
  });
});

describe("pattern", () => {
  it("returns undefined when value matches the pattern", () => {
    expect(pattern(/^\d+$/, "Digits only")("12345")).toBeUndefined();
  });

  it("returns message when value does not match the pattern", () => {
    expect(pattern(/^\d+$/, "Digits only")("abc")).toBe("Digits only");
  });
});

describe("composeValidators", () => {
  it("returns undefined when all validators pass", () => {
    const validate = composeValidators(required(), minLength(3), maxLength(10));

    expect(validate("hello")).toBeUndefined();
  });

  it("returns the first error when a validator fails", () => {
    const validate = composeValidators(required(), minLength(5));

    expect(validate("")).toBe("Required");
  });

  it("returns error from second validator when first passes", () => {
    const validate = composeValidators(required(), minLength(5));

    expect(validate("ab")).toBe("Must be at least 5 characters");
  });

  it("stops at the first failing validator", () => {
    const firstValidator = jest.fn(() => "First error");
    const secondValidator = jest.fn(() => "Second error");
    const validate = composeValidators(firstValidator, secondValidator);

    const result = validate("test");

    expect(result).toBe("First error");
    expect(secondValidator).not.toHaveBeenCalled();
  });
});
