import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children:[
      {
        index:true,
        element:(
          <>
            <HomePage/>
          </>
        )
      },
        {
          path: "/products/:id",
          element: <ProductDetail />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
    ]
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute isAdmin={true}>
        <AdminLayout /> 
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <Search/>
            <DashCards />
            <TableData />
          </>
        ),
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'dashcards',
        element: <DashCards />,
      },
      {
        path: 'table-data',
        element: <TableData />,
      },
      {
        path: 'addproducts',
        element: <AddProducts />,
      },
      {
        path: 'manageproducts',
        element: <ManageProducts />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'banner',
        element: <BannerUpload />,
      },
      {
        path: 'editbanner',
        element: <BannerTable />,
      },
    ],
  },
  {
    path: "/profile", 
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <>
           <ProfilePage/>
          </>
        ),
      },
      {
        path: "cart", 
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ]
  },
  {
    path: "*", 
    element: <NotFoundPage />,
  },
]);

function App() {
  //localStorage.clear();
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
