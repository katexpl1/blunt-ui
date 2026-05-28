import { render, screen, fireEvent } from "../../test-utils";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders as <button> by default", () => {
    render(<Button>Default</Button>);
    expect(screen.getByText("Default").tagName).toBe("BUTTON");
  });

  it("renders as <a> when href is provided", () => {
    render(<Button href="https://example.com">Link</Button>);
    expect(screen.getByText("Link").tagName).toBe("A");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows Loading... and is disabled when isLoading", () => {
    render(<Button isLoading>Click</Button>);

    const btn = screen.getByText("Loading...");

    expect(btn).toBeDisabled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText("Click")).toBeDisabled();
  });

  it("renders all variants without errors", () => {
    const { rerender } = render(<Button variant="primary">btn</Button>);

    rerender(<Button variant="secondary">btn</Button>);
    rerender(<Button variant="outline">btn</Button>);
    expect(screen.getByText("btn")).toBeInTheDocument();
  });

  it("renders all sizes without errors", () => {
    const { rerender } = render(<Button size="sm">btn</Button>);

    rerender(<Button size="md">btn</Button>);
    rerender(<Button size="lg">btn</Button>);
    expect(screen.getByText("btn")).toBeInTheDocument();
  });
});
