import { render, screen } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Spinner } from "../Spinner";

describe("Spinner", () => {
  it("has role=status for screen readers", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has default aria-label of Loading...", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading...",
    );
  });

  it("uses custom aria-label when provided", () => {
    render(<Spinner label="Saving changes..." />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Saving changes...",
    );
  });

  it("renders all sizes without errors", () => {
    const { rerender } = render(<Spinner size="sm" />);
    rerender(<Spinner size="md" />);
    rerender(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders all weights without errors", () => {
    const { rerender } = render(<Spinner weight="thin" />);
    rerender(<Spinner weight="normal" />);
    rerender(<Spinner weight="bold" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
