import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan Password harus diisi");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // penting untuk cookie
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Berhasil");
        // Logika redirection berbasis peran
        if (data.user && data.user.role_id === 1) {
          navigate("/"); // Arahkan ke halaman utama untuk role_id 1
        } else if (data.user && data.user.role_id === 2) {
          navigate("/admin/add-product"); // Arahkan ke dashboard admin untuk role_id 2
        } else {
          // Fallback jika role_id tidak dikenal atau tidak ada
          alert("Login berhasil, namun peran tidak dikenali. Mengarahkan ke halaman utama.");
          navigate("/");
        }
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (error) {
      alert("Terjadi Kesalahan. Silakan coba lagi.");
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-white w-full h-screen max-h-screen flex">
        {/* Left Section */}
        <div className="flex relative flex-col justify-center items-center w-full gap-6 bg bg-[url(../public/assets/login-bg.png)] bg-contain bg-no-repeat bg-center z-0">
          <Link to="/" className="left-4 top-4 absolute">
            <img src="../public/assets/logo-sidoarjo.png" className="w-11" alt="Sidoarjo Logo" />
          </Link>

          <div className="flex flex-col justify-center items-center gap-7">
            <p className="text-6xl font-semibold text-[#0C4834]">Log in</p>
            <p className="text-xl text-slate-800">Login with registered Account</p>
          </div>
          <form className="w-2/3 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-slate-800">
                Email
              </label>
              <input
                type="email"
                className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Masukan Email"
              />
            </div>
            <div className="flex flex-col ">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-slate-800">
                  Password
                </label>
                <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your Password?</a> {/* Added href and simple styling */}
              </div>
              <input
                type="password"
                className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukan Password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0C4834] hover:bg-[#789A48] transition-all py-2 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>

          <p className="text-slate-700">
            Dont have Account? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center w-full bg-[url(../public/assets/hero-right-login.png)] bg-cover bg-center relative">
          <div className="absolute h-full w-full bg-black opacity-35"></div>
          <div className="flex flex-col z-30 mx-24 items-center gap-12">
            <p className="text-4xl text-center font-semibold text-white">Embrace the Wisdom of Tradition for a Modern Life</p> {/* Tambahkan text-white */}
            <p className="text-xl text-center px-7 text-white">Discover the power of natural ingredients, time-honored recipes, and sustainable living. From traditional herbal remedies to nutritious local dishes, unlock a healthier lifestyle inspired by Indonesia's rich culture.</p> {/* Tambahkan text-white */}
          </div>
        </div>
      </main>
    </>
  );
}