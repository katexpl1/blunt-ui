import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Modal } from "./Modal";

describe("Modal component", () => {
  it("renders when open is true", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Title">
        Content
      </Modal>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Modal body
      </Modal>,
    );
    expect(screen.getByText("Modal body")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(
      <Modal open={true} onClose={() => {}} footer={<button>Confirm</button>}>
        Content
      </Modal>,
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose}>
        Content
      </Modal>,
    );
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose}>
        Content
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when closeOnEscape is false", () => {
    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose} closeOnEscape={false}>
        Content
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose}>
        Content
      </Modal>,
    );

    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnBackdrop is false", () => {
    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose} closeOnBackdrop={false}>
        Content
      </Modal>,
    );
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when dialog itself is clicked", () => {
    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose}>
        Content
      </Modal>,
    );
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body scroll when open", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("links dialog to title via aria-labelledby", () => {
    render(
      <Modal open={true} onClose={() => {}} title="Dialog Title">
        Content
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    const titleId = dialog.getAttribute("aria-labelledby");

    expect(titleId).toBeTruthy();
    expect(document.getElementById(titleId!)).toHaveTextContent("Dialog Title");
  });

  it("hides when open changes from true to false", async () => {
    jest.useFakeTimers();

    const { rerender } = render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    rerender(
      <Modal open={false} onClose={() => {}}>
        Content
      </Modal>,
    );

    act(() => jest.advanceTimersByTime(200));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
