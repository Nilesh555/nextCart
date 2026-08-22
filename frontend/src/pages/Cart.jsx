import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
  } = useCart();

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">

        <div className="cart-empty">

          <div className="cart-empty-icon">
            🛒
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to
            your cart yet.
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            Start Shopping
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // CART PAGE
  // =====================================================

  return (
    <div className="cart-page">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="cart-header">

        <div>

          <span className="section-label">
            YOUR SHOPPING CART
          </span>

          <h1>Shopping Cart</h1>

          <p>
            Review your products before checkout.
          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* CART CONTENT */}
      {/* ================================================= */}

      <section className="cart-section">

        <div className="cart-container">

          {/* ================================================= */}
          {/* CART ITEMS */}
          {/* ================================================= */}

          <div className="cart-items">

            {cartItems.map((item) => {

              // Product data comes directly from item
              const productId = item.id;

              const title =
                item.title ||
                item.name ||
                "Product";

              const price =
                Number(item.price || 0);

              const stock =
                Number(item.stock || 0);

              const quantity =
                Number(item.quantity || 1);

              // =================================================
              // IMAGE URL
              // =================================================

              const imageUrl = item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `http://127.0.0.1:8000${item.image}`
                : null;

              return (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* ================================================= */}
                  {/* PRODUCT IMAGE */}
                  {/* ================================================= */}

                  <Link
                    to={`/products/${productId}`}
                    className="cart-item-image"
                  >

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                      />
                    ) : (
                      <div className="cart-no-image">
                        No Image
                      </div>
                    )}

                  </Link>


                  {/* ================================================= */}
                  {/* PRODUCT INFORMATION */}
                  {/* ================================================= */}

                  <div className="cart-item-info">

                    <span className="cart-item-category">
                      {item.category?.name ||
                        item.category ||
                        "Product"}
                    </span>

                    <Link
                      to={`/products/${productId}`}
                      className="cart-item-title"
                    >
                      {title}
                    </Link>

                    <p className="cart-item-price">
                      ₹{price.toFixed(2)}
                    </p>

                  </div>


                  {/* ================================================= */}
                  {/* QUANTITY */}
                  {/* ================================================= */}

                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      disabled={quantity <= 1}
                    >
                      −
                    </button>

                    <span>
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      disabled={
                        stock > 0 &&
                        quantity >= stock
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* ================================================= */}
                  {/* ITEM TOTAL */}
                  {/* ================================================= */}

                  <div className="cart-item-total">

                    ₹
                    {(
                      price * quantity
                    ).toFixed(2)}

                  </div>


                  {/* ================================================= */}
                  {/* REMOVE */}
                  {/* ================================================= */}

                  <button
                    type="button"
                    className="cart-remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    title="Remove item"
                  >
                    ×
                  </button>

                </div>
              );
            })}


            {/* ================================================= */}
            {/* CONTINUE SHOPPING */}
            {/* ================================================= */}

            <Link
              to="/products"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>


          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <aside className="cart-summary">

            <h2>Order Summary</h2>


            {/* SUBTOTAL */}

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{Number(subtotal || 0).toFixed(2)}
              </strong>

            </div>


            {/* SHIPPING */}

            <div className="summary-row">

              <span>
                Shipping
              </span>

              <strong>
                ₹{Number(shipping || 0).toFixed(2)}
              </strong>

            </div>


            {/* DIVIDER */}

            <div className="summary-divider"></div>


            {/* TOTAL */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{Number(total || 0).toFixed(2)}
              </strong>

            </div>


            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout
            </Link>

          </aside>

        </div>

      </section>

    </div>
  );
}

export default Cart;