import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import indiaLocations from "../data/indiaLocations";

function Checkout() {
  const {
    cartItems,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  // =====================================================
  // FORM DATA
  // =====================================================

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

  // =====================================================
  // STATES
  // =====================================================

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // HANDLE STATE CHANGE
  // =====================================================

  const handleStateChange = (e) => {
    const selectedState = e.target.value;

    setFormData((prev) => ({
      ...prev,

      state: selectedState,

      // Reset city when state changes
      city: "",
    }));

    setError("");
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ===================================================
    // PHONE VALIDATION
    // ===================================================

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(formData.phone)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );

      return;
    }

    // ===================================================
    // PINCODE VALIDATION
    // ===================================================

    const pincodeRegex = /^\d{6}$/;

    if (!pincodeRegex.test(formData.pincode)) {
      setError(
        "Please enter a valid 6-digit pincode."
      );

      return;
    }

    // ===================================================
    // CHECK STATE
    // ===================================================

    if (!formData.state) {
      setError("Please select a state.");

      return;
    }

    // ===================================================
    // CHECK CITY
    // ===================================================

    if (!formData.city) {
      setError("Please select a city.");

      return;
    }

    try {
      setPlacingOrder(true);

      // =================================================
      // ORDER DATA
      // =================================================

      const orderData = {
        customer: formData,

        items: cartItems,

        subtotal: subtotal,

        shipping: shipping,

        total: total,
      };

      console.log(
        "Order Data:",
        orderData
      );

      // =================================================
      // TEMPORARY ORDER API SIMULATION
      // =================================================
      //
      // Later replace this with your Django Order API.
      //

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      // =================================================
      // CLEAR CART
      // =================================================

      clearCart();

      // =================================================
      // SHOW SUCCESS
      // =================================================

      setSuccess(true);

    } catch (error) {
      console.error(
        "Order placement failed:",
        error
      );

      setError(
        "Unable to place order. Please try again."
      );

    } finally {
      setPlacingOrder(false);
    }
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (
    cartItems.length === 0 &&
    !success
  ) {
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

  // =====================================================
  // SUCCESS
  // =====================================================

  if (success) {
    return (
      <div className="checkout-page">

        <div className="order-success">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you for shopping with
            NextCart. Your order has been
            received.
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

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${
      import.meta.env.VITE_API_URL ||
      "http://127.0.0.1:8000"
    }${image}`;
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="checkout-page">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="checkout-header">

        <div>

          <span className="section-label">
            CHECKOUT
          </span>

          <h1>
            Complete Your Order
          </h1>

          <p>
            Enter your details to place
            your order.
          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* CHECKOUT */}
      {/* ================================================= */}

      <section className="checkout-section">

        <div className="checkout-container">

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            {/* ================================================= */}
            {/* CUSTOMER INFORMATION */}
            {/* ================================================= */}

            <div className="checkout-card">

              <h2>
                Customer Information
              </h2>

              {/* FIRST + LAST NAME */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={
                      formData.firstName
                    }
                    onChange={handleChange}
                    placeholder="First name"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={
                      formData.lastName
                    }
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                  />

                </div>

              </div>

              {/* EMAIL + PHONE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      formData.email
                    }
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={
                      formData.phone
                    }
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    inputMode="numeric"
                    required
                  />

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* DELIVERY ADDRESS */}
            {/* ================================================= */}

            <div className="checkout-card">

              <h2>
                Delivery Address
              </h2>

              {/* ADDRESS */}

              <div className="form-group">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows="4"
                  required
                />

              </div>

              {/* CITY + STATE + PINCODE */}

              <div className="form-row">

                {/* CITY */}

                <div className="form-group">

                  <label>
                    City
                  </label>

                  <select
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={handleChange}
                    disabled={
                      !formData.state
                    }
                    required
                  >

                    <option value="">
                      {formData.state
                        ? "Select City"
                        : "Select State First"}
                    </option>

                    {formData.state &&
                      indiaLocations[
                        formData.state
                      ]?.map(
                        (city) => (
                          <option
                            key={city}
                            value={city}
                          >
                            {city}
                          </option>
                        )
                      )}

                  </select>

                </div>

                {/* STATE */}

                <div className="form-group">

                  <label>
                    State
                  </label>

                  <select
                    name="state"
                    value={
                      formData.state
                    }
                    onChange={
                      handleStateChange
                    }
                    required
                  >

                    <option value="">
                      Select State
                    </option>

                    {Object.keys(
                      indiaLocations
                    ).map(
                      (state) => (
                        <option
                          key={state}
                          value={state}
                        >
                          {state}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* PINCODE */}

                <div className="form-group">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={
                      formData.pincode
                    }
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    inputMode="numeric"
                    required
                  />

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div className="checkout-error">
                {error}
              </div>
            )}

            {/* ================================================= */}
            {/* PLACE ORDER */}
            {/* ================================================= */}

            <button
              type="submit"
              className="place-order-btn"
              disabled={
                placingOrder
              }
            >

              {placingOrder
                ? "Placing Order..."
                : `Place Order • ₹${total.toFixed(
                    2
                  )}`}

            </button>

          </form>

          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <aside className="checkout-summary">

            <h2>
              Your Order
            </h2>

            <div className="checkout-products">

              {cartItems.map(
                (item) => {

                  const imageUrl =
                    getImageUrl(
                      item.image
                    );

                  return (
                    <div
                      className="checkout-product"
                      key={item.id}
                    >

                      {/* PRODUCT IMAGE */}

                      <div className="checkout-product-image">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              item.title
                            }
                          />
                        ) : (
                          <span>
                            🛍️
                          </span>
                        )}

                        <span className="checkout-quantity">
                          {item.quantity}
                        </span>

                      </div>

                      {/* PRODUCT INFO */}

                      <div className="checkout-product-info">

                        <h4>
                          {item.title}
                        </h4>

                        <span>
                          ₹
                          {Number(
                            item.price
                          ).toFixed(2)}
                        </span>

                      </div>

                      {/* ITEM TOTAL */}

                      <strong>
                        ₹
                        {(
                          Number(
                            item.price
                          ) *
                          Number(
                            item.quantity
                          )
                        ).toFixed(2)}
                      </strong>

                    </div>
                  );
                }
              )}

            </div>

            {/* ================================================= */}
            {/* SUMMARY */}
            {/* ================================================= */}

            <div className="summary-divider"></div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {subtotal.toFixed(2)}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Shipping
              </span>

              <strong>
                ₹
                {shipping.toFixed(2)}
              </strong>

            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toFixed(2)}
              </strong>

            </div>

          </aside>

        </div>

      </section>

    </div>
  );
}

export default Checkout;