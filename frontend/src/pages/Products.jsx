import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  getCategories,
  getProducts,
} from "../services/productService";


function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsData || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category?.id === Number(selectedCategory)
        );

  if (loading) {
    return (
      <div className="products-status">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-status error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="products-page">

      {/* Header */}
      <section className="products-header">
        <div className="products-header-content">
          <span className="section-label">
            OUR STORE
          </span>

          <h1>Explore Products</h1>

          <p>
            Discover quality products at great prices.
          </p>
        </div>
      </section>


      {/* Categories */}
      <section className="category-section">
        <div className="category-container">

          <button
            type="button"
            className={
              selectedCategory === "all"
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={
                selectedCategory === String(category.id)
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() =>
                setSelectedCategory(String(category.id))
              }
            >
              {category.name}
            </button>
          ))}

        </div>
      </section>


      {/* Products */}
      <section className="products-section">
        <div className="products-container">

          {filteredProducts.length === 0 ? (
            <div className="products-status">
              <p>No products found.</p>
            </div>
          ) : (
            <div className="products-grid">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default Products;