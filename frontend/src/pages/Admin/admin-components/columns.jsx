import React from 'react';
import { Button, Stack } from "@mui/material";
import { MdEditNote, MdDelete } from "react-icons/md";

export const createColumns = (handleEdit, handleDelete) => [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "description", headerName: "Description", flex: 2, minWidth: 200 },
  { field: "price", headerName: "Price", type: "number", flex: 1, minWidth: 100 },
  { field: "discountedPrice", headerName: "Discounted Price", type: "number", flex: 1, minWidth: 150 },
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
        <Button variant="contained" color="primary" onClick={() => handleEdit(params.id)}>
          <MdEditNote className="text-lg" />
        </Button>
        <Button variant="contained" color="error" onClick={() => handleDelete(params.id)}>
          <MdDelete className="text-lg" />
        </Button>
      </Stack>
    ),
  },
]; 