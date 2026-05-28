import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);

    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: "Select date...",
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());

    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    clearable: true,
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 5,
    );
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 10,
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
          minDate={minDate}
          maxDate={maxDate}
        />
        <span style={{ fontSize: 12, color: "#666" }}>
          Only dates within ±5/+10 days from today are selectable
        </span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = useState<Date | null>(null);
    const [md, setMd] = useState<Date | null>(null);
    const [lg, setLg] = useState<Date | null>(null);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DatePicker size="sm" value={sm} onChange={setSm} placeholder="Small" />
        <DatePicker
          size="md"
          value={md}
          onChange={setMd}
          placeholder="Medium"
        />
        <DatePicker size="lg" value={lg} onChange={setLg} placeholder="Large" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => <DatePicker value={new Date()} disabled />,
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);

    return (
      <DatePicker
        {...args}
        value={value}
        onChange={setValue}
        error="Please select a date"
      />
    );
  },
};
