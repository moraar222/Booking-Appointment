import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const { loading, error, dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext); // Assuming user data is stored in AuthContext

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); // Assuming res.data contains user details including name
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <div className="passwordInputContainer">
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility based on state
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button
            onClick={togglePasswordVisibility}
            className="togglePasswordButton"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;