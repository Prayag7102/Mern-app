import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Alert } from '@mui/material';
import { getOrderColumns } from '../../../utils/orderColumns';
import { useOrder } from '../../../context/order.context';

const Orders = () => {
  const { orders,loading1,error } = useOrder();
  const columns = getOrderColumns();

  if (loading1) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading orders...</Typography>
      </Box>
    );
  }

  return (
    <div className="">
      <Box sx={{ height: 600, width: '100%', p: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Orders 
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
          loading={loading1}
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
  );
};

export default Orders;