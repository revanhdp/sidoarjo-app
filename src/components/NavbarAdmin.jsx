import { Edit, Plus, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavbarAdmin(){
    const location = useLocation();
    return(
        <header className="bg-white">
        <nav className="container mx-auto">
            <ul className="sm:flex justify-evenly gap-4 p-3 hidden flex-wrap">
                <li>
                    <NavLink to="/admin/payment-manager" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/recipe-manager' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <Edit/> Order Manager
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/add-product" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/add-product' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <Plus/> Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/product-manager" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/product-manager' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <Edit/> Product Manager
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/add-article" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/add-article' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <Plus/> Add Article
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/article-manager" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/article-manager' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <Edit/> Article Manager
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/add-recipe" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/add-recipe' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <Plus/> Add Recipe
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/recipe-manager" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/recipe-manager' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <Edit/> Recipe Manager
                    </NavLink>
                </li>

                {/* <li>
                    <NavLink to="/admin/profile" className={`text-black flex gap-1 items-center rounded-full ${location.pathname === '/admin/profile' ? 'bg-[#D9D9D9]' : ""} hover:bg-[#D9D9D9] hover:text-black py-1 px-3`}>
                        <User/> Admin Profile
                    </NavLink>
                </li> */}
            </ul>
        
        </nav>
        </header>
    )
}