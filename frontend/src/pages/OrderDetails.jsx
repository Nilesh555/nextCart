import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getOrderById,
  cancelOrder,
} from "../services/orderService";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";


function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const [error, setError] = useState("");
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrderById(id);

        setOrder(data);

      } catch (err) {
        console.error("Order details error:", err);

        setError(
          err?.response?.data?.detail ||
          "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);


  /* =====================================================
     CANCEL ORDER
  ===================================================== */

  const handleCancelOrder = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);
      setCancelError("");

      const updatedOrder = await cancelOrder(id);

      /*
       * If API returns updated order,
       * use it directly.
       */

      if (updatedOrder) {
        setOrder(updatedOrder);
      } else {
        setOrder((prev) => ({
          ...prev,
          status: "cancelled",
        }));
      }

    } catch (err) {
      console.error("Cancel order error:", err);

      setCancelError(
        err?.response?.data?.detail ||
        "Unable to cancel this order."
      );
    } finally {
      setCancelling(false);
    }
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <Loading message="Loading order details..." />
    );
  }


  /* =====================================================
     ERROR
  ===================================================== */

  if (error || !order) {
    return (
      <ErrorMessage
        message={error || "Order not found."}
        showBackButton={true}
      />
    );
  }


  /* =====================================================
     ORDER DATA
  ===================================================== */

  const orderId =
    order.id || order.pk || id;

  const status =
    order.status || "pending";

  const total =
    order.total ??
    order.total_amount ??
    0;

  const createdDate =
    order.created_at ||
    order.created ||
    order.date;


  /*
   * Depending on your Django serializer,
   * items might be called items or order_items.
   */

  const items =
    order.items ||
    order.order_items ||
    [];


  const canCancel = [
    "pending",
    "confirmed",
    "processing",
  ].includes(
    String(status).toLowerCase()
  );


  return (
    <div className="order-details-page">

      <div className="order-details-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="order-details-header">

          <Link
            to="/orders"
            className="order-back-link"
          >
            ← Back to Orders
          </Link>

          <span className="order-details-label">
            ORDER DETAILS
          </span>

          <h1>
            Order #{orderId}
          </h1>

          {createdDate && (
            <p>
              Placed on{" "}
              {new Date(
                createdDate
              ).toLocaleDateString()}
            </p>
          )}

        </div>


        {/* =================================================
            ORDER SUMMARY
        ================================================= */}

        <div className="order-summary-card">

          <div className="order-summary-item">

            <span>
              Order Status
            </span>

            <strong
              className={`order-details-status ${String(
                status
              ).toLowerCase()}`}
            >
              {status}
            </strong>

          </div>


          <div className="order-summary-item">

            <span>
              Order Total
            </span>

            <strong className="order-summary-total">
              ₹{total}
            </strong>

          </div>

        </div>


        {/* =================================================
            ERROR CANCELLING
        ================================================= */}

        {cancelError && (
          <div className="order-cancel-error">
            {cancelError}
          </div>
        )}


        {/* =================================================
            ITEMS
        ================================================= */}

        <div className="order-items-card">

          <div className="order-card-heading">

            <h2>
              Order Items
            </h2>

            <span>
              {items.length} item
              {items.length !== 1 ? "s" : ""}
            </span>

          </div>


          {items.length === 0 ? (

            <div className="order-no-items">
              No item information available.
            </div>

          ) : (

            <div className="order-items-list">

              {items.map((item, index) => {

                const product =
                  item.product ||
                  {};

                const title =
                  product.title ||
                  item.product_name ||
                  item.title ||
                  "Product";

                const quantity =
                  item.quantity || 1;

                const price =
                  item.price ??
                  product.price ??
                  0;

                const image =
                  product.image ||
                  item.image ||
                  null;

                const imageUrl = image
                  ? image.startsWith("http")
                    ? image
                    :`https://nextcart-1-s578.onrender.com${image}`
                  : null;

                return (
                  <div
                    className="order-item"
                    key={
                      item.id ||
                      `${orderId}-${index}`
                    }
                  >

                    <div className="order-item-image">

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={title}
                        />
                      ) : (
                        <span>
                          🛍️
                        </span>
                      )}

                    </div>


                    <div className="order-item-info">

                      <h3>
                        {title}
                      </h3>

                      <p>
                        Quantity: {quantity}
                      </p>

                    </div>


                    <div className="order-item-price">

                      <span>
                        ₹{price}
                      </span>

                      <strong>
                        ₹
                        {Number(price) *
                          Number(quantity)}
                      </strong>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>


        {/* =================================================
            SHIPPING / ADDRESS
        ================================================= */}

        {(order.shipping_address ||
          order.address) && (

          <div className="order-address-card">

            <h2>
              Delivery Address
            </h2>

            <p>
              {order.shipping_address ||
                order.address}
            </p>

          </div>
        )}


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="order-details-actions">

          <Link
            to="/products"
            className="continue-order-btn"
          >
            Continue Shopping
          </Link>


          {canCancel && (
            <button
              type="button"
              className="cancel-order-btn"
              onClick={handleCancelOrder}
              disabled={cancelling}
            >
              {cancelling
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;