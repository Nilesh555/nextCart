import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getProductById } from "../services/productService";

const CartContext = createContext();

export function CartProvider({ children }) {
  // =====================================================
  // CART STATE
  // =====================================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("nextcart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch (error) {
      console.error(
        "Failed to load cart from localStorage:",
        error
      );

      return [];
    }
  });

  // =====================================================
  // SAVE CART TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "nextcart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems]);

  // =====================================================
  // ADD TO CART
  // ProductDetails sends:
  //
  // addToCart(product.id, quantity)
  // =====================================================

  const addToCart = async (
    productId,
    quantity = 1
  ) => {
    try {
      // Fetch complete product information
      const product = await getProductById(productId);

      if (!product) {
        throw new Error("Product not found.");
      }

      const stock = Number(product.stock || 0);

      // Check stock
      if (stock <= 0) {
        throw new Error(
          "Product is out of stock."
        );
      }

      const requestedQuantity = Math.max(
        1,
        Number(quantity) || 1
      );

      setCartItems((previousItems) => {
        // Check if product already exists
        const existingItem =
          previousItems.find(
            (item) =>
              Number(item.id) ===
              Number(product.id)
          );

        // =================================================
        // PRODUCT ALREADY IN CART
        // =================================================

        if (existingItem) {
          return previousItems.map((item) => {
            if (
              Number(item.id) !==
              Number(product.id)
            ) {
              return item;
            }

            const currentQuantity = Number(
              item.quantity || 0
            );

            const newQuantity =
              currentQuantity +
              requestedQuantity;

            return {
              ...item,

              id: product.id,

              title:
                product.title ||
                product.name ||
                item.title ||
                "Product",

              price: Number(
                product.price || 0
              ),

              image:
                product.image ||
                item.image ||
                "",

              category:
                product.category ||
                item.category ||
                "",

              stock: stock,

              quantity: Math.min(
                newQuantity,
                stock
              ),
            };
          });
        }

        // =================================================
        // NEW PRODUCT
        // =================================================

        return [
          ...previousItems,
          {
            id: product.id,

            title:
              product.title ||
              product.name ||
              "Product",

            price: Number(
              product.price || 0
            ),

            image: product.image || "",

            category:
              product.category || "",

            stock: stock,

            quantity: Math.min(
              requestedQuantity,
              stock
            ),
          },
        ];
      });

      return product;

    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      // Important:
      // ProductDetails catches this error.
      throw error;
    }
  };

  // =====================================================
  // REMOVE FROM CART
  // =====================================================

  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          Number(item.id) !==
          Number(productId)
      )
    );
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (productId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (
          Number(item.id) !==
          Number(productId)
        ) {
          return item;
        }

        const currentQuantity = Number(
          item.quantity || 1
        );

        const stock = Number(
          item.stock || 0
        );

        // Don't go above stock
        if (
          stock > 0 &&
          currentQuantity >= stock
        ) {
          return item;
        }

        return {
          ...item,

          quantity:
            currentQuantity + 1,
        };
      })
    );
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (productId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (
          Number(item.id) !==
          Number(productId)
        ) {
          return item;
        }

        const currentQuantity = Number(
          item.quantity || 1
        );

        return {
          ...item,

          // Minimum quantity = 1
          quantity: Math.max(
            currentQuantity - 1,
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

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        const price = Number(
          item.price || 0
        );

        const quantity = Number(
          item.quantity || 0
        );

        return total + price * quantity;
      },
      0
    );
  }, [cartItems]);

  // =====================================================
  // SHIPPING
  // =====================================================

  const shipping = useMemo(() => {
    return subtotal > 0 ? 50 : 0;
  }, [subtotal]);

  // =====================================================
  // FINAL TOTAL
  // =====================================================

  const total = useMemo(() => {
    return subtotal + shipping;
  }, [subtotal, shipping]);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const contextValue = useMemo(
    () => ({
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
    }),
    [
      cartItems,
      totalItems,
      subtotal,
      shipping,
      total,
    ]
  );

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <CartContext.Provider
      value={contextValue}
    >
      {children}
    </CartContext.Provider>
  );
}

// =====================================================
// USE CART HOOK
// =====================================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export default CartContext;