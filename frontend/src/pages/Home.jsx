import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        // Show only first 4 products added in Django Admin
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-tag">
              WELCOME TO NEXTCART
            </span>

            <h1>
              Everything You Need,
              <span> All in One Place.</span>
            </h1>

            <p>
              Discover quality products at great prices.
              Shop the latest collection and enjoy a simple,
              secure and convenient shopping experience.
            </p>

            <div className="hero-buttons">

              <Link
                to="/products"
                className="primary-btn"
              >
                Shop Now
              </Link>

              <Link
                to="/signup"
                className="secondary-btn"
              >
                Create Account
              </Link>

            </div>
          </div>

          <div className="hero-image">

            <div className="hero-card">
              <div className="hero-card-icon">
                🛍️
              </div>

              <h3>Shop Smart</h3>

              <p>
                Quality products. Simple shopping.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="home-products">

        <div className="home-products-container">

          <div className="home-section-header">

            <div>
              <span className="home-section-label">
                OUR COLLECTION
              </span>

              <h2>
                Featured Products
              </h2>

              <p>
                Explore some of our latest products.
              </p>
            </div>

            <Link
              to="/products"
              className="view-all-link"
            >
              View All →
            </Link>

          </div>


          {/* Loading */}

          {loading && (
            <div className="home-products-loading">
              Loading products...
            </div>
          )}


          {/* Products */}

          {!loading && products.length > 0 && (
            <div className="home-products-grid">

              {products.map((product) => (

                <div
                  className="home-product-card"
                  key={product.id}
                >

                  {/* Product Image */}

                  <div className="home-product-image">
                    <img
                      src={
                        product.image?.startsWith("http")
                          ? product.image
                          : `https://nextcart-1-s578.onrender.com${product.image}`
                      }
                      alt={product.name}
                    />
                  </div>

                  {/* Product Details */}

                  <div className="home-product-info">

                    <span className="home-product-category">
                      {product.category?.name ||
                        "Product"}
                    </span>

                    <Link
                      to={`/products/${product.id}`}
                    >
                      <h3>
                        {product.name}
                      </h3>
                    </Link>

                    <p className="home-product-description">
                      {product.description
                        ? product.description.length > 70
                          ? product.description.substring(
                            0,
                            70
                          ) + "..."
                          : product.description
                        : "Quality product available now."}
                    </p>

                    <div className="home-product-bottom">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <Link
                        to={`/products/${product.id}`}
                        className="product-view-btn"
                      >
                        View Product
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}


          {/* No Products */}

          {!loading && products.length === 0 && (
            <div className="home-no-products">

              <div>
                🛍️
              </div>

              <h3>
                No products available
              </h3>



              <Link
                to="/products"
                className="primary-btn"
              >
                Explore Products
              </Link>

            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="features">

        <div className="features-container">

          <div className="feature-card">

            <div className="feature-icon">
              🚚
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your orders delivered quickly
              and safely.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <h3>
              Secure Shopping
            </h3>

            <p>
              Your account and shopping
              experience are protected.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ⭐
            </div>

            <h3>
              Quality Products
            </h3>

            <p>
              Find products selected for
              quality and value.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="home-cta">

        <div>

          <h2>
            Ready to start shopping?
          </h2>

          <p>
            Explore our products and find
            something you love.
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            Explore Products
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;
