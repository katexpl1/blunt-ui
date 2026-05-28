import { render, screen, fireEvent } from "../../test-utils";
import "@testing-library/jest-dom";
import { Form } from "./Form";
import { FormField } from "./FormField";

describe("Form", () => {
  it("renders children", () => {
    render(
      <Form>
        <button>submit</button>
      </Form>,
    );
    expect(screen.getByText("submit")).toBeInTheDocument();
  });

  it("calls onSubmit when submitted", () => {
    const onSubmit = jest.fn();

    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">go</button>
      </Form>,
    );
    fireEvent.click(screen.getByText("go"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("prevents default form submission", () => {
    const onSubmit = jest.fn();

    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">go</button>
      </Form>,
    );
    fireEvent.submit(screen.getByText("go").closest("form")!);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

describe("FormField", () => {
  it("renders the label", () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows required asterisk when required", () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>,
    );
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <FormField label="Email" error="Required">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("shows helper text when no error", () => {
    render(
      <FormField label="Email" helperText="we won't spam">
        <input />
      </FormField>,
    );
    expect(screen.getByText("we won't spam")).toBeInTheDocument();
  });

  it("shows error over helper text", () => {
    render(
      <FormField label="Email" error="invalid email" helperText="we won't spam">
        <input />
      </FormField>,
    );
    expect(screen.getByText("invalid email")).toBeInTheDocument();
    expect(screen.queryByText("we won't spam")).not.toBeInTheDocument();
  });

  it("wires label htmlFor to child id", () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>,
    );

    const label = screen.getByText("Email").closest("label");
    const input = screen.getByRole("textbox");

    expect(label?.htmlFor).toBe(input.id);
  });
});
