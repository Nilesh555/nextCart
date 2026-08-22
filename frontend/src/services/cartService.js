import api from "./api";

// Get current user's cart
export const getCart = async () => {
  const response = await api.get("/api/cart/");
  return response.data;
};


// Add product to cart
export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post("/api/cart/add/", {
    product_id: productId,
    quantity: quantity,
  });

  return response.data;
};


// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  const response = await api.patch(`/api/cart/${itemId}/`, {
    quantity: quantity,
  });

  return response.data;
};


// Remove item from cart
export const removeFromCart = async (itemId) => {
  const response = await api.delete(`/api/cart/${itemId}/`);

  return response.data;
};