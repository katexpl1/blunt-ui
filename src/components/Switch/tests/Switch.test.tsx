import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Switch } from "../Switch";

describe("Switch component", () => {
  it("renders with label", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("has accessible name via label", () => {
    render(<Switch label="Dark mode" />);
    expect(
      screen.getByRole("switch", { name: "Dark mode" }),
    ).toBeInTheDocument();
  });

  it("is checked when checked prop is true", () => {
    render(<Switch label="Dark mode" checked onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("is unchecked when checked prop is false", () => {
    render(<Switch label="Dark mode" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<Switch label="Dark mode" onChange={handleChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
