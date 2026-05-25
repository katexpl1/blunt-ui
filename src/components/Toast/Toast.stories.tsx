import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast } from "./Toast";
import { Button } from "../Button";
import type { ToastVariants, ToastPosition } from "./Toast.types";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info"],
    },
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "top-right", "top-left"],
    },
    duration: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: {
    message: "Changes saved successfully.",
    variant: "success",
    duration: 4000,
    position: "bottom-right",
  },
};

export const Variants: Story = {
  render: () => {
    const variants: ToastVariants[] = ["success", "error", "warning", "info"];
    const [openVariant, setOpenVariant] = useState<ToastVariants | null>(null);

    const messages: Record<ToastVariants, string> = {
      success: "This action was successfull!",
      error: "Updating item action failed",
      warning: "Are you sure you want to continue?",
      info: "Info message",
    };

    return (
      <>
        <div style={{ display: "flex", gap: "8px" }}>
          {variants.map((v) => (
            <Button key={v} onClick={() => setOpenVariant(v)}>
              {v}
            </Button>
          ))}
        </div>
        {variants.map((v) => (
          <Toast
            key={v}
            open={openVariant === v}
            onClose={() => setOpenVariant(null)}
            message={messages[v]}
            variant={v}
            duration={0}
          />
        ))}
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const positions: ToastPosition[] = [
      "bottom-right",
      "bottom-left",
      "top-right",
      "top-left",
    ];
    const [openPosition, setOpenPosition] = useState<ToastPosition | null>(
      null,
    );

    return (
      <>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {positions.map((p) => (
            <Button key={p} onClick={() => setOpenPosition(p)}>
              {p}
            </Button>
          ))}
        </div>
        <Toast
          open={openPosition !== null}
          onClose={() => setOpenPosition(null)}
          message={`Showing from ${openPosition}`}
          variant="info"
          position={openPosition ?? "bottom-right"}
          duration={0}
        />
      </>
    );
  },
};

export const NoDismiss: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: {
    message: "You need to close it manually!",
    variant: "warning",
    duration: 0,
    position: "bottom-right",
  },
};
