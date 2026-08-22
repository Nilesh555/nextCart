import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />


          {/* ================= PROTECTED ROUTES ================= */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/orders/:id"
              element={<OrderDetails />}
            />

          </Route>


          {/* ================= 404 ROUTE ================= */}

          <Route
            path="*"
            element={
              <div className="products-status">
                <h2>404</h2>
                <p>Page not found.</p>
              </div>
            }
          />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;