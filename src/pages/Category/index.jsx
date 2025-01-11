import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
} from "@mui/material";

import AlertRecordDelete from "@/components/Category/AlertRecordDelete";
import DataTableCategory from "@/components/Category/DataTableCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categories/categorySlice";
import FormModal from "@/components/Category/FormModal";
export default function Category() {
  const dispatch = useDispatch();

  const { categories, rowCount, isLoading, isError, isRefetching } =
    useSelector((state) => state.categories);
  // Local state for filters and pagination
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalOpenDelete] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    dispatch(
      fetchCategories({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sorting,
        filters: columnFilters,
      })
    );
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    columnFilters,
  ]);
  const handleAddCategory = (addedRecord) => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    if (addedRecord) {
      dispatch(
        fetchCategories({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sorting,
          filters: columnFilters,
        })
      );
    }
  };
  const handleDeleteCategory = (deleteRecord) => {
    setIsModalOpenDelete(false);
    setSelectedRecord(null);
    if (deleteRecord) {
      dispatch(
        fetchCategories({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sorting,
          filters: columnFilters,
        })
      );
    }
  };

  return (
    <Container>
      <Box>
        <Card>
          <CardContent>
            <DataTableCategory
              data={categories}
              rowCount={rowCount}
              isError={isError}
              isLoading={isLoading}
              isRefetching={isRefetching}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              onAddCategory={() => {
                setSelectedRecord(null);
                setIsModalOpen(true);
              }}
              onEditCategory={(record) => {
                setSelectedRecord(record);
                setIsModalOpen(true);
              }}
              onDeleteCategory={(record) => {
                setSelectedRecord(record);
                setIsModalOpenDelete(true);
              }}
            />
            <FormModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddCategory}
              onSuccess={handleAddCategory}
              recordData={selectedRecord}
            />
            <AlertRecordDelete
              id={Number(selectedRecord?.id)}
              onClose={() => setIsModalOpenDelete(false)}
              recordData={selectedRecord}
              open={isModalDeleteOpen}
              onSubmit={handleDeleteCategory}
              onSuccess={handleDeleteCategory}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
