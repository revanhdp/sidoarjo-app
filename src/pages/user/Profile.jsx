import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Camera } from "lucide-react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    interest: "",
    favorite: "",
    img_url: ""
  });

  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data user yang sedang login
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true
        });
        setUserData(res.data);
        setUserId(res.data.id);
      } catch (error) {
        console.error("Gagal mengambil data user", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) return alert("User belum dimuat");

    const formData = new FormData();
    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);
    formData.append("email", userData.email);
    formData.append("address", userData.address);
    formData.append("interest", userData.interest);
    if (file) {
      formData.append("img_url", file);
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/auth/users/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("Berhasil update", res.data);
      alert("Profil berhasil diperbarui!");
      setUserData(res.data.user); // jika respon berisi data terbaru
    } catch (err) {
      console.error("Gagal update user", err);
    }
  };

  // Loading saat data user belum dimuat
  if (isLoading || !userId) {
    return (
      <>
        <Navbar />
        <main className="bg-white min-h-screen pt-24 flex justify-center items-center">
          <p className="text-gray-500">Memuat data profil...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-24">
        <div className="container mx-auto justify-between p-5 flex gap-10">
          <Sidebar />

          {/* Profile Card */}
          <div className="w-full max-w-sm mx-auto shadow-md rounded-2xl overflow-hidden">
            <div className="relative w-full h-48 bg-slate-100">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : userData.img_url || "/assets/default-avatar.png"
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <label
                htmlFor="upload-photo"
                className="absolute bottom-2 right-2 bg-white px-3 py-1 text-black text-sm rounded-full flex items-center gap-1 shadow cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                Change Photo
              </label>
              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-xl font-semibold text-slate-700">My Profile</p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full shadow-lg border p-10 rounded-lg">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-slate-600">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={userData.first_name || ""}
                  onChange={handleChange}
                  className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-600">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name || ""}
                  onChange={handleChange}
                  className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address || ""}
                  onChange={handleChange}
                  className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-600">Interest</label>
                <input
                  type="text"
                  name="interest"
                  value={userData.interest || ""}
                  onChange={handleChange}
                  className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-[#0C4834] text-white rounded-full py-2 px-4 hover:bg-[#0a3b2a]"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
