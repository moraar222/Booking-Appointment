import { useAuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login')
  }

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">TumainiBooking</span>
        </Link>
       
          <div className="navItems">
            {user ? (
              <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", alignItems: "center"}}>
                <p>{user.username}</p>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <>
                <button className="navButton" onClick={goToRegister}>Register</button>
                <button className="navButton" onClick={goToLogin}>Login</button>
              </>
            )}
          </div>
        
      </div>
    </div>
  );
};

export default Navbar;
