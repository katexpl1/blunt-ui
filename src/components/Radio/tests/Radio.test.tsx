import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Radio } from "../Radio";

describe("Radio component", () => {
  it("renders with label", () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("shows helper text", () => {
    render(<Radio label="Option A" helperText="Choose carefully" />);
    expect(screen.getByText("Choose carefully")).toBeInTheDocument();
  });

  it("is checked when checked prop is true", () => {
    render(<Radio label="Option A" checked onChange={() => {}} />);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Radio label="Option A" disabled />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<Radio label="Option A" onChange={handleChange} />);
    fireEvent.click(screen.getByRole("radio"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("has accessible name via label", () => {
    render(<Radio label="Agree to terms" />);
    expect(
      screen.getByRole("radio", { name: "Agree to terms" }),
    ).toBeInTheDocument();
  });
});
