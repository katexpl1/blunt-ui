import { act, renderHook } from "@testing-library/react";
import { useForm } from "./useForm";

const initialValues = { email: "", password: "" };

const validate = (v: typeof initialValues) => ({
  email: !v.email.trim() ? "required" : undefined,
  password: v.password.length < 8 ? "min 8 chars" : undefined,
});

describe("useForm", () => {
  it("returns initial values", () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    expect(result.current.values).toEqual(initialValues);
  });

  it("handleChange updates the correct field", () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@test.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.values.email).toBe("test@test.com");
  });

  it("handleBlur marks field as touched", () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    act(() => {
      result.current.handleBlur({
        target: { name: "email" },
      } as React.FocusEvent<HTMLInputElement>);
    });
    expect(result.current.touched.email).toBe(true);
  });

  it("errors only shown for touched fields", () => {
    const { result } = renderHook(() => useForm({ initialValues, validate }));
    expect(result.current.errors.email).toBeUndefined();

    act(() => {
      result.current.handleBlur({
        target: { name: "email" },
      } as React.FocusEvent<HTMLInputElement>);
    });
    expect(result.current.errors.email).toBe("required");
  });

  it("handleSubmit marks all fields as touched", () => {
    const { result } = renderHook(() => useForm({ initialValues, validate }));
    act(() => {
      result.current.handleSubmit();
    });
    expect(result.current.touched.email).toBe(true);
    expect(result.current.touched.password).toBe(true);
  });

  it("onSubmit not called when there are validation errors", () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() =>
      useForm({ initialValues, validate, onSubmit }),
    );
    act(() => {
      result.current.handleSubmit();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("onError called with errors when validation fails", () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useForm({ initialValues, validate, onError }),
    );
    act(() => {
      result.current.handleSubmit();
    });
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ email: "required" }),
    );
  });

  it("onSubmit called with valid values", async () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() =>
      useForm({ initialValues, validate, onSubmit }),
    );
    act(() => {
      result.current.setFieldValue("email", "a@b.com");
      result.current.setFieldValue("password", "12345678");
    });
    await act(async () => {
      result.current.handleSubmit();
    });
    expect(onSubmit).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "12345678",
    });
  });

  it("reset restores initial state", () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@test.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.touched).toEqual({});
    expect(result.current.errors).toEqual({});
  });

  it("setFieldValue updates a specific field", () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    act(() => {
      result.current.setFieldValue("email", "hello@test.com");
    });
    expect(result.current.values.email).toBe("hello@test.com");
  });
});
