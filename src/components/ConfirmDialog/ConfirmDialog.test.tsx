import { render, screen, fireEvent } from "../../test-utils";
import "@testing-library/jest-dom";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("renders when open is true", () => {
    render(
      <ConfirmDialog
        open={true}
        message="Are you sure?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <ConfirmDialog
        open={false}
        message="Are you sure?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the message", () => {
    render(
      <ConfirmDialog
        open={true}
        message="This cannot be undone."
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("renders default title", () => {
    render(
      <ConfirmDialog
        open={true}
        message="msg"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(
      <ConfirmDialog
        open={true}
        title="Delete item"
        message="msg"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText("Delete item")).toBeInTheDocument();
  });

  it("renders custom confirm and cancel labels", () => {
    render(
      <ConfirmDialog
        open={true}
        message="msg"
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Yes, delete" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "No, keep" }),
    ).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = jest.fn();

    render(
      <ConfirmDialog
        open={true}
        message="msg"
        onConfirm={onConfirm}
        onCancel={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = jest.fn();

    render(
      <ConfirmDialog
        open={true}
        message="msg"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when Escape is pressed", () => {
    const onCancel = jest.fn();

    render(
      <ConfirmDialog
        open={true}
        message="msg"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("does not close when backdrop is clicked", () => {
    const onCancel = jest.fn();

    render(
      <ConfirmDialog
        open={true}
        message="msg"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("renders a danger confirm button for variant=danger", () => {
    render(
      <ConfirmDialog
        open={true}
        message="msg"
        confirmLabel="Delete"
        variant="danger"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
