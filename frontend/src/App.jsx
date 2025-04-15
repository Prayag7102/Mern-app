// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/RegisterPage";
import AdminLogin from "./pages/AdminLogin";
import NotFoundPage from "./components/NotFoundPage";
import AdminLayout from "./pages/Admin/AdminLayout";
import DashCards from "./pages/Admin/admin-components/DashCards";
import TableData from "./pages/Admin/admin-components/TableData";
import Search from "./pages/Admin/admin-components/Search";
import ContactUs from "./pages/ContactUs";
import AddProducts from "./pages/Admin/admin-components/AddProducts";
import ManageProducts from "./pages/Admin/admin-components/ManageProduct";
import Cart from "./pages/Cart";
import UserLayout from "./pages/UserLayout";
import ProductDetail from "./pages/ProductDetails";
import Home from "./pages/Home";
import Checkout from "./pages/CheckOut";
import Orders from "./pages/Admin/admin-components/Orders";
import BannerUpload from "./pages/Admin/admin-components/BannerUpload";
import BannerTable from "./pages/Admin/admin-components/BannerTable";
import OrderSuccess from "./components/OrderSuccess";
import GetAllInquiry from "./pages/Admin/admin-components/GetAllInquiry";
import ScrollToTop from "./components/ScrollToTop";
import AdminProtected from "./components/AdminProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />}>
            <Route index element={<HomePage />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="contact" element={<ContactUs />} />
          </Route>

          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Protected User Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtected>
                <AdminLayout />
              </AdminProtected>
            }
          >
            <Route index element={<><Search /><DashCards /><TableData /></>} />
            <Route path="search" element={<Search />} />
            <Route path="dashcards" element={<DashCards />} />
            <Route path="table-data" element={<TableData />} />
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="manageproducts" element={<ManageProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="banner" element={<BannerUpload />} />
            <Route path="editbanner" element={<BannerTable />} />
            <Route path="inquiry" element={<GetAllInquiry />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
