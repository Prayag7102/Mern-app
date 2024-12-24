import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";
import EditModal from "./EditModal";
import { useProductManagement } from "../../../hooks/useProductManagement";
import { createColumns } from "./columns.jsx";

const ManageProduct = () => {
  const {
    selectedProduct,
    editModalOpen,
    searchQuery,
    filterModel,
    setSelectedProduct,
    setEditModalOpen,
    setSearchQuery,
    setFilterModel,
    handleEdit,
    handleProductDelete,
    handleProductEdit,
    getFilteredProducts,
  } = useProductManagement();

  const columns = createColumns(handleEdit, handleProductDelete);

  return (
    <div className="lg:w-[90%] lg:float-end">
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        onSave={handleProductEdit}
      />
      <div className="mt-5">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
          />
        </Box>

        <DataGrid
          rows={getFilteredProducts().map((product) => ({ ...product, id: product._id }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          checkboxSelection
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
        />
      </div>
    </div>
  );
};

export default ManageProduct;
