import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Select } from "../Select";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C", disabled: true },
];

describe("Select", () => {
  it("renders a combobox trigger", () => {
    render(<Select options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder in trigger when no value selected", () => {
    render(<Select options={options} placeholder="pick one" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("pick one");
  });

  it("opens dropdown and shows options as listbox when trigger is clicked", () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option A" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option B" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option C" }),
    ).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", () => {
    const onChange = jest.fn();

    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Option B" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "b" }),
      }),
    );
  });

  it("closes dropdown after selecting an option", () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Option A" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows selected option label in trigger", () => {
    render(<Select options={options} value="a" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Option A");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("disabled options cannot be selected", () => {
    const onChange = jest.fn();

    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Option C" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disabled options have aria-disabled", () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: "Option C" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("sets aria-invalid when error is true", () => {
    render(<Select options={options} error={true} />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("shows clear button when clearable and a value is selected", () => {
    render(
      <Select options={options} value="a" onChange={() => {}} clearable />,
    );
    expect(
      screen.getByRole("button", { name: /clear selection/i }),
    ).toBeInTheDocument();
  });

  it("does not show clear button when no value selected", () => {
    render(<Select options={options} value="" onChange={() => {}} clearable />);
    expect(
      screen.queryByRole("button", { name: /clear selection/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onClear when clear button is clicked", () => {
    const onClear = jest.fn();

    render(
      <Select
        options={options}
        value="a"
        onChange={() => {}}
        onClear={onClear}
        clearable
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /clear selection/i }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("navigates options with keyboard and selects with Enter", () => {
    const onChange = jest.fn();

    render(<Select options={options} onChange={onChange} />);
    const trigger = screen.getByRole("combobox");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "a" }),
      }),
    );
  });

  it("closes dropdown on Escape", () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
