import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "outlined"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Notes",
    placeholder: "Enter your notes...",
  },
};

export const Error: Story = {
  args: {
    label: "Description",
    error: "Description is required",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    helperText: "Max 500 characters",
    placeholder: "Tell us about yourself",
    rows: 4,
  },
};
