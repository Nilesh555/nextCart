import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `https://nextcart-1-s578.onrender.com${product.image}`
    : null;

  return (
    <div className="product-card">

      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="product-image-container"
      >
        {imageUrl ? (
          
          <img
            src={imageUrl}
            alt={product.title}
            className="product-image" 
            onError={(e)=>{console.log('IMAGE FAILED: ', imageUrl);
              console.log("Product: ", product);
            }}
          />
        
        ) : (
          <div className="product-image-placeholder">
            No Image
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="product-info">

        {/* Category */}
        <span className="product-category">
          {product.category?.name || "Product"}
        </span>

        {/* Title */}
        <Link
          to={`/products/${product.id}`}
          className="product-title-link"
        >
          <h3 className="product-title">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="product-description">
          {product.description
            ? product.description.length > 80
              ? `${product.description.slice(0, 80)}...`
              : product.description
            : "Quality product available now."}
        </p>

        {/* Price + Button */}
        <div className="product-bottom">

          <span className="product-price">
            ₹{product.price}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="view-product-btn"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;