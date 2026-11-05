import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "../DatePicker";

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
    const [value, setValue] = useState("");

    return (
      <DatePicker
        {...args}
        name="date"
        value={value}
        onChange={(_name, val) => setValue(val)}
      />
    );
  },
  args: {
    placeholder: "Select date...",
  },
};

export const WithValue: Story = {
  render: (args) => {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const [value, setValue] = useState(iso);

    return (
      <DatePicker
        {...args}
        name="date"
        value={value}
        onChange={(_name, val) => setValue(val)}
        clearable
      />
    );
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
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
          name="date"
          value={value}
          onChange={(_name, val) => setValue(val)}
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
    const [sm, setSm] = useState("");
    const [md, setMd] = useState("");
    const [lg, setLg] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DatePicker
          name="sm"
          size={"sm"}
          value={sm}
          onChange={(_name, val) => setSm(val)}
          placeholder="Small"
        />
        <DatePicker
          name="md"
          size={"md"}
          value={md}
          onChange={(_name, val) => setMd(val)}
          placeholder="Medium"
        />
        <DatePicker
          name="lg"
          size={"lg"}
          value={lg}
          onChange={(_name, val) => setLg(val)}
          placeholder="Large"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker name="date" value="2024-06-15" onChange={() => {}} disabled />
  ),
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <DatePicker
        {...args}
        name="date"
        value={value}
        onChange={(_name, val) => setValue(val)}
        error="Please select a date"
      />
    );
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <DatePicker
        {...args}
        name="date"
        label="Start Date"
        value={value}
        onChange={(_name, val) => setValue(val)}
        required
        helperText="Select the project start date"
      />
    );
  },
};
