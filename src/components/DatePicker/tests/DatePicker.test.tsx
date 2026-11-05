import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { DatePicker } from "../DatePicker";

// June 15, 2024 — a fixed date string for predictable calendar state
const JUNE_15 = "2024-06-15";

describe("DatePicker", () => {
  it("renders with placeholder when no value", () => {
    render(
      <DatePicker
        name="date"
        value=""
        onChange={() => {}}
        placeholder="Pick a date"
      />,
    );
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("renders formatted date when value is set", () => {
    render(<DatePicker name="date" value={JUNE_15} onChange={() => {}} />);
    expect(screen.getByText("Jun 15, 2024")).toBeInTheDocument();
  });

  it("opens calendar on click", () => {
    render(<DatePicker name="date" value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(
      screen.getByRole("dialog", { name: /calendar/i }),
    ).toBeInTheDocument();
  });

  it("shows current month and year in calendar header", () => {
    render(<DatePicker name="date" value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("June 2024")).toBeInTheDocument();
  });

  it("calls onChange with the selected date string and closes calendar", () => {
    const onChange = jest.fn();

    render(<DatePicker name="date" value={JUNE_15} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /june 10/i }));

    expect(onChange).toHaveBeenCalledWith("date", "2024-06-10");
    expect(
      screen.queryByRole("dialog", { name: /calendar/i }),
    ).not.toBeInTheDocument();
  });

  it("navigates to the previous month", () => {
    render(<DatePicker name="date" value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /previous month/i }));
    expect(screen.getByText("May 2024")).toBeInTheDocument();
  });

  it("navigates to the next month", () => {
    render(<DatePicker name="date" value={JUNE_15} onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /next month/i }));
    expect(screen.getByText("July 2024")).toBeInTheDocument();
  });

  it("wraps from December to January when navigating forward", () => {
    render(<DatePicker name="date" value="2024-12-01" onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /next month/i }));
    expect(screen.getByText("January 2025")).toBeInTheDocument();
  });

  it("wraps from January to December when navigating backward", () => {
    render(<DatePicker name="date" value="2024-01-01" onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("button", { name: /previous month/i }));
    expect(screen.getByText("December 2023")).toBeInTheDocument();
  });

  it("does not open calendar when disabled", () => {
    render(<DatePicker name="date" value="" disabled onChange={() => {}} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(
      screen.queryByRole("dialog", { name: /calendar/i }),
    ).not.toBeInTheDocument();
  });

  it("shows clear button when clearable and a value is set", () => {
    render(
      <DatePicker name="date" value={JUNE_15} onChange={() => {}} clearable />,
    );
    expect(
      screen.getByRole("button", { name: /clear date/i }),
    ).toBeInTheDocument();
  });

  it("does not show clear button when no value", () => {
    render(<DatePicker name="date" value="" onChange={() => {}} clearable />);
    expect(
      screen.queryByRole("button", { name: /clear date/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onChange with empty string when clear button is clicked", () => {
    const onChange = jest.fn();

    render(
      <DatePicker name="date" value={JUNE_15} onChange={onChange} clearable />,
    );
    fireEvent.click(screen.getByRole("button", { name: /clear date/i }));
    expect(onChange).toHaveBeenCalledWith("date", "");
  });

  it("shows error message when error is a string", () => {
    render(
      <DatePicker
        name="date"
        value=""
        onChange={() => {}}
        error="Please select a date"
      />,
    );
    expect(screen.getByText("Please select a date")).toBeInTheDocument();
  });

  it("disables dates before minDate", () => {
    const minDate = new Date(2024, 5, 10);

    render(
      <DatePicker
        name="date"
        value={JUNE_15}
        onChange={() => {}}
        minDate={minDate}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("button", { name: /june 5/i })).toBeDisabled();
  });

  it("disables dates after maxDate", () => {
    const maxDate = new Date(2024, 5, 20);

    render(
      <DatePicker
        name="date"
        value={JUNE_15}
        onChange={() => {}}
        maxDate={maxDate}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("button", { name: /june 25/i })).toBeDisabled();
  });

  it("uses custom formatDate when provided", () => {
    render(
      <DatePicker
        name="date"
        value={JUNE_15}
        onChange={() => {}}
        formatDate={(d) =>
          `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        }
      />,
    );
    expect(screen.getByText("15/6/2024")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(
      <DatePicker
        name="date"
        value=""
        onChange={() => {}}
        label="Start Date"
      />,
    );
    expect(screen.getByText("Start Date")).toBeInTheDocument();
  });

  it("renders helper text when provided", () => {
    render(
      <DatePicker
        name="date"
        value=""
        onChange={() => {}}
        helperText="Choose a date"
      />,
    );
    expect(screen.getByText("Choose a date")).toBeInTheDocument();
  });
});

describe("DatePicker range mode", () => {
  it("shows placeholder when neither date is set", () => {
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom=""
        valueTo=""
        onChange={() => {}}
        placeholder="Select range..."
      />,
    );
    expect(screen.getByText("Select range...")).toBeInTheDocument();
  });

  it("shows from date with ellipsis when only from is set", () => {
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-01"
        valueTo=""
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Jun 1, 2024 - ...")).toBeInTheDocument();
  });

  it("shows both dates when from and to are set", () => {
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-01"
        valueTo="2024-06-15"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Jun 1, 2024 - Jun 15, 2024")).toBeInTheDocument();
  });

  it("opens calendar on click", () => {
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom=""
        valueTo=""
        onChange={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(
      screen.getByRole("dialog", { name: /calendar/i }),
    ).toBeInTheDocument();
  });

  it("first click sets from date and keeps calendar open", () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-15"
        valueTo=""
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    // First click sets from (phase was "from")
    fireEvent.click(screen.getByRole("button", { name: /june 10/i }));
    expect(onChange).toHaveBeenCalledWith("from", "2024-06-10");
    // Calendar stays open after first click
    expect(
      screen.getByRole("dialog", { name: /calendar/i }),
    ).toBeInTheDocument();
  });

  it("second click sets to date and closes calendar", () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-15"
        valueTo=""
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    // First click: set from
    fireEvent.click(screen.getByRole("button", { name: /june 10/i }));
    onChange.mockClear();
    // Second click: set to (a later date)
    fireEvent.click(screen.getByRole("button", { name: /june 20/i }));
    expect(onChange).toHaveBeenCalledWith("to", "2024-06-20");
    // Calendar should close after second click
    expect(
      screen.queryByRole("dialog", { name: /calendar/i }),
    ).not.toBeInTheDocument();
  });

  it("swaps dates when second click is before first", () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-15"
        valueTo=""
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    // First click: set from to June 15
    fireEvent.click(screen.getByRole("button", { name: /june 15/i }));
    onChange.mockClear();
    // Second click: a date before June 15 → should swap
    fireEvent.click(screen.getByRole("button", { name: /june 5/i }));
    // Should swap: nameTo gets old from (June 15), nameFrom gets new date (June 5)
    expect(onChange).toHaveBeenCalledWith("to", "2024-06-15");
    expect(onChange).toHaveBeenCalledWith("from", "2024-06-05");
    expect(
      screen.queryByRole("dialog", { name: /calendar/i }),
    ).not.toBeInTheDocument();
  });

  it("clears both dates when clear button is clicked in range mode", () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-01"
        valueTo="2024-06-15"
        onChange={onChange}
        clearable
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /clear date/i }));
    expect(onChange).toHaveBeenCalledWith("from", "");
    expect(onChange).toHaveBeenCalledWith("to", "");
  });

  it("shows clear button when clearable and a range value is set", () => {
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-01"
        valueTo=""
        onChange={() => {}}
        clearable
      />,
    );
    expect(
      screen.getByRole("button", { name: /clear date/i }),
    ).toBeInTheDocument();
  });

  it("does not show clear button when clearable but no range values are set", () => {
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom=""
        valueTo=""
        onChange={() => {}}
        clearable
      />,
    );
    expect(
      screen.queryByRole("button", { name: /clear date/i }),
    ).not.toBeInTheDocument();
  });

  it("clears both and resets phase when same date is clicked twice", () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        mode="range"
        nameFrom="from"
        nameTo="to"
        valueFrom="2024-06-15"
        valueTo=""
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    // First click on June 15 (which matches valueFrom prop): sets from, phase → "to"
    fireEvent.click(screen.getByRole("button", { name: /june 15/i }));
    onChange.mockClear();
    // Second click on the same date (June 15): parsedFrom is still June 15 (from prop),
    // isSameDay returns true → clears both
    fireEvent.click(screen.getByRole("button", { name: /june 15/i }));
    expect(onChange).toHaveBeenCalledWith("from", "");
    expect(onChange).toHaveBeenCalledWith("to", "");
    // Calendar stays open (phase reset to "from")
    expect(
      screen.getByRole("dialog", { name: /calendar/i }),
    ).toBeInTheDocument();
  });
});
