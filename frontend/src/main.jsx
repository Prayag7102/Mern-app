import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import App from './App.jsx'
import { UserProvider } from './context/user.context'
import { AdminProvider } from './context/admin.context.jsx'
import { OrderProvider } from './context/order.context.jsx'
import { CartProvider } from './context/cart.context.jsx'
import { BannerProvider } from './context/banner.context.jsx'
import { ProductsProvider } from './context/product.context.jsx'


createRoot(document.getElementById("root")).render(
  <AdminProvider>
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <BannerProvider>
              <ProductsProvider>
                <App />
              </ProductsProvider>
            </BannerProvider>
          </OrderProvider>
        </CartProvider>
      </UserProvider>
  </AdminProvider>
);
