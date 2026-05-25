import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toast } from "./Toast";

describe("Toast component", () => {
  it("renders when open is true", () => {
    render(<Toast open={true} onClose={() => {}} message="Hello" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(<Toast open={false} onClose={() => {}} message="Hello" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders the message", () => {
    render(<Toast open={true} onClose={() => {}} message="File saved" />);
    expect(screen.getByText("File saved")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Toast open={true} onClose={onClose} message="Hello" />);
    fireEvent.click(
      screen.getByRole("button", { name: /close notification/i }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("auto-dismisses after duration", () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(
      <Toast open={true} onClose={onClose} message="Hello" duration={3000} />,
    );
    act(() => jest.advanceTimersByTime(3000));
    expect(onClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it("does not auto-dismiss when duration is 0", () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(
      <Toast open={true} onClose={onClose} message="Hello" duration={0} />,
    );
    act(() => jest.advanceTimersByTime(10000));
    expect(onClose).not.toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("hides after close animation completes", async () => {
    jest.useFakeTimers();
    const { rerender } = render(
      <Toast open={true} onClose={() => {}} message="Hello" />,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(<Toast open={false} onClose={() => {}} message="Hello" />);
    act(() => jest.advanceTimersByTime(300));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("renders with different variants without errors", () => {
    const variants = ["success", "error", "warning", "info"] as const;
    const { rerender } = render(
      <Toast open={true} onClose={() => {}} message="msg" variant="success" />,
    );
    for (const variant of variants) {
      rerender(
        <Toast
          open={true}
          onClose={() => {}}
          message="msg"
          variant={variant}
        />,
      );
      expect(screen.getByRole("alert")).toBeInTheDocument();
    }
  });
});
