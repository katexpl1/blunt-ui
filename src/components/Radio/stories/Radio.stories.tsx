import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "../Radio";
import type { RadioSize } from "../Radio.types";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"] satisfies RadioSize[],
    },
    color: { control: "color", description: "Checked dot color" },
    borderColor: { control: "color", description: "Border color" },
    checked: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Radio
          {...args}
          value="a"
          checked={value === "a"}
          onChange={(e) => setValue(e.target.value)}
          label="Option A"
        />
        <Radio
          {...args}
          value="b"
          checked={value === "b"}
          onChange={(e) => setValue(e.target.value)}
          label="Option B"
        />
        <Radio
          {...args}
          value="c"
          checked={value === "c"}
          onChange={(e) => setValue(e.target.value)}
          label="Option C"
        />
      </div>
    );
  },
  args: {},
};

export const WithHelperText: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "Option C", helperText: "This is a helpful hint" },
};

export const WithError: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: "Option D",
    error: true,
    helperText: "Please select an option",
  },
};

export const Disabled: Story = {
  args: { label: "Disabled option", disabled: true, checked: false },
};

export const Small: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: { label: "Small radio", size: "sm" },
};
