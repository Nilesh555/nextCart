import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPlacingOrder(true);

      // Later connect Django Order API here
      console.log("Order Data:", {
        customer: formData,
        items: cartItems,
        subtotal,
        shipping,
        total,
      });

      // Simulate order placement
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      clearCart();
      setSuccess(true);

    } catch (error) {
      console.error(
        "Order placement failed:",
        error
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // Empty cart
  if (cartItems.length === 0 && !success) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">

          <h1>Your Cart is Empty</h1>

          <p>
            Add products before proceeding to
            checkout.
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            Browse Products
          </Link>

        </div>
      </div>
    );
  }

  // Success
  if (success) {
    return (
      <div className="checkout-page">

        <div className="order-success">

          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with NextCart.
            Your order has been received.
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* Header */}
      <section className="checkout-header">

        <div>
          <span className="section-label">
            CHECKOUT
          </span>

          <h1>Complete Your Order</h1>

          <p>
            Enter your details to place your order.
          </p>
        </div>

      </section>

      {/* Checkout */}
      <section className="checkout-section">

        <div className="checkout-container">

          {/* Form */}
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <div className="checkout-card">

              <h2>Customer Information</h2>

              <div className="form-row">

                <div className="form-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                  />
                </div>

              </div>

            </div>

            {/* Address */}
            <div className="checkout-card">

              <h2>Delivery Address</h2>

              <div className="form-group">

                <label>Address</label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows="4"
                  required
                />

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                  />
                </div>

              </div>

            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={placingOrder}
            >
              {placingOrder
                ? "Placing Order..."
                : `Place Order • ₹${total.toFixed(2)}`}
            </button>

          </form>

          {/* Order Summary */}
          <aside className="checkout-summary">

            <h2>Your Order</h2>

            <div className="checkout-products">

              {cartItems.map((item) => {

                const imageUrl =
                  item.image?.startsWith("http")
                    ? item.image
                    : item.image
                    ? `${import.meta.env.VITE_API_URL}${item.image}`
                    : null;

                return (
                  <div
                    className="checkout-product"
                    key={item.id}
                  >

                    <div className="checkout-product-image">

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.title}
                        />
                      ) : (
                        <span>🛍️</span>
                      )}

                      <span className="checkout-quantity">
                        {item.quantity}
                      </span>

                    </div>

                    <div className="checkout-product-info">

                      <h4>
                        {item.title}
                      </h4>

                      <span>
                        ₹{Number(item.price).toFixed(2)}
                      </span>

                    </div>

                    <strong>
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                  </div>
                );
              })}

            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>
                ₹{subtotal.toFixed(2)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong>
                ₹{shipping.toFixed(2)}
              </strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>
            </div>

          </aside>

        </div>

      </section>

    </div>
  );
}

export default Checkout;