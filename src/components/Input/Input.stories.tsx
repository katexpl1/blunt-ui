import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    leftElement: { table: { disable: true } },
    rightElement: { table: { disable: true } },
    onClear: { table: { disable: true } },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "outlined"],
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Enter your text",
    type: "text",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    error: "Invalid email address",
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    leftElement: "🔍",
    placeholder: "Search...",
  },
};

export const Clearable: Story = {
  args: {
    label: "Username",
    clearable: true,
    defaultValue: "john_doe",
  },
};
