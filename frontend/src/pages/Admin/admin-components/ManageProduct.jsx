import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, TextField } from "@mui/material";
import { getProducts } from "../../../api/products";
import { toast } from "react-toastify";
import EditModal from "./EditModal";
import { handleDelete, handleEditSave } from "../../../utils/ProductUtils";
import { MdEditNote, MdDelete } from "react-icons/md";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "description", headerName: "Description", flex: 2, minWidth: 200 },
    { field: "price", headerName: "Price", type: "number", flex: 1, minWidth: 100 },
    {
      field: "discountedPrice",
      headerName: "Discounted Price",
      type: "number",
      flex: 1,
      minWidth: 150,
    },
    { field: "stock", headerName: "Stock", type: "number", flex: 1, minWidth: 100 },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => params.value.join(", "), 
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => params.value.join(", "), 
    },
    { field: "brand", headerName: "Brand", flex: 1, minWidth: 150 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/uploads/${params.value}`}
          alt="Product"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.id)}
          >
            <MdEditNote className="text-lg" />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.id, setProducts, toast)} 
          >
            <MdDelete className="text-lg" />
          </Button>
        </Stack>
      ),
    },
  ];

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    setSelectedProduct(productToEdit);
    setEditModalOpen(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery)
  );

  return (
    <>
     <div className="lg:w-[90%] lg:float-end">
      <EditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={selectedProduct}
          setProduct={setSelectedProduct}
          onSave={() => handleEditSave(selectedProduct, setProducts, setEditModalOpen, toast)} 
        />
        <div className="mt-5" style={{ height: 600, width: "100%" }}>
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
            rows={filteredProducts.map((product) => ({ ...product, id: product._id }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            checkboxSelection
            onSelectionModelChange={(ids) => setSelectedRows(ids)}
            filterModel={filterModel}
            onFilterModelChange={(model) => setFilterModel(model)} // Handle filter changes
          />
        </div>
     </div>
    </>
  );
};

export default ManageProduct;
