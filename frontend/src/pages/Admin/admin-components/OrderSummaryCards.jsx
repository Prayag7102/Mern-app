import { Box, Paper, Typography } from "@mui/material";
import { MdShoppingCart } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { useOrder } from "../../../context/order.context";

export const OrderSummaryCards = () => {
  const { orders, totalAmount } = useOrder();

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-5 mb-5">
      {[
        {
          title: "Total Orders",
          icon: <MdShoppingCart size={24} />,
          value: orders?.length,
          bg: "bg-gradient-to-tr from-blue-400 to-blue-600",
          iconBg: "bg-blue-600",
        },
        {
          title: "Total Revenue",
          icon: <MdAttachMoney size={24} />,
          value: `₹${totalAmount.toLocaleString()}`,
          bg: "bg-gradient-to-tr from-green-400 to-green-600",
          iconBg: "bg-green-600",
        },
        {
          title: "Pending Orders",
          icon: <MdPendingActions size={24} />,
          value: orders?.filter((order) => order.status === "Pending").length,
          bg: "bg-gradient-to-tr from-yellow-400 to-yellow-600",
          iconBg: "bg-yellow-600",
        },
        {
          title: "Completed Orders",
          icon: <MdDoneAll size={24} />,
          value: orders?.filter((order) => order.status === "Completed").length,
          bg: "bg-gradient-to-tr from-emerald-500 to-green-700",
          iconBg: "bg-emerald-500",
        },
        {
          title: "Failed Orders",
          icon: <MdErrorOutline size={24} />,
          value: orders?.filter((order) => order.status === "Failed").length,
          bg: "bg-gradient-to-tr from-red-500 to-red-700",
          iconBg: "bg-red-700",
        },
      ].map(({ title, icon, value, bg, iconBg }, idx) => (
        <Box
          key={idx}
          className={`rounded-2xl p-4 text-white shadow-lg transform transition duration-300 hover:scale-[1.03] hover:shadow-xl glass-card relative overflow-hidden ${bg}`}
        >
          <Box
            className={`absolute top-2 right-2 ${iconBg} bg-white/20 backdrop-blur-md text-white p-2 rounded-full shadow-md`}
          >
            {icon}
          </Box>
          <Typography
            variant="subtitle2"
            className="uppercase font-semibold text-white/90 drop-shadow-sm"
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            className="font-bold text-white drop-shadow-md"
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
