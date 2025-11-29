import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="relative h-screen flex justify-center items-center overflow-hidden bg-[var(--dark-bg)]">

      {/* 1️⃣ GOLD LIGHT RAYS */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.25), transparent 60%)",
        }}
        animate={{
          rotate: [0, 25, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2️⃣ GOLD SWEEPING BEAMS */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, rgba(212,175,55,0.12), transparent)",
        }}
        animate={{
          x: ["-30%", "30%", "-30%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3️⃣ ANIMATED GOLD WIREFRAME GRID */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "80px 80px"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 4️⃣ FLOATING 3D PARALLAX DOTS */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[var(--gold)] rounded-full blur-sm"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: 0.3,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* 5️⃣ ANIMATED GOLD AURA BEHIND FORM */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🔐 LOGIN FORM + LOGO REVEAL */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative p-8 rounded-xl shadow-2xl w-80 
                   bg-[var(--dark-card)] border border-[var(--dark-soft)]"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 🔥 Animated Logo Reveal */}
        <motion.div
          className="text-3xl font-extrabold text-[var(--gold)] mb-6 text-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          ✨ LUX
        </motion.div>

        <h2 className="text-xl font-bold mb-4 text-[var(--gold)]">Login</h2>

        <motion.input
          name="email"
          placeholder="Email"
          whileFocus={{ scale: 1.03 }}
          className="p-2 mb-3 w-full rounded 
                     bg-[var(--dark-soft)] 
                     text-[var(--text-light)]
                     border border-[var(--dark-soft)]
                     focus:border-[var(--gold)]
                     focus:outline-none"
          onChange={handleChange}
        />

        <motion.input
          name="password"
          type="password"
          placeholder="Password"
          whileFocus={{ scale: 1.03 }}
          className="p-2 mb-3 w-full rounded 
                     bg-[var(--dark-soft)] 
                     text-[var(--text-light)]
                     border border-[var(--dark-soft)]
                     focus:border-[var(--gold)]
                     focus:outline-none"
          onChange={handleChange}
        />

        <motion.button
          className="p-2 w-full rounded font-semibold 
                     bg-[var(--gold)] text-black 
                     hover:bg-[var(--gold-soft)] transition"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Login
        </motion.button>

        <p className="mt-4 text-sm text-[var(--text-muted)]">
          New here?{" "}
          <Link className="text-[var(--gold)] hover:underline" to="/register">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Login;
