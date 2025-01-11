import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { EditOutlined, DeleteOutlined, AddOutlined } from "@mui/icons-material";
import AnimateButton from "@/components/@extended/AnimateButton";
const DataTableCategory = ({
  data,
  rowCount,
  isError,
  isLoading,
  isRefetching = false,
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
  pagination,
  setPagination,
  sorting,
  setSorting,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        grow: false,
        size: 10,
      },
      {
        accessorKey: "name",
        header: "Category Name",
        grow: true,
        size: 300,
      },
      {
        header: "Actions",
        size: 30,
        Cell: ({ row }) => (
          <Box sx={{}}>
            {/* Edit Button */}
            <IconButton
              onClick={() => onEditCategory(row.original)}
              color="primary"
            >
              <AnimateButton>
                <EditOutlined />
              </AnimateButton>
            </IconButton>
            {/* Delete Button */}

            <IconButton
              onClick={() => onDeleteCategory(row.original)}
              color="error"
            >
              <AnimateButton>
                <DeleteOutlined />
              </AnimateButton>
            </IconButton>
          </Box>
        ),
      },
    ],
    [onEditCategory, onDeleteCategory]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableBatchRowSelection: true,
    initialState: {
      density: "compact",
    },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: false,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "An error occurred while loading the data.",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "700px" } },
    positionToolbarAlertBanner: "bottom",
    enableColumnResizing: false,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
        <AnimateButton>
          <Button
            onClick={onAddCategory}
            variant="contained"
            startIcon={<AddOutlined />}
          >
            Add Category
          </Button>
        </AnimateButton>
        {table.getIsSomeRowsSelected() && (
          <AnimateButton>
            <Button
              color="error"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={() => {
                // Get selected rows
                const selectedRowIds = table
                  .getSelectedRowModel()
                  .rows.map((row) => row.original.id);

                alert("Delete Selected Records: " + selectedRowIds.join(", "));
                // You can call a delete function here with the selected IDs
                //TODO: Example: onDeleteSelectedCategories(selectedRowIds)
              }}
              variant="contained"
              startIcon={<DeleteOutlined />}
            >
              Delete Selected Record(s)
            </Button>
          </AnimateButton>
        )}
      </Box>
    ),
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <MaterialReactTable table={table} compact />
    </Box>
  );
};

DataTableCategory.propTypes = {
  data: PropTypes.array.isRequired,
  rowCount: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRefetching: PropTypes.bool,
  columnFilters: PropTypes.array.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.array.isRequired,
  setSorting: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
  onEditCategory: PropTypes.func.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
};

export default DataTableCategory;
