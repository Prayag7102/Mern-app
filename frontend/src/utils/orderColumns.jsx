import { Chip } from '@mui/material';

export const getOrderColumns = () => [
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
              params.row.status === 'Failed' ? 'error' : 'default'
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