import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          📚 Book Store
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          {token ? (
            <>
              <Link className="nav-link" to="/cart">
                🛒 Cart
              </Link>
              <Link className="nav-link" to="/reservations">
  My Reservations
</Link>

              <Link className="nav-link" to="/wishlist">
                ❤️ Wishlist
              </Link>

              <Link className="nav-link" to="/orders">
                📦 Orders
              </Link>

              {(user?.isAdmin || user?.role === "admin") && (
                <Link className="nav-link" to="/admin">
                  ⚙️ Admin
                </Link>
              )}

              <span className="navbar-text text-white ms-3 me-3">
                Welcome, {user?.name}
              </span>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;