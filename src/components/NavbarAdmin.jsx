import { Edit, Plus, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavbarAdmin(){
    return(
        <header className="bg-white">
        <nav className="container mx-auto">
            <ul className="sm:flex justify-evenly gap-4 p-3 hidden flex-wrap">
                <li>
                    <NavLink className='text-black flex gap-1 items-center rounded-full hover:bg-[#D9D9D9] hover:text-black py-1 px-3'>
                        <Plus/> Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink className='text-black flex gap-1 items-center rounded-full hover:bg-[#D9D9D9] hover:text-black py-1 px-3'>
                        <Edit/> Product Manager
                    </NavLink>
                </li>
                <li>
                    <NavLink className='text-black flex gap-1 items-center rounded-full hover:bg-[#D9D9D9] hover:text-black py-1 px-3'>
                        <Plus/> Add Article
                    </NavLink>
                </li>
                <li>
                    <NavLink className='text-black flex gap-1 items-center rounded-full hover:bg-[#D9D9D9] hover:text-black py-1 px-3'>
                        <Edit/> Article Manager
                    </NavLink>
                </li>
                <li>
                    <NavLink className='text-black flex gap-1 items-center rounded-full hover:bg-[#D9D9D9] hover:text-black py-1 px-3'>
                        <Plus/> Add Recipe
                    </NavLink>
                </li>
                <li>
                    <NavLink className='text-black flex gap-1 items-center rounded-full hover:bg-[#D9D9D9] hover:text-black py-1 px-3'>
                        <Edit/> Recipe Manager
                    </NavLink>
                </li>
                <li>
                    <NavLink className='text-black flex gap-1 items-center rounded-full hover:bg-[#D9D9D9] hover:text-black py-1 px-3'>
                        <User/> Admin Profile
                    </NavLink>
                </li>
            </ul>
        
        </nav>
        </header>
    )
}