import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registration successful!");
      navigate("/");
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
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
        />

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

        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
