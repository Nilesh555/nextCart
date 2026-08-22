import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // =====================================================
  // CART STATE
  // =====================================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("nextcart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      return [];
    }
  });

  // =====================================================
  // SAVE CART TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "nextcart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // =====================================================
  // ADD PRODUCT TO CART
  // =====================================================

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    const productStock = Number(
      product.stock || 0
    );

    const productQuantity = Number(
      quantity || 1
    );

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      // =================================================
      // PRODUCT ALREADY EXISTS
      // =================================================

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,

                quantity: Math.min(
                  Number(item.quantity) +
                    productQuantity,
                  productStock
                ),
              }
            : item
        );
      }

      // =================================================
      // ADD NEW PRODUCT
      // =================================================

      return [
        ...prevItems,

        {
          id: product.id,

          title: product.title,

          price: Number(
            product.price || 0
          ),

          image: product.image,

          category: product.category,

          stock: productStock,

          quantity: Math.min(
            productQuantity,
            productStock
          ),
        },
      ];
    });
  };

  // =====================================================
  // REMOVE PRODUCT
  // =====================================================

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,

          quantity: Math.min(
            Number(item.quantity) + 1,
            Number(item.stock)
          ),
        };
      })
    );
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,

          quantity: Math.max(
            Number(item.quantity) - 1,
            1
          ),
        };
      })
    );
  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart = () => {
    setCartItems([]);
  };

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  // =====================================================
  // SHIPPING
  // =====================================================

  const shipping =
    subtotal > 0 ? 50 : 0;

  // =====================================================
  // FINAL TOTAL
  // =====================================================

  const total =
    subtotal + shipping;

  // =====================================================
  // CONTEXT
  // =====================================================

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        totalItems,

        subtotal,

        shipping,

        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// =====================================================
// USE CART HOOK
// =====================================================

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;