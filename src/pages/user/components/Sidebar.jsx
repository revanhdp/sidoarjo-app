import { Heart, LogOut, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar(){
    const location = useLocation();
      const [user, setUser] = useState(null); // Atur sesuai user state global kamu jika ada

    const handleLogout = async () => {
        try {
        const response = await fetch("http://localhost:3000/auth/logout", {
            method: "DELETE",
            credentials: "include",
        });

        if (response.ok) {
            setUser(null);
            alert("Logout Berhasil");
            window.location.href = "/";
        } else {
            alert("Logout gagal");
        }
        } catch (error) {
        console.error("Logout error:", error);
        alert("Terjadi kesalahan saat logout");
        }
    };
    return(
        <>
            <nav className="flex flex-col w-full roundedrounded-lg shadow h-fit">
                <Link to="/profile" className={`p-8 border-none shadow-md flex gap-2 items-center rounded-t-lg ${location.pathname === '/profile' ? "bg-white text-[#0C4834]" : "bg-[#0C4834] text-white"}`}><User/> Account</Link>
                <Link to="/favorite" className={`p-8 border-none flex gap-2 items-center ${location.pathname === '/favorite' ? "bg-white text-[#0C4834]" : "bg-[#0C4834] text-white"}`}><Heart/> Favorite</Link>
                <Link to="/my-order" className={`p-8 border-none flex gap-2 items-center ${location.pathname === '/my-order' ? "bg-white text-[#0C4834]" : "bg-[#0C4834] text-white"}`}><ShoppingBag/> My Order</Link>
                <Link onClick={handleLogout} className="p-8 bg-red-700 text-white border-none rounded-b-lg flex gap-2"><span><LogOut/></span>Log Out</Link>
            </nav>
        </>
    )
}