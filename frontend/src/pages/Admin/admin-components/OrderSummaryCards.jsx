import { Box, Paper, Typography } from "@mui/material";
import { MdShoppingCart } from "react-icons/md";

export const OrderSummaryCards = ({ orders, totalAmount }) => (
  <>
  
  <Box className="flex flex-wrap gap-2 mb-3">
    
    <Paper
      elevation={3}
      sx={{
        p: 2,
        flex: 1,
        bgcolor: "primary.light",
        color: "white",
        borderRadius: 2,
        minWidth: 200,
      }}
    >
      {/* Header: Icon + Title */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <MdShoppingCart size={24} />
        <Typography variant="subtitle1" fontWeight="bold">
          Total Orders
        </Typography>
      </Box>

      {/* Order Count */}
      <Typography variant="h3" fontWeight="bold">
        {orders.length}
      </Typography>
    </Paper>

    <Paper
      elevation={3}
      sx={{
        p: 2,
        flex: 1,
        bgcolor: "success.light",
        color: "white",
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
        bgcolor: "warning.light",
        color: "white",
      }}
    >
      <Typography variant="h6">Pending Orders</Typography>
      <Typography variant="h4">
        {orders.filter((order) => order.status === "Pending").length}
      </Typography>
    </Paper>

    <Paper
      elevation={3}
      sx={{
        p: 2,
        flex: 1,
        bgcolor: "success.main",
        color: "white",
      }}
    >
      <Typography variant="h6">Completed Orders</Typography>
      <Typography variant="h4">
        {orders.filter((order) => order.status === "Completed").length}
      </Typography>
    </Paper>
  </Box>
  </>
);
