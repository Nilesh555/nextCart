import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
    totalItems,
  } = useCart();

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `http://127.0.0.1:8000${image}`;
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>

          <p>
            Add some products to your cart.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* ========================================== */}
      {/* CART HEADER */}
      {/* ========================================== */}

      <div className="cart-header">
        <h1>Shopping Cart</h1>

        <p>
          {totalItems} item
          {totalItems !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="cart-container">

        {/* ========================================== */}
        {/* CART ITEMS */}
        {/* ========================================== */}

        <div className="cart-items">

          {cartItems.map((item) => {
            const itemPrice = Number(
              item.price || 0
            );

            const itemQuantity = Number(
              item.quantity || 1
            );

            const itemStock = Number(
              item.stock || 0
            );

            const itemTotal =
              itemPrice * itemQuantity;

            return (
              <div
                className="cart-item"
                key={item.id}
              >

                {/* PRODUCT IMAGE */}

                <div className="cart-item-image">
                  {item.image ? (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                    />
                  ) : (
                    <div className="no-image">
                      No Image
                    </div>
                  )}
                </div>

                {/* PRODUCT DETAILS */}

                <div className="cart-item-details">

                  <h3>{item.title}</h3>

                  <p className="cart-item-price">
                    ₹{itemPrice.toFixed(2)}
                  </p>

                  {/* QUANTITY */}

                  <div className="cart-quantity">

                    <span>Quantity:</span>

                    <div className="cart-quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        disabled={
                          itemQuantity <= 1
                        }
                      >
                        −
                      </button>

                      <span>
                        {itemQuantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        disabled={
                          itemStock > 0 &&
                          itemQuantity >= itemStock
                        }
                      >
                        +
                      </button>

                    </div>
                  </div>

                </div>

                {/* ITEM TOTAL */}

                <div className="cart-item-total">

                  <p>
                    ₹{itemTotal.toFixed(2)}
                  </p>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* ========================================== */}
        {/* ORDER SUMMARY */}
        {/* ========================================== */}

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <span>
              ₹{shipping.toFixed(2)}
            </span>
          </div>

          <hr />

          <div className="summary-row total-row">
            <strong>Total</strong>

            <strong>
              ₹{total.toFixed(2)}
            </strong>
          </div>

          <button
            className="checkout-button"
           onClick={ ()=> navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <button
            className="continue-shopping-button"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
}

export default Cart;