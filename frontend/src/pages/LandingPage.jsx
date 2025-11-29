import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate=useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--dark-bg)] text-[var(--text-light)]">

      {/* 1️⃣ GOLD LIGHT RAYS */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.25), transparent 60%)",
        }}
        animate={{ rotate: [0, 25, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 2️⃣ SWEEPING GOLD BEAMS */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, rgba(212,175,55,0.15), transparent)",
        }}
        animate={{ x: ["-40%", "40%", "-40%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3️⃣ GOLD WIREFRAME GRID */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* 4️⃣ FLOATING PARTICLES */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
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

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 pt-24">

        {/* ✨ Logo Reveal */}
        <motion.h1
          className="text-6xl font-extrabold text-[var(--gold)] drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          ✨ LUXTRIP AI
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Your personal AI travel planner.  
          Discover attractions, optimize routes, control your budget,  
          and generate perfect itineraries in seconds.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg font-semibold text-black
                       bg-[var(--gold)] hover:bg-[var(--gold-soft)] transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border font-semibold
                       border-[var(--gold)] text-[var(--gold)]
                       hover:bg-[var(--dark-soft)] transition"
          >
            Login
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              title: "AI-Powered Itineraries",
              desc: "Instantly build smart travel plans tailored to your time and budget.",
            },
            {
              title: "Live Attraction Data",
              desc: "Curated attractions powered by real-time data for perfect recommendations.",
            },
            {
              title: "Luxury UI Experience",
              desc: "Gold-infused design with premium animations for pure elegance.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl bg-[var(--dark-card)]
                         border border-[var(--dark-soft)] shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <h3 className="text-xl font-bold text-[var(--gold)] mb-2">
                {card.title}
              </h3>
              <p className="text-[var(--text-muted)]">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center mt-24 pb-10 text-[var(--text-muted)]">
        © {new Date().getFullYear()} LuxTrip AI — Designed with Elegance ✨
      </div>
    </div>
  );
}

export default LandingPage;
