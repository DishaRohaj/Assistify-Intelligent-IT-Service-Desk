import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error while user is typing
    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    /*
      Temporary mock login.

      Later this will be replaced with:
      POST /api/auth/login

      and the response from Spring Boot/JWT
      will determine the user's role.
    */

    setTimeout(() => {
      console.log("Login submitted:", {
        ...formData,
        rememberMe,
      });

      setIsLoading(false);

      alert(
        "Login functionality will be connected to the Spring Boot backend."
      );
    }, 1200);
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <section className="login-brand-section">
        <div className="brand-content">
          <div className="brand-logo">
            <div className="logo-icon">
              <ShieldCheck size={30} strokeWidth={2.2} />
            </div>

            <div>
              <h1>ASSISTIFY</h1>
              <p>Intelligent IT Service Desk</p>
            </div>
          </div>

          <div className="brand-message">
            <span className="brand-tag">IT SUPPORT • SIMPLIFIED</span>

            <h2>
              Get the help you need,
              <br />
              <span>when you need it.</span>
            </h2>

            <p>
              Report IT issues, get intelligent troubleshooting assistance,
              track service requests, and stay connected with your support
              team — all in one place.
            </p>
          </div>

          <div className="brand-features">
            <div className="feature-item">
              <div className="feature-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Secure & Reliable</strong>
                <span>Protected access to your IT services</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <LockKeyhole size={19} />
              </div>

              <div>
                <strong>Smart Assistance</strong>
                <span>AI-assisted troubleshooting and knowledge</span>
              </div>
            </div>
          </div>
        </div>

        <div className="brand-footer">
          <span>© 2026 Assistify</span>
          <span>Internal IT Service Desk</span>
        </div>
      </section>

      {/* Right Section */}
      <section className="login-form-section">
        <div className="login-card">
          <div className="mobile-logo">
            <div className="logo-icon">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h1>ASSISTIFY</h1>
              <p>Intelligent IT Service Desk</p>
            </div>
          </div>

          <div className="login-heading">
            <span className="welcome-text">WELCOME BACK</span>

            <h2>Sign in to your account</h2>

            <p>
              Enter your credentials to access the Assistify Service Desk.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <div
                className={`input-wrapper ${
                  errors.email ? "input-error" : ""
                }`}
              >
                <Mail className="input-icon" size={19} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    alert("Password reset will be implemented later.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div
                className={`input-wrapper ${
                  errors.password ? "input-error" : ""
                }`}
              >
                <LockKeyhole className="input-icon" size={19} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {/* Remember Me */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span className="custom-checkbox"></span>

                <span>Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="security-note">
            <LockKeyhole size={15} />

            <span>
              Your account is protected by secure authentication.
            </span>
          </div>

          <div className="login-help">
            <p>
              Need help accessing your account?
              <button
                type="button"
                onClick={() =>
                  alert("Please contact your IT Service Desk.")
                }
              >
                Contact IT Support
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;