import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "../Checkbox";
import type { CheckboxSize } from "../Checkbox.types";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"] satisfies CheckboxSize[],
    },
    color: { control: "color", description: "Checked fill color" },
    borderColor: { control: "color", description: "Border color" },
    checkColor: { control: "color", description: "Tick color" },
    checked: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "Accept terms and conditions" },
};

export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "I agree" },
};

export const WithError: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue",
  },
};

export const WithHelperText: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: "Subscribe to newsletter",
    helperText: "We will not spam you",
  },
};

export const Disabled: Story = {
  args: { label: "Disabled option", disabled: true, checked: false },
};

export const Small: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "Small checkbox", size: "sm" },
};
