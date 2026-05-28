import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./Field";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    label: "Full name",
    value: "Jane Doe",
  },
};

export const Empty: Story = {
  args: {
    label: "Company",
  },
};

export const WithLink: Story = {
  args: {
    label: "Portfolio",
    value: "github.com/janedoe",
    href: "https://github.com/janedoe",
  },
};
