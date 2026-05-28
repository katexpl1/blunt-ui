import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Editable } from "./Editable";

const meta: Meta<typeof Editable> = {
  title: "Components/Editable",
  component: Editable,
  argTypes: {
    onChange: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
    onCancel: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Editable>;

export const Default: Story = {
  args: {
    defaultValue: "Click to edit me",
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Add a note...",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("Controlled value");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Editable value={value} onSubmit={setValue} />
        <span style={{ fontSize: 12, color: "#666" }}>Value: {value}</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Cannot be edited",
    disabled: true,
  },
};

export const InTable: Story = {
  render: () => {
    const [rows, setRows] = useState([
      { id: "T-01", task: "Design system audit", estimate: "3d" },
      { id: "T-02", task: "API documentation", estimate: "2d" },
      { id: "T-03", task: "Unit test coverage", estimate: "5d" },
    ]);

    const update = (index: number, field: string, value: string) => {
      setRows((prev) =>
        prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
      );
    };

    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {["ID", "Task", "Estimate"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "8px 12px",
                  textAlign: "left",
                  borderBottom: "2px solid #111",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id}>
              <td style={{ padding: "8px 12px" }}>{row.id}</td>
              <td style={{ padding: "8px 12px" }}>
                <Editable
                  value={row.task}
                  onSubmit={(v) => update(i, "task", v)}
                />
              </td>
              <td style={{ padding: "8px 12px" }}>
                <Editable
                  value={row.estimate}
                  onSubmit={(v) => update(i, "estimate", v)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
