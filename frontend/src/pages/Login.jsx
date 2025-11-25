import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          name="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
        />

        <button className="bg-green-500 text-white p-2 w-full rounded">
          Login
        </button>

        <p className="mt-2 text-sm">
          New here? <Link className="text-blue-600" to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
