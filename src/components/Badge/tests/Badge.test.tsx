import { render, screen } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders all variants without errors", () => {
    const { rerender } = render(<Badge variant="primary">badge</Badge>);

    rerender(<Badge variant="neutral">badge</Badge>);
    rerender(<Badge variant="success">badge</Badge>);
    rerender(<Badge variant="error">badge</Badge>);
    rerender(<Badge variant="warning">badge</Badge>);
    rerender(<Badge variant="info">badge</Badge>);
    expect(screen.getByText("badge")).toBeInTheDocument();
  });

  it("renders all sizes without errors", () => {
    const { rerender } = render(<Badge size="sm">badge</Badge>);

    rerender(<Badge size="md">badge</Badge>);
    expect(screen.getByText("badge")).toBeInTheDocument();
  });

  it("forwards additional html attributes", () => {
    render(<Badge data-testid="my-badge">test</Badge>);
    expect(screen.getByTestId("my-badge")).toBeInTheDocument();
  });
});
