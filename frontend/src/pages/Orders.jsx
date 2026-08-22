import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderService";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";


function Orders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        /*
         * Django may return either:
         *
         * [
         *   {...},
         *   {...}
         * ]
         *
         * or
         *
         * {
         *   results: [...]
         * }
         */

        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data?.results)) {
          setOrders(data.results);
        } else {
          setOrders([]);
        }

      } catch (err) {
        console.error("Orders error:", err);

        setError(
          err?.response?.data?.detail ||
          "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading message="Loading your orders..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-container">

        {/* Header */}

        <div className="orders-header">

          <div>
            <span className="orders-label">
              MY ACCOUNT
            </span>

            <h1>
              My Orders
            </h1>

            <p>
              View and manage your recent orders.
            </p>
          </div>

          <Link
            to="/products"
            className="orders-shop-btn"
          >
            Continue Shopping
          </Link>

        </div>


        {/* No Orders */}

        {orders.length === 0 ? (
          <div className="orders-empty">

            <div className="orders-empty-icon">
              📦
            </div>

            <h2>
              No orders yet
            </h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <Link
              to="/products"
              className="orders-primary-btn"
            >
              Start Shopping
            </Link>

          </div>
        ) : (

          /* Orders */

          <div className="orders-list">

            {orders.map((order) => {

              const orderId =
                order.id || order.pk;

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

              return (
                <div
                  className="order-card"
                  key={orderId}
                >

                  <div className="order-card-top">

                    <div>

                      <span className="order-number-label">
                        ORDER
                      </span>

                      <h3>
                        #{orderId}
                      </h3>

                    </div>

                    <span
                      className={`order-status ${String(
                        status
                      ).toLowerCase()}`}
                    >
                      {status}
                    </span>

                  </div>


                  <div className="order-card-info">

                    <div>
                      <span>
                        Order Date
                      </span>

                      <strong>
                        {createdDate
                          ? new Date(
                              createdDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </strong>
                    </div>


                    <div>
                      <span>
                        Total
                      </span>

                      <strong className="order-total">
                        ₹{total}
                      </strong>
                    </div>

                  </div>


                  <div className="order-card-bottom">

                    <Link
                      to={`/orders/${orderId}`}
                      className="order-details-btn"
                    >
                      View Details →
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default Orders;