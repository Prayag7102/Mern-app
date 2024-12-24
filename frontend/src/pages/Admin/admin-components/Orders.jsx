import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip, Alert } from '@mui/material';
import axiosInstance from '../../../api/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await axiosInstance.get('/checkout/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Orders data:', response.data.orders);
      setOrders(response.data.orders || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.response && error.response.data.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      field: '_id', 
      headerName: 'Order ID', 
      width: 220,
      renderCell: (params) => params.row._id
    },
    { 
      field: 'userId', 
      headerName: 'Customer', 
      width: 200,
      renderCell: (params) => params.row.userId.name
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params) => params.row.userId.email
    },
    {
      field: 'address',
      headerName: 'Shipping Address',
      width: 300,
      renderCell: (params) => {
        const address = params.row.address;
        return `${address.fullName}, ${address.addressLine1}, ${address.city}, ${address.state} - ${address.pinCode}`;
      }
    },
    {
      field: 'products',
      headerName: 'Products',
      width: 400,
      renderCell: (params) => (
        <div>
          {params.row.products.map((product, index) => (
            <div key={index}>
              {`${product.productId.name} (${product.quantity}x) - ${product.color}, ${product.size}`}
            </div>
          ))}
        </div>
      )
    },
    {
      field: 'totalPrice',
      headerName: 'Total Amount',
      width: 130,
      renderCell: (params) => `₹${params.row.totalPrice.toLocaleString()}`
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={
            params.row.status === 'Pending' ? 'warning' :
            params.row.status === 'Completed' ? 'success' :
            params.row.status === 'Cancelled' ? 'error' : 'default'
          }
          variant="outlined"
        />
      )
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 150,
      renderCell: (params) => params.row.paymentMethod
    },
    {
      field: 'createdAt',
      headerName: 'Order Date',
      width: 200,
      renderCell: (params) => new Date(params.row.createdAt).toLocaleString()
    }
  ];

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading orders...</Typography>
      </Box>
    );
  }

  return (
    <>
     <div className="lg:w-[90%] lg:float-end">
    <Box sx={{ height: 600, width: '100%', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Orders Management
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row._id}
        loading={loading}
        disableSelectionOnClick
        autoHeight
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </Box>
    </div>
    </>
  );
};

export default Orders;