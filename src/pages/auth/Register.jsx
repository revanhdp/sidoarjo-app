import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State untuk menampilkan loading saat submit
  const [isLoading, setIsLoading] = useState(false);

  // Handler untuk update state saat input berubah
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana (optional, karena sudah ada required di input)
    if (!formData.name || !formData.email || !formData.password) {
      alert("Semua field harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.msg || "Register berhasil!");
        // Redirect ke halaman login setelah berhasil register
        navigate("/login");
      } else {
        alert(data.msg || "Register gagal, coba lagi.");
      }
    } catch (error) {
      console.error("Error saat register:", error);
      alert("Terjadi kesalahan saat register, coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="relative bg-white min-h-screen w-full justify-center items-center max-h-screen flex bg-[url('../public/assets/login-bg.png')] bg-no-repeat bg-center overflow-hidden">
        <Link to="/">
          <img
            src="../public/assets/logo-sidoarjo.png"
            className="absolute left-4 top-4 w-11"
            alt="Logo"
          />
        </Link>
        <div className="flex flex-col w-1/3 text-slate-800 gap-5 ">
          <p className="text-center text-6xl">Sign Up</p>
          <p className="text-center">
            Already have Account? <Link to="/login">Log In Here </Link>
          </p>
          <form className="w-full flex flex-col gap-7" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-slate-800">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400"
                required
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-slate-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400"
                required
                placeholder="Masukkan email valid"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="password" className="text-slate-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400"
                required
                placeholder="Masukkan password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-[#0C4834] hover:bg-[#789A48] transition-all w-full text-white ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
