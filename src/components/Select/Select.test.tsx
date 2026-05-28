import { render, screen, fireEvent } from "../../test-utils";
import "@testing-library/jest-dom";
import { Select } from "./Select";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C", disabled: true },
];

describe("Select", () => {
  it("renders all options", () => {
    render(<Select options={options} />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Option C")).toBeInTheDocument();
  });

  it("renders placeholder as first disabled option", () => {
    render(<Select options={options} placeholder="pick one" />);

    const placeholder = screen.getByText("pick one");

    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toBeDisabled();
  });

  it("calls onChange when selection changes", () => {
    const onChange = jest.fn();

    render(<Select options={options} onChange={onChange} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "b" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("marks disabled options", () => {
    render(<Select options={options} />);
    expect(screen.getByText("Option C")).toBeDisabled();
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
});
