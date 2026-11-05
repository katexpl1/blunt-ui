import { render, screen } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Field } from "../Field";

describe("Field", () => {
  it("renders label and value", () => {
    render(<Field label="Status" value="Active" />);
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders an em dash when value is undefined", () => {
    render(<Field label="Notes" />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders value as a link when href is provided", () => {
    render(
      <Field label="Website" value="example.com" href="https://example.com" />,
    );
    const link = screen.getByRole("link", { name: "example.com" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders link with target=_blank when href is provided", () => {
    render(
      <Field label="Website" value="example.com" href="https://example.com" />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
