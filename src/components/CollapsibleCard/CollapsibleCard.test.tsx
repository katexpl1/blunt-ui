import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../themes";
import { CollapsibleCard } from "./CollapsibleCard";

function Wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

function renderWithTheme(ui: ReactNode) {
  return render(ui, { wrapper: Wrapper });
}

describe("CollapsibleCard component", () => {
  it("renders title", () => {
    renderWithTheme(<CollapsibleCard title="My card">Content</CollapsibleCard>);
    expect(screen.getByText("My card")).toBeInTheDocument();
  });

  it("renders children when open", () => {
    renderWithTheme(
      <CollapsibleCard title="My card" defaultOpen>
        Card content
      </CollapsibleCard>,
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    renderWithTheme(
      <CollapsibleCard title="My card" subtitle="v1.0.0">
        Content
      </CollapsibleCard>,
    );
    expect(screen.getByText("v1.0.0")).toBeInTheDocument();
  });

  it("renders headerActions when provided", () => {
    renderWithTheme(
      <CollapsibleCard title="My card" headerActions={<button>Action</button>}>
        Content
      </CollapsibleCard>,
    );
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("toggles open state on header click (uncontrolled)", () => {
    renderWithTheme(<CollapsibleCard title="My card">Content</CollapsibleCard>);

    const header = screen.getByRole("button");

    expect(header).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(header);
    expect(header).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(header);
    expect(header).toHaveAttribute("aria-expanded", "false");
  });

  it("starts open when defaultOpen is true", () => {
    renderWithTheme(
      <CollapsibleCard title="My card" defaultOpen>
        Content
      </CollapsibleCard>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle with new open state", () => {
    const onToggle = jest.fn();

    renderWithTheme(
      <CollapsibleCard title="My card" onToggle={onToggle}>
        Content
      </CollapsibleCard>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("respects controlled open prop", () => {
    const { rerender } = renderWithTheme(
      <CollapsibleCard title="My card" open={false} onToggle={() => {}}>
        Content
      </CollapsibleCard>,
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    rerender(
      <ThemeProvider theme={defaultTheme}>
        <CollapsibleCard title="My card" open={true} onToggle={() => {}}>
          Content
        </CollapsibleCard>
      </ThemeProvider>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("does not change state when controlled and header is clicked", () => {
    const onToggle = jest.fn();

    renderWithTheme(
      <CollapsibleCard title="My card" open={false} onToggle={onToggle}>
        Content
      </CollapsibleCard>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("header actions click does not toggle the card", () => {
    const onToggle = jest.fn();

    renderWithTheme(
      <CollapsibleCard
        title="My card"
        onToggle={onToggle}
        headerActions={<button>Action</button>}
      >
        Content
      </CollapsibleCard>,
    );
    fireEvent.click(screen.getByText("Action"));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it("header button has aria-controls linking to content region", () => {
    renderWithTheme(<CollapsibleCard title="My card">Content</CollapsibleCard>);

    const header = screen.getByRole("button");
    const contentId = header.getAttribute("aria-controls");

    expect(contentId).toBeTruthy();

    const region = document.getElementById(contentId!);

    expect(region).toBeInTheDocument();
  });
});
