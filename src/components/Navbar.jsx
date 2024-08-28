import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/notes/noteContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const context = useContext(NoteContext);
  const { userData } = context;
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    toast.success("Logout Successful!");
    navigate("/login");
  };

  useEffect(() => {
    // Add event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  let url = userData?.profileImage;
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                aria-current="page"
              >
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("auth-token") === null ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <div className="d-flex align-items-center">
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                  onClick={toggleDropdown}
                >
                  {url === null ? (
                    <i
                      className="bi bi-person-circle"
                      style={{ color: "#fff", fontSize: "1.5rem" }}
                    ></i>
                  ) : (
                    <img
                      src={url}
                      width="20"
                      style={{ borderRadius: "50%" }}
                      alt="Profile"
                    />
                  )}
                </button>
                <ul
                  className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
