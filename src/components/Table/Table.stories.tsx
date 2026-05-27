import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./Table";
import { useTable } from "./useTable";
import { Badge } from "../Badge";
import type { BadgeVariants } from "../Badge";

const sampleData = [
  {
    id: 1,
    product: "Standing Desk",
    category: "Furniture",
    price: 599,
    status: "in stock",
  },
  {
    id: 2,
    product: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: 249,
    status: "low stock",
  },
  {
    id: 3,
    product: "Webcam 4K",
    category: "Electronics",
    price: 89,
    status: "in stock",
  },
  {
    id: 4,
    product: "Desk Lamp",
    category: "Furniture",
    price: 49,
    status: "out of stock",
  },
  {
    id: 5,
    product: "Mechanical Keyboard",
    category: "Electronics",
    price: 179,
    status: "in stock",
  },
  {
    id: 6,
    product: "Monitor Stand",
    category: "Furniture",
    price: 69,
    status: "in stock",
  },
];

const largeData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  product: `Product ${i + 1}`,
  category: i % 2 === 0 ? "Electronics" : "Furniture",
  price: (i + 1) * 10,
  status: (["in stock", "low stock", "out of stock"] as const)[i % 3],
}));

const twentyRows = largeData.slice(0, 20);

const columns = [
  { key: "id" as const, header: "ID", width: "60px" },
  { key: "product" as const, header: "Product" },
  { key: "category" as const, header: "Category" },
  { key: "price" as const, header: "Price" },
  { key: "status" as const, header: "Status" },
];

const sortableColumns = [
  { key: "id" as const, header: "ID", width: "60px" },
  { key: "product" as const, header: "Product", sortable: true },
  { key: "category" as const, header: "Category", sortable: true },
  { key: "price" as const, header: "Price", sortable: true },
  { key: "status" as const, header: "Status" },
];

const statusVariants: Record<string, BadgeVariants> = {
  "in stock": "success",
  "low stock": "warning",
};

const statusColumns = [
  { key: "id" as const, header: "ID", width: "60px" },
  { key: "product" as const, header: "Product" },
  { key: "category" as const, header: "Category" },
  { key: "price" as const, header: "Price", render: (v: unknown) => `$${v}` },
  {
    key: "status" as const,
    header: "Status",
    render: (value: unknown) => (
      <Badge variant={statusVariants[String(value)] ?? "neutral"}>
        {String(value)}
      </Badge>
    ),
  },
];

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    striped: { control: "boolean" },
    bordered: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    loading: { control: "boolean" },
    caption: { control: "text" },
    emptyMessage: { control: "text" },
    pageSize: { control: { type: "number", min: 1 } },
    borderColor: { control: "color" },
    headerColor: { control: "color" },
    rowColor: { control: "color" },
    stripeColor: { control: "color", if: { arg: "striped", eq: true } },
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
    sort: { table: { disable: true } },
    defaultSort: { table: { disable: true } },
    onSortChange: { table: { disable: true } },
    page: { table: { disable: true } },
    defaultPage: { table: { disable: true } },
    totalRows: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
    onChange: { table: { disable: true } },
    rowKey: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: { columns, data: sampleData, size: "md" },
};

export const StripedAndBordered: Story = {
  args: { columns, data: sampleData, striped: true, bordered: true },
};

export const WithCustomRender: Story = {
  render: (args) => (
    <Table {...args} columns={statusColumns} data={sampleData} />
  ),
  args: { striped: true },
};

export const Sortable: Story = {
  render: (args) => (
    <Table {...args} columns={sortableColumns} data={sampleData} />
  ),
  args: { striped: true },
};

export const SortableControlled: Story = {
  render: (args) => {
    const [sort, setSort] = useState<{
      key: string;
      direction: "asc" | "desc";
    } | null>(null);
    const sorted = sort
      ? [...sampleData].sort((a, b) => {
          const av = a[sort.key as keyof typeof a];
          const bv = b[sort.key as keyof typeof b];
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;

          return sort.direction === "asc" ? cmp : -cmp;
        })
      : sampleData;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Table
          {...args}
          columns={sortableColumns}
          data={sorted}
          sort={sort}
          onSortChange={setSort}
        />
        <pre style={{ fontSize: 12, margin: 0 }}>
          {JSON.stringify(sort, null, 2)}
        </pre>
      </div>
    );
  },
  args: { striped: true },
};

export const WithUseTable: Story = {
  render: (args) => {
    const { sort, page, onSortChange, onPageChange } = useTable({
      defaultPage: 1,
    });

    const sorted = sort
      ? [...largeData].sort((a, b) => {
          const av = a[sort.key as keyof typeof a];
          const bv = b[sort.key as keyof typeof b];
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;

          return sort.direction === "asc" ? cmp : -cmp;
        })
      : largeData;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Table
          {...args}
          columns={sortableColumns}
          data={sorted}
          sort={sort}
          onSortChange={onSortChange}
          page={page}
          onPageChange={onPageChange}
          pageSize={8}
          totalRows={largeData.length}
        />
        <pre style={{ fontSize: 12, margin: 0 }}>
          {JSON.stringify({ sort, page }, null, 2)}
        </pre>
      </div>
    );
  },
  args: { striped: true },
};

export const Loading: Story = {
  args: { columns, data: [], loading: true, pageSize: 5 },
};

export const Empty: Story = {
  args: { columns, data: [], emptyMessage: "No products found" },
};

export const Paginated: Story = {
  render: (args) => <Table {...args} columns={columns} data={largeData} />,
  args: { striped: true, pageSize: 8 },
};

export const StickyHeader: Story = {
  render: (args) => (
    <Table
      {...args}
      columns={columns}
      data={twentyRows}
      style={{ maxHeight: 240 }}
    />
  ),
  args: { stickyHeader: true, striped: true },
};

export const FullyCustomized: Story = {
  args: {
    columns,
    data: sampleData,
    striped: true,
    bordered: true,
    borderColor: "#6366f1",
    headerColor: "#6366f1",
    rowColor: "#eef2ff",
    stripeColor: "#c7d2fe",
  },
};
