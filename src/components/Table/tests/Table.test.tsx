import { render, screen, fireEvent } from "../../../test-utils";
import "@testing-library/jest-dom";
import { Table } from "../Table";
import type { TableColumn } from "../Table.types";

interface Row extends Record<string, unknown> {
  id: string;
  name: string;
  status: string;
}

const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status" },
];

const data: Row[] = [
  { id: "1", name: "Alice", status: "Active" },
  { id: "2", name: "Bob", status: "Inactive" },
  { id: "3", name: "Charlie", status: "Active" },
];

describe("Table", () => {
  it("renders column headers", () => {
    render(<Table columns={columns} data={data} rowKey="id" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders all rows", () => {
    render(<Table columns={columns} data={data} rowKey="id" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("shows empty message when data is empty", () => {
    render(<Table columns={columns} data={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("calls onRowClick when a row is clicked", () => {
    const onRowClick = jest.fn();

    render(
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        onRowClick={onRowClick}
      />,
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it("calls onSortChange when a sortable header is clicked", () => {
    const onSortChange = jest.fn();

    render(
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        onSortChange={onSortChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /name/i }));
    expect(onSortChange).toHaveBeenCalledWith({
      key: "name",
      direction: "asc",
    });
  });

  it("renders loading skeletons when loading is true", () => {
    render(<Table columns={columns} data={[]} loading />);
    expect(screen.queryByText("Nothing here")).not.toBeInTheDocument();
  });

  it("renders with caption when provided", () => {
    render(<Table columns={columns} data={data} caption="User list" />);
    expect(screen.getByText("User list")).toBeInTheDocument();
  });

  it("uses custom render function for cells", () => {
    const customColumns: TableColumn<Row>[] = [
      {
        key: "name",
        header: "Name",
        render: (value) => <strong>{String(value)}</strong>,
      },
    ];

    render(<Table columns={customColumns} data={data} rowKey="id" />);
    expect(screen.getByText("Alice").tagName).toBe("STRONG");
  });
});
