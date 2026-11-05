import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Textarea } from "../Textarea";

describe("Textarea", () => {
  it("renders label", () => {
    render(<Textarea label="Notes" />);
    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("shows helper text", () => {
    render(<Textarea helperText="Max 500 characters" />);
    expect(screen.getByText("Max 500 characters")).toBeInTheDocument();
  });

  it("shows error message when error is a string", () => {
    render(<Textarea error="Field is required" />);
    expect(screen.getByText("Field is required")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = jest.fn();

    render(<Textarea onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders all sizes without errors", () => {
    const { rerender } = render(<Textarea size="sm" />);
    rerender(<Textarea size="md" />);
    rerender(<Textarea size="lg" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is present", () => {
    render(<Textarea error="Required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });
});
