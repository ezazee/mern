import "./register.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", {
        username,
        email,
        password,
      })
      navigate("/login")
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form action="" onSubmit={handleRegister}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
