import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "neutral", "success", "error", "warning", "info"],
    },
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: { children: "primary", variant: "primary" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="primary">primary</Badge>
      <Badge variant="neutral">neutral</Badge>
      <Badge variant="success">success</Badge>
      <Badge variant="error">error</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="info">info</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge size="sm">small</Badge>
      <Badge size="md">medium</Badge>
    </div>
  ),
};
