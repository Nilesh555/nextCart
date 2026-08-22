import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Password validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/api/signup/",
        formData
      );

      console.log("Signup response:", response.data);

      setSuccess("Account created successfully!");

      // Clear form
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Signup error:", err);

      if (err.response?.data) {
        const data = err.response.data;

        if (typeof data === "object") {
          const messages = Object.values(data)
            .flat()
            .join(" ");

          setError(messages);
        } else {
          setError(data);
        }
      } else {
        setError(
          "Unable to create account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* Header */}

        <div className="signup-header">

          <span className="signup-label">
            NextCart
          </span>

          <h1>
            Create Account
          </h1>

          <p>
            Create your account and start shopping.
          </p>

        </div>


        {/* Error */}

        {error && (
          <div className="signup-message error">
            {error}
          </div>
        )}


        {/* Success */}

        {success && (
          <div className="signup-message success">
            {success}
          </div>
        )}


        {/* Form */}

        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >

          {/* First + Last Name */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="first_name">
                First Name
              </label>

              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="Enter first name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="last_name">
                Last Name
              </label>

              <input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Username */}

          <div className="form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* Confirm Password */}

          <div className="form-group">

            <label htmlFor="confirm_password">
              Confirm Password
            </label>

            <input
              id="confirm_password"
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* Login Link */}

        <div className="signup-footer">

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Signup;