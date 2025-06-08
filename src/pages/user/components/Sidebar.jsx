import { Heart, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar(){
    const location = useLocation();
    return(
        <>
            <nav className="flex flex-col w-full roundedrounded-lg shadow h-fit">
                <Link to="/profile" className={`p-8 border-none shadow-md flex gap-2 items-center rounded-t-lg ${location.pathname === '/profile' ? "bg-white text-[#0C4834]" : "bg-[#0C4834] text-white"}`}><User/> Account</Link>
                <Link to="/favorite" className={`p-8 border-none flex gap-2 items-center ${location.pathname === '/favorite' ? "bg-white text-[#0C4834]" : "bg-[#0C4834] text-white"}`}><Heart/> Favorite</Link>
                <Link to="/my-order" className={`p-8 border-none flex gap-2 items-center ${location.pathname === '/my-order' ? "bg-white text-[#0C4834]" : "bg-[#0C4834] text-white"}`}><ShoppingBag/> My Order</Link>
                <Link className="p-8 bg-red-400 text-white border-none rounded-b-lg">Log Out</Link>
            </nav>
        </>
    )
}