import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            NextCart
          </Link>

          <p>
            Your simple and trusted online shopping destination.
          </p>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>

          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
           <Link to="/home">Home</Link>
        </div>

        <div className="footer-column">
          <h3>Account</h3>

          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/profile">Profile</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} NextCart All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;