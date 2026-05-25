import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import type { ModalSizes } from "./Modal.types";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
    onClose: { table: { disable: true } },
    open: { table: { disable: true } },
    size: { control: "select", options: ["sm", "md", "lg", "fullscreen"] },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <p>Put whatever you want in here — a form, some text, an image.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: "Example modal",
    size: "md",
  },
};

export const WithFooter: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete item</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Delete</Button>
            </>
          }
        >
          <p>Are you sure? This can't be undone.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: "Delete item",
    size: "sm",
  },
};

export const Sizes: Story = {
  render: () => {
    const sizes: ModalSizes[] = ["sm", "md", "lg"];
    const [openSize, setOpenSize] = useState<ModalSizes | null>(null);
    return (
      <>
        <div style={{ display: "flex", gap: "8px" }}>
          {sizes.map((size) => (
            <Button key={size} onClick={() => setOpenSize(size)}>
              Open {size}
            </Button>
          ))}
        </div>
        <Modal
          open={openSize !== null}
          onClose={() => setOpenSize(null)}
          title={`${openSize?.toUpperCase()} Modal`}
          size={openSize ?? "md"}
        >
          <p>This is a {openSize} sized modal.</p>
        </Modal>
      </>
    );
  },
};

export const NoBackdropClose: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <p>Use X button or press Escape to close modal</p>
        </Modal>
      </>
    );
  },
  args: {
    title: "Stays open",
    closeOnBackdrop: false,
    size: "md",
  },
};

export const NoTitle: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <p>No title ^^^</p>
        </Modal>
      </>
    );
  },
  args: {
    size: "md",
  },
};
