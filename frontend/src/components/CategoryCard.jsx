import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="category-card"
    >

      <div className="category-card-icon">
        {category.icon || "🛍️"}
      </div>

      <div className="category-card-content">

        <h3>
          {category.name}
        </h3>

        <p>
          Explore {category.name}
        </p>

      </div>

      <span className="category-arrow">
        →
      </span>

    </Link>
  );
}

export default CategoryCard;