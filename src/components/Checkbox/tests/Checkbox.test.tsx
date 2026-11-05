import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Checkbox } from "../Checkbox";

describe("Checkbox component", () => {
  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("shows error message when error is a string", () => {
    render(<Checkbox label="Accept" error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("is checked when checked prop is true", () => {
    render(<Checkbox label="Accept" checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox label="Accept" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Accept" onChange={handleChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("has accessible name via label", () => {
    render(<Checkbox label="Subscribe to newsletter" />);
    expect(
      screen.getByRole("checkbox", { name: "Subscribe to newsletter" }),
    ).toBeInTheDocument();
  });
});
