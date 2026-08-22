import api from "./api";

/*
|--------------------------------------------------------------------------
| ORDER SERVICE
|--------------------------------------------------------------------------
*/


// Get logged-in user's order history
export const getOrders = async () => {
  const response = await api.get("/api/orders/");
  return response.data;
};


// Place a new order
export const placeOrder = async (orderData) => {
  const response = await api.post(
    "/api/orders/place/",
    orderData
  );

  return response.data;
};


// Get single order details
export const getOrderById = async (orderId) => {
  const response = await api.get(
    `/api/orders/${orderId}/`
  );

  return response.data;
};


// Cancel an order
export const cancelOrder = async (orderId) => {
  const response = await api.post(
    `/api/orders/${orderId}/cancel/`
  );

  return response.data;
};


// Update order status
// Usually this endpoint is for admin/staff
export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await api.patch(
    `/api/orders/${orderId}/status/`,
    {
      status: status,
    }
  );

  return response.data;
};