import { render, screen } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Link } from "../Link";

describe("Link", () => {
  it("renders children", () => {
    render(<Link href="https://example.com">Click here</Link>);
    expect(screen.getByText("Click here")).toBeInTheDocument();
  });

  it("renders as an anchor tag", () => {
    render(<Link href="https://example.com">link</Link>);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  it("adds target=_blank and rel=noreferrer when external", () => {
    render(
      <Link href="https://example.com" external>
        link
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("does not add target or rel by default", () => {
    render(<Link href="/internal">link</Link>);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("renders all variants without errors", () => {
    const { rerender } = render(
      <Link href="#" variant="default">
        link
      </Link>,
    );
    rerender(
      <Link href="#" variant="subtle">
        link
      </Link>,
    );
    expect(screen.getByText("link")).toBeInTheDocument();
  });
});
