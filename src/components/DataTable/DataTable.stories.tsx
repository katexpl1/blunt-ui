import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable } from "./DataTable";

const initialData = [
  { task: "Design system audit", priority: "High", estimate: "3d" },
  { task: "API documentation", priority: "Medium", estimate: "2d" },
  { task: "Unit test coverage", priority: "High", estimate: "5d" },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    borderColor: { control: "color" },
    headerColor: { control: "color" },
    addRowLabel: { control: "text" },
    deletable: { control: "boolean" },
    data: { table: { disable: true } },
    defaultData: { table: { disable: true } },
    onChange: { table: { disable: true } },
    newRowFactory: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: (args) => (
    <DataTable
      {...args}
      columns={[
        { key: "task", header: "Task", editable: true },
        { key: "priority", header: "Priority", editable: true },
        { key: "estimate", header: "Estimate", editable: true },
      ]}
      defaultData={initialData}
    />
  ),
  args: {
    size: "md",
    addRowLabel: "Add row",
    deletable: false,
  },
};

export const WithDelete: Story = {
  render: (args) => (
    <DataTable
      {...args}
      columns={[
        { key: "task", header: "Task", editable: true },
        { key: "priority", header: "Priority", editable: true },
        { key: "estimate", header: "Estimate", editable: true },
      ]}
      defaultData={initialData}
      deletable
    />
  ),
  args: {
    size: "md",
  },
};

export const MixedEditable: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: "id", header: "ID", width: "60px" },
        { key: "task", header: "Task", editable: true },
        { key: "priority", header: "Priority", editable: true },
        { key: "estimate", header: "Estimate" },
      ]}
      defaultData={[
        {
          id: "T-01",
          task: "Design system audit",
          priority: "High",
          estimate: "3d",
        },
        {
          id: "T-02",
          task: "API documentation",
          priority: "Medium",
          estimate: "2d",
        },
      ]}
      deletable
    />
  ),
};

export const PerCellEditable: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: "task", header: "Task" },
        { key: "priority", header: "Priority", editable: true },
        {
          key: "estimate",
          header: "Estimate",
          editable: (row) => row.priority !== "High",
        },
      ]}
      defaultData={initialData}
      deletable
    />
  ),
};

export const CustomColors: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: "task", header: "Task", width: "300px", editable: true },
        { key: "priority", header: "Priority", width: "120px", editable: true },
        { key: "estimate", header: "Estimate", editable: true },
      ]}
      defaultData={initialData}
      borderColor="#6366f1"
      headerColor="#6366f1"
      deletable
    />
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
        Click a cell to start editing. Use <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd>{" "}
        to move between cells. <kbd>Tab</kbd> past the last cell adds a new row.
      </p>
      <DataTable
        columns={[
          { key: "task", header: "Task", editable: true },
          { key: "priority", header: "Priority", editable: true },
          { key: "estimate", header: "Estimate", editable: true },
        ]}
        defaultData={initialData}
        deletable
        addRowLabel="Add task"
      />
    </div>
  ),
};

export const WithSelectColumn: Story = {
  render: (args) => (
    <DataTable
      {...args}
      columns={[
        { key: "task", header: "Task", editable: true },
        {
          key: "priority",
          header: "Priority",
          editable: true,
          options: [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ],
        },
        {
          key: "status",
          header: "Status",
          editable: true,
          options: [
            { value: "todo", label: "To do" },
            { value: "in_progress", label: "In progress" },
            { value: "done", label: "Done" },
          ],
        },
      ]}
      defaultData={[
        {
          task: "Design system audit",
          priority: "high",
          status: "in_progress",
        },
        { task: "API documentation", priority: "medium", status: "todo" },
        { task: "Unit test coverage", priority: "low", status: "done" },
      ]}
      deletable
    />
  ),
  args: { size: "md" },
};

export const StartsEmpty: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: "task", header: "Task", editable: true },
        { key: "priority", header: "Priority", editable: true },
        { key: "estimate", header: "Estimate", editable: true },
      ]}
      defaultData={[]}
      deletable
      addRowLabel="Add task"
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [data, setData] = useState(initialData);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <DataTable
          columns={[
            { key: "task", header: "Task", editable: true },
            { key: "priority", header: "Priority", editable: true },
            { key: "estimate", header: "Estimate", editable: true },
          ]}
          data={data}
          onChange={setData}
          deletable
        />
        <pre
          style={{
            fontSize: "12px",
            // TODO: create consts from colors
            background: "#f4f4f4",
            padding: "12px",
            borderRadius: "4px",
            margin: 0,
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  },
};
