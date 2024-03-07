import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // Clear previous error messages when the user starts typing
    setErrors({});
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!credentials.username.trim()) {
      newErrors.username = "Please enter a username.";
    }
    if (!credentials.password.trim()) {
      newErrors.password = "Please enter a password.";
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(credentials.password)) {
      newErrors.password = "Password must contain at least one lowercase letter, one uppercase letter, and one digit.";
    }
    if (!credentials.email.trim()) {
      newErrors.email = "Please enter an email.";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        credentials.email.trim()
      )
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      console.log(res.data);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
      console.log(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        {errors.username && <span>{errors.username}</span>}
        <input
          type="password"
          placeholder="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />
        {errors.password && <span>{errors.password}</span>}
        <input
          type="text"
          placeholder="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          className="lInput"
        />
        {errors.email && <span>{errors.email}</span>}
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};