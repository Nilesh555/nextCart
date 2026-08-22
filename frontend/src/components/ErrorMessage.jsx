import { Link } from "react-router-dom";


function ErrorMessage({
  message = "Something went wrong.",
  showBackButton = false,
}) {
  return (
    <div className="error-message-container">

      <div className="error-message-icon">
        !
      </div>

      <h3>
        Something went wrong
      </h3>

      <p>
        {message}
      </p>

      {showBackButton && (
        <Link
          to="/products"
          className="error-back-btn"
        >
          Back to Products
        </Link>
      )}

    </div>
  );
}

export default ErrorMessage;