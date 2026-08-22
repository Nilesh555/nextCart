import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";


function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState("");

  // =====================================================
  // GET PRODUCT DETAILS
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        console.log("Product details:", data);

        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);

        setError(
          err.response?.data?.detail ||
          "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = () => {
    if (!product) return;

    const stock = Number(product.stock || 0);

    if (stock > 0 && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = async () => {
    if (!product) return;

    const stock = Number(product.stock || 0);

    if (stock <= 0) {
      setError("Product is out of stock.");
      return;
    }

    try {
      setAdding(true);
      setError("");
      setSuccess("");

      // Your CartContext expects:
      // addToCart(productId, quantity)
      await addToCart(product.id, quantity);

      setSuccess("Product added to cart successfully!");

      console.log("Added to cart:", product.title);

    } catch (err) {
      console.error("Add to cart error:", err);

      if (err.response?.status === 401) {
        setError("Please login to add products to cart.");
      } else {
        setError(
          err.response?.data?.detail ||
          "Failed to add product to cart."
        );
      }
    } finally {
      setAdding(false);
    }
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = async () => {
    if (!product) return;

    try {
      setAdding(true);
      setError("");

      await addToCart(product.id, quantity);

      navigate("/cart");
    } catch (err) {
      console.error("Buy now error:", err);

      if (err.response?.status === 401) {
        setError("Please login first.");
      } else {
        setError(
          err.response?.data?.detail ||
          "Unable to continue."
        );
      }
    } finally {
      setAdding(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="product-details-status">
        <p>Loading product...</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !product) {
    return (
      <div className="product-details-status">
        <h2>Something went wrong</h2>
        <p>{error}</p>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <div className="product-details-status">
        <h2>Product not found</h2>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  const stock = Number(product.stock || 0);
  const price = Number(product.price || 0);

  return (
    <div className="product-details-page">

      {/* ================================================= */}
      {/* BACK BUTTON */}
      {/* ================================================= */}

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* ================================================= */}
      {/* PRODUCT */}
      {/* ================================================= */}

      <div className="product-details">

        {/* PRODUCT IMAGE */}

        <div className="product-details-image">
          {product.image ? (
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `http://127.0.0.1:8000${product.image}`
              }
              alt={product.title || product.name}
            />
          ) : (
            <div className="no-image">
              No Image
            </div>
          )}
        </div>

        {/* PRODUCT INFORMATION */}

        <div className="product-details-info">

          <h1>{product.title}</h1>

          {/* CATEGORY */}

          {product.category && (
            <p className="product-category">
              Category:{" "}
              {typeof product.category === "object"
                ? product.category.name
                : product.category}
            </p>
          )}

          {/* PRICE */}

          <h2 className="product-price">
            ₹{price.toFixed(2)}
          </h2>

          {/* DESCRIPTION */}

          <div className="product-description">
            <h3>Description</h3>

            <p>
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* STOCK */}

          <div className="product-stock">

            {stock > 0 ? (
              <p>
                <strong>In Stock:</strong> {stock} items
              </p>
            ) : (
              <p className="out-of-stock">
                Out of Stock
              </p>
            )}

          </div>

          {/* QUANTITY */}

          {stock > 0 && (
            <div className="quantity-section">

              <span>Quantity:</span>

              <div className="quantity-controls">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >= stock
                  }
                >
                  +
                </button>

              </div>

            </div>
          )}

          {/* ERROR */}

          {error && (
            <p className="product-error">
              {error}
            </p>
          )}

          {/* SUCCESS */}

          {success && (
            <p className="product-success">
              {success}
            </p>
          )}

          {/* BUTTONS */}

          <div className="product-actions">

            <button
              className="add-cart-button"
              onClick={handleAddToCart}
              disabled={
                adding || stock <= 0
              }
            >
              {adding
                ? "Adding..."
                : "Add to Cart"}
            </button>

            <button
              className="buy-now-button"
              onClick={handleBuyNow}
              disabled={
                adding || stock <= 0
              }
            >
              Buy Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;