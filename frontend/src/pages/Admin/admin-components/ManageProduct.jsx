import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { getProducts } from "../../../api/products";
import { MdOutlineEditNote,MdDeleteOutline  } from "react-icons/md";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DataGrid Columns
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "discountedPrice", headerName: "Discounted Price", width: 150 },
    { field: "stock", headerName: "Stock", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={
            params.row.image
              ? `http://localhost:5000/uploads/${params.row.image}`
              : "https://via.placeholder.com/150"
          }
          alt={params.row.name}
          style={{ width: "50px", height: "50px", borderRadius: "4px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex:1,
      minwidth: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(params.id)}
        >
          <MdOutlineEditNote className="text-2xl" />
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.id)}
        >
          <MdDeleteOutline className="text-2xl" />
        </Button>
      </Stack>
        
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id} 
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default ManageProducts;
