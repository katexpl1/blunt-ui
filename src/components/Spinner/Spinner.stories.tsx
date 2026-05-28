import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    weight: { control: "select", options: ["thin", "normal", "bold"] },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
    weight: "normal",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Spinner weight="thin" size="lg" />
      <Spinner weight="normal" size="lg" />
      <Spinner weight="bold" size="lg" />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    size: "md",
    color: "#e11d48",
  },
};
