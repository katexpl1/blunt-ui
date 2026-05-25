import { act, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToastProvider, useToast } from "./useToast";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

describe("useToast", () => {
  it("throws when used outside ToastProvider", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => renderHook(() => useToast())).toThrow(
      "useToast must be used within a ToastProvider",
    );
    consoleSpy.mockRestore();
  });

  it("toast() shows a toast with the given message", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ message: "hello", variant: "info" });
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("toast.success() shows a success toast", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast.success("it worked");
    });
    expect(screen.getByText("it worked")).toBeInTheDocument();
  });

  it("toast.error() shows an error toast", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast.error("something broke");
    });
    expect(screen.getByText("something broke")).toBeInTheDocument();
  });

  it("calling toast() again replaces the current toast", () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.toast({ message: "first" });
    });
    act(() => {
      result.current.toast({ message: "second" });
    });
    expect(screen.queryByText("first")).not.toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });

  it("ToastProvider renders children", () => {
    render(
      <ToastProvider>
        <div>app content</div>
      </ToastProvider>,
    );
    expect(screen.getByText("app content")).toBeInTheDocument();
  });
});
