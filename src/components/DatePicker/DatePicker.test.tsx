import { render, screen, fireEvent } from "../../test-utils";
import "@testing-library/jest-dom";
import { DatePicker } from "./DatePicker";

// June 15, 2024 — a fixed date for predictable calendar state
const JUNE_15 = new Date(2024, 5, 15);

describe("DatePicker", () => {
  it("renders with placeholder when no value", () => {
    render(<DatePicker placeholder="Pick a date" onChange={() => {}} />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("renders formatted date when value is set", () => {
    render(<DatePicker value={JUNE_15} onChange={() => {}} />);
    expect(screen.getByText("Jun 15, 2024")).toBeInTheDocument();
  });

  it("opens calendar on click", () => {
    render(<DatePicker value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(
      screen.getByRole("dialog", { name: /calendar/i }),
    ).toBeInTheDocument();
  });

  it("shows current month and year in calendar header", () => {
    render(<DatePicker value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("June 2024")).toBeInTheDocument();
  });

  it("calls onChange with the selected date and closes calendar", () => {
    const onChange = jest.fn();

    render(<DatePicker value={JUNE_15} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /june 10/i }));

    expect(onChange).toHaveBeenCalledWith(new Date(2024, 5, 10));
    expect(
      screen.queryByRole("dialog", { name: /calendar/i }),
    ).not.toBeInTheDocument();
  });

  it("navigates to the previous month", () => {
    render(<DatePicker value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /previous month/i }));
    expect(screen.getByText("May 2024")).toBeInTheDocument();
  });

  it("navigates to the next month", () => {
    render(<DatePicker value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /next month/i }));
    expect(screen.getByText("July 2024")).toBeInTheDocument();
  });

  it("wraps from December to January when navigating forward", () => {
    render(<DatePicker value={new Date(2024, 11, 1)} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /next month/i }));
    expect(screen.getByText("January 2025")).toBeInTheDocument();
  });

  it("wraps from January to December when navigating backward", () => {
    render(<DatePicker value={new Date(2024, 0, 1)} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /previous month/i }));
    expect(screen.getByText("December 2023")).toBeInTheDocument();
  });

  it("does not open calendar when disabled", () => {
    render(<DatePicker disabled onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(
      screen.queryByRole("dialog", { name: /calendar/i }),
    ).not.toBeInTheDocument();
  });

  it("shows clear button when clearable and a value is set", () => {
    render(<DatePicker value={JUNE_15} onChange={() => {}} clearable />);
    expect(
      screen.getByRole("button", { name: /clear date/i }),
    ).toBeInTheDocument();
  });

  it("does not show clear button when no value", () => {
    render(<DatePicker onChange={() => {}} clearable />);
    expect(
      screen.queryByRole("button", { name: /clear date/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onChange(null) when clear button is clicked", () => {
    const onChange = jest.fn();

    render(<DatePicker value={JUNE_15} onChange={onChange} clearable />);
    fireEvent.click(screen.getByRole("button", { name: /clear date/i }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("shows error message when error is a string", () => {
    render(<DatePicker onChange={() => {}} error="Please select a date" />);
    expect(screen.getByText("Please select a date")).toBeInTheDocument();
  });

  it("disables dates before minDate", () => {
    const minDate = new Date(2024, 5, 10);

    render(
      <DatePicker value={JUNE_15} onChange={() => {}} minDate={minDate} />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("button", { name: /june 5/i })).toBeDisabled();
  });

  it("disables dates after maxDate", () => {
    const maxDate = new Date(2024, 5, 20);

    render(
      <DatePicker value={JUNE_15} onChange={() => {}} maxDate={maxDate} />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("button", { name: /june 25/i })).toBeDisabled();
  });

  it("uses custom formatDate when provided", () => {
    render(
      <DatePicker
        value={JUNE_15}
        onChange={() => {}}
        formatDate={(d) =>
          `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        }
      />,
    );
    expect(screen.getByText("15/6/2024")).toBeInTheDocument();
  });
});
