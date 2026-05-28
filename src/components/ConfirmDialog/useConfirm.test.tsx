import {
  act,
  render,
  renderHook,
  screen,
  fireEvent,
  ThemeWrapper,
} from "../../test-utils";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { ConfirmProvider, useConfirm } from "./useConfirm";

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeWrapper>
    <ConfirmProvider>{children}</ConfirmProvider>
  </ThemeWrapper>
);

describe("useConfirm", () => {
  it("throws when used outside ConfirmProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useConfirm())).toThrow(
      "useConfirm must be used within a ConfirmProvider",
    );
    consoleSpy.mockRestore();
  });

  it("ConfirmProvider renders children", () => {
    render(
      <ConfirmProvider>
        <div>app content</div>
      </ConfirmProvider>,
    );
    expect(screen.getByText("app content")).toBeInTheDocument();
  });

  it("shows dialog with the given message", () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    act(() => {
      result.current({ message: "This will delete the record." });
    });
    expect(
      screen.getByText("This will delete the record."),
    ).toBeInTheDocument();
  });

  it("shows default title when none provided", () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    act(() => {
      result.current({ message: "msg" });
    });
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("shows custom title", () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    act(() => {
      result.current({ title: "Delete item", message: "msg" });
    });
    expect(screen.getByText("Delete item")).toBeInTheDocument();
  });

  it("resolves true when confirm button is clicked", async () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    let promise!: Promise<boolean>;

    act(() => {
      promise = result.current({ message: "msg" });
    });

    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(await promise).toBe(true);
  });

  it("resolves false when cancel button is clicked", async () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    let promise!: Promise<boolean>;

    act(() => {
      promise = result.current({ message: "msg" });
    });

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(await promise).toBe(false);
  });

  it("resolves false when Escape is pressed", async () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    let promise!: Promise<boolean>;

    act(() => {
      promise = result.current({ message: "msg" });
    });

    fireEvent.keyDown(document, { key: "Escape" });

    expect(await promise).toBe(false);
  });

  it("closes the dialog after confirming", async () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    let promise!: Promise<boolean>;

    act(() => {
      promise = result.current({ message: "msg" });
    });

    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    await promise;

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows custom confirm and cancel labels", () => {
    const { result } = renderHook(() => useConfirm(), { wrapper });

    act(() => {
      result.current({
        message: "msg",
        confirmLabel: "Yes, delete",
        cancelLabel: "No, keep",
      });
    });

    expect(
      screen.getByRole("button", { name: "Yes, delete" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "No, keep" }),
    ).toBeInTheDocument();
  });
});
