import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { TableProps, SortState } from "./Table.types";
import { useTableSort } from "./useTableSort";
import { useTablePagination, getPageNumbers } from "./useTablePagination";
import {
  TableWrapper,
  StyledTable,
  Thead,
  Tbody,
  Tr,
  ClickableTr,
  Th,
  Td,
  SortButton,
  SortIcon,
  EmptyCell,
  SkeletonCell,
  SkeletonLine,
  PaginationBar,
  PageButton,
} from "./Table.styles";

const SKELETON_ROWS = 4;

function getSortIcon(activeSort: SortState | null, colKey: string) {
  if (activeSort?.key !== colKey) {
    return <ArrowUpDown size={14} />;
  }

  return activeSort.direction === "asc" ? (
    <ArrowUp size={14} />
  ) : (
    <ArrowDown size={14} />
  );
}

export function Table<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  data,
  rowKey,
  size = "md",
  striped,
  bordered,
  stickyHeader,
  caption,
  emptyMessage = "No data",
  loading,
  sort,
  defaultSort,
  onSortChange,
  pageSize,
  page,
  defaultPage,
  totalRows,
  onPageChange,
  onChange,
  onRowClick,
  borderColor,
  headerColor,
  rowColor,
  stripeColor,
  className,
  style,
}: TableProps<T>) {
  const {
    activeSort,
    sortedData,
    handleSort: applySort,
  } = useTableSort({
    data,
    sort,
    defaultSort,
    onSortChange,
  });

  const {
    activePage,
    totalPages,
    displayData,
    handlePageChange: applyPage,
  } = useTablePagination({
    data: sortedData,
    pageSize,
    page,
    defaultPage,
    totalRows,
    onPageChange,
  });

  const handleSort = (key: string) => {
    const newSort = applySort(key);

    onChange?.({ sort: newSort, page: activePage });
  };

  const handlePageChange = (newPage: number) => {
    applyPage(newPage);
    onChange?.({ sort: activeSort, page: newPage });
  };

  const getRowKey = (row: T, index: number) =>
    rowKey ? String(row[rowKey]) : String(index);

  const isEmpty = !loading && displayData.length === 0;
  const skeletonCount = pageSize ?? SKELETON_ROWS;

  return (
    <TableWrapper
      $borderColor={borderColor}
      $stickyHeader={stickyHeader}
      className={className}
      style={style}
    >
      <StyledTable $size={size}>
        {caption && <caption>{caption}</caption>}
        <Thead
          $headerColor={headerColor}
          $borderColor={borderColor}
          $stickyHeader={stickyHeader}
        >
          <Tr>
            {columns.map((col) => (
              <Th
                key={col.key}
                $size={size}
                $bordered={bordered}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.sortable ? (
                  <SortButton
                    type="button"
                    onClick={() => handleSort(col.key)}
                    aria-label={`Sort by ${col.header}${activeSort?.key === col.key ? `, ${activeSort.direction}ending` : ""}`}
                  >
                    {col.header}
                    <SortIcon aria-hidden="true">
                      {getSortIcon(activeSort, col.key)}
                    </SortIcon>
                  </SortButton>
                ) : (
                  col.header
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          $striped={striped}
          $rowColor={rowColor}
          $stripeColor={stripeColor}
        >
          {loading ? (
            Array.from({ length: skeletonCount }).map((_, i) => (
              <Tr key={i}>
                {columns.map((col) => (
                  <SkeletonCell
                    key={col.key}
                    $size={size}
                    $bordered={bordered}
                    $borderColor={borderColor}
                  >
                    <SkeletonLine />
                  </SkeletonCell>
                ))}
              </Tr>
            ))
          ) : isEmpty ? (
            <tr>
              <EmptyCell colSpan={columns.length}>{emptyMessage}</EmptyCell>
            </tr>
          ) : (
            displayData.map((row, rowIndex) => {
              const RowComponent = onRowClick ? ClickableTr : Tr;

              return (
                <RowComponent
                  key={getRowKey(row, rowIndex)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  $accentColor={onRowClick ? borderColor : undefined}
                >
                  {columns.map((col) => (
                    <Td
                      key={col.key}
                      $size={size}
                      $bordered={bordered}
                      $borderColor={borderColor}
                    >
                      {col.render
                        ? col.render(row[col.key], row, rowIndex)
                        : String(row[col.key] ?? "") || " "}
                    </Td>
                  ))}
                </RowComponent>
              );
            })
          )}
        </Tbody>
      </StyledTable>
      {pageSize && totalPages > 1 && (
        <PaginationBar>
          <PageButton
            type="button"
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage <= 1}
            aria-label="Previous page"
          >
            ←
          </PageButton>
          {getPageNumbers(activePage, totalPages).map((p, i) =>
            p === "..." ? (
              <span
                key={`e${i}`}
                aria-hidden="true"
                style={{ padding: "0 4px" }}
              >
                …
              </span>
            ) : (
              <PageButton
                key={p}
                type="button"
                $active={p === activePage}
                onClick={() => handlePageChange(p as number)}
                aria-label={`Page ${p}`}
                aria-current={p === activePage ? "page" : undefined}
              >
                {p}
              </PageButton>
            ),
          )}
          <PageButton
            type="button"
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage >= totalPages}
            aria-label="Next page"
          >
            →
          </PageButton>
        </PaginationBar>
      )}
    </TableWrapper>
  );
}

Table.displayName = "Table";
