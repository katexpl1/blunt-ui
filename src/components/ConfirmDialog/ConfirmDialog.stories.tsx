import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { ConfirmProvider, useConfirm } from "./useConfirm";
import { Button } from "../Button";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  argTypes: {
    open: { table: { disable: true } },
    onConfirm: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    variant: { control: "select", options: ["default", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <ConfirmDialog
          {...args}
          open={open}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    title: "Confirm action",
    message: "Are you sure you want to continue? This action cannot be undone.",
  },
};

export const Danger: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Delete item
        </Button>
        <ConfirmDialog
          {...args}
          open={open}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    title: "Delete item",
    message:
      "This will permanently delete the item. This action cannot be undone.",
    confirmLabel: "Delete",
    variant: "danger",
  },
};

function HookDemo() {
  const confirm = useConfirm();
  const [result, setResult] = useState<string | null>(null);

  const handleDefault = async () => {
    const ok = await confirm({
      title: "Confirm action",
      message: "Are you sure you want to proceed?",
    });
    setResult(ok ? "Confirmed!" : "Cancelled.");
  };

  const handleDanger = async () => {
    const ok = await confirm({
      title: "Delete item",
      message:
        "This will permanently delete the item. This action cannot be undone.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    setResult(ok ? "Deleted!" : "Cancelled.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Button onClick={handleDefault}>Confirm</Button>
        <Button variant="outline" onClick={handleDanger}>
          Delete
        </Button>
      </div>
      {result && <span>Result: {result}</span>}
    </div>
  );
}

export const WithHook: Story = {
  render: () => (
    <ConfirmProvider>
      <HookDemo />
    </ConfirmProvider>
  ),
};
