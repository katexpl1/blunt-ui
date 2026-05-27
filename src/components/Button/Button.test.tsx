import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies correct variant styles", () => {
    render(<Button variant="secondary">Click</Button>);

    const btn = screen.getByText("Click");

    expect(btn).toHaveStyle("background-color: #eaeaea");
  });

  it("applies correct size styles", () => {
    render(<Button size="lg">Large</Button>);

    const btn = screen.getByText("Large");

    expect(btn).toHaveStyle("font-size: 18px");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when isLoading", () => {
    render(<Button isLoading>Click</Button>);

    const btn = screen.getByText("Loading...");

    expect(btn).toBeDisabled();
  });

  it("renders as <button> by default", () => {
    render(<Button>Default</Button>);

    const btn = screen.getByText("Default");

    expect(btn.tagName).toBe("BUTTON");
  });
});
