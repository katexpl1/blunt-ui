import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "../Switch";
import type { SwitchSize } from "../Switch.types";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"] satisfies SwitchSize[],
    },
    color: { control: "color", description: "Track color when on" },
    borderColor: { control: "color", description: "Border color" },
    checked: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "Enable notifications" },
};

export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "Dark mode" },
};

export const Disabled: Story = {
  args: { label: "Disabled toggle", disabled: true, checked: false },
};

export const Small: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "Small switch", size: "sm" },
};
