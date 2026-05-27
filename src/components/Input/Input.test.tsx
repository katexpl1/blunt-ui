import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("Input component", () => {
  it("renders label correctly", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows helper text", () => {
    render(<Input helperText="Helper" />);
    expect(screen.getByText("Helper")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Input error="Error message" />);
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("handles change event", () => {
    render(<Input placeholder="test" />);

    const input = screen.getByPlaceholderText("test");

    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveValue("abc");
  });

  it("clears value when clearable", () => {
    render(<Input clearable defaultValue="test" />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
