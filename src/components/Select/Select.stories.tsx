import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outlined", "filled"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const countryOptions = [
  { value: "pl", label: "Poland" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "uk", label: "United Kingdom" },
];

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: "Please, pick a country",
    size: "md",
    variant: "default",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Select options={countryOptions} placeholder="small" size="sm" />
      <Select options={countryOptions} placeholder="medium" size="md" />
      <Select options={countryOptions} placeholder="large" size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Select
        options={countryOptions}
        placeholder="default"
        variant="default"
      />
      <Select
        options={countryOptions}
        placeholder="outlined"
        variant="outlined"
      />
      <Select options={countryOptions} placeholder="filled" variant="filled" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    options: countryOptions,
    placeholder: "Plase, pick a country",
    error: "This field is required",
  },
};

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        options={countryOptions}
        placeholder="Please, pick a country"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        clearable
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    options: countryOptions,
    placeholder: "Please, pick a country",
    disabled: true,
  },
};
