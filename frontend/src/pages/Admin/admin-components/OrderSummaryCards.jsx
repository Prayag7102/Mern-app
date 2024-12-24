import { Box, Paper, Typography } from '@mui/material';

export const OrderSummaryCards = ({ orders, totalAmount }) => (
    <Box className="flex flex-wrap gap-2 mb-3">
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        flex: 1, 
        bgcolor: 'primary.light',
        color: 'white'
      }}
    >
      <Typography variant="h6">Total Orders</Typography>
      <Typography variant="h4">{orders.length}</Typography>
    </Paper>

    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        flex: 1, 
        bgcolor: 'success.light',
        color: 'white'
      }}
    >
      <Typography variant="h6">Total Revenue</Typography>
      <Typography variant="h4">₹{totalAmount.toLocaleString()}</Typography>
    </Paper>

    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        flex: 1, 
        bgcolor: 'warning.light',
        color: 'white'
      }}
    >
      <Typography variant="h6">Pending Orders</Typography>
      <Typography variant="h4">
        {orders.filter(order => order.status === 'Pending').length}
      </Typography>
    </Paper>

    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        flex: 1, 
        bgcolor: 'success.main',
        color: 'white'
      }}
    >
      <Typography variant="h6">Completed Orders</Typography>
      <Typography variant="h4">
        {orders.filter(order => order.status === 'Completed').length}
      </Typography>
    </Paper>
  </Box>
);