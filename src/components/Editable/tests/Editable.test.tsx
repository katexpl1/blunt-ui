import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Editable } from "../Editable";

describe("Editable", () => {
  it("renders the default value", () => {
    render(<Editable defaultValue="hello" />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders placeholder when no value", () => {
    render(<Editable placeholder="Click to edit" />);
    expect(screen.getByText("Click to edit")).toBeInTheDocument();
  });

  it("enters edit mode on click", () => {
    render(<Editable defaultValue="hello" />);
    fireEvent.click(screen.getByText("hello"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("commits value on Enter", () => {
    const onSubmit = jest.fn();

    render(<Editable defaultValue="hello" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("hello"));
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "world" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalledWith("world");
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  it("cancels on Escape and restores previous value", () => {
    const onCancel = jest.fn();

    render(<Editable defaultValue="original" onCancel={onCancel} />);
    fireEvent.click(screen.getByText("original"));
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "changed" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledWith("original");
    expect(screen.getByText("original")).toBeInTheDocument();
  });

  it("does not enter edit mode when disabled", () => {
    render(<Editable defaultValue="hello" disabled />);
    fireEvent.click(screen.getByText("hello"));
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("calls onChange when value is committed", () => {
    const onChange = jest.fn();

    render(<Editable defaultValue="hello" onChange={onChange} />);
    fireEvent.click(screen.getByText("hello"));
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("new");
  });
});
