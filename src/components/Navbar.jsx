import { useState } from "react"
import { X, Menu, ChevronDown, ChevronUp} from "lucide-react"
import { useLocation, Link } from "react-router-dom"

export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false)
    const [isOpens, setIsOpens] = useState(false)
    const location = useLocation();

    return(
        <>
            <nav className="fixed top-0 left-0 bg-[#0c4832] w-full flex justify-between px-6 sm:px10 py-1 items-center z-50">
                {/* Left */}
                <div className="flex items-center gap-4 order-2 ">
                    <img src="../public/assets/logo-sidoarjo.png" alt="adasd" className="w-10 sm:w-12" />
                    <p className="text-xl font-serif ">Sidoarjo</p>
                </div>

                {/* Burger */}
                <div className="md:hidden order-1 ">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-200 bg-inherit">
                        {isOpen ? <X size={30} /> : <Menu size={30} />}
                    </button>
                </div>

                {/* Mid */}
                <div className="order-2">
                    <ul className={`flex-col md:gap-1 md:flex-row md:flex lg:gap-10 text-white text-lg items-center absolute md:static top-14 left-0 w-full md:w-auto bg-[#093526] md:bg-transparent md:space-x-8 transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden'} `}>
                        <Link to="/" className={`py-2  text-white hover:text-green-300 border-b-2 px-0 pb-1 ${location.pathname === "/" ? "border-white" : "border-transparent"}`}>
                            Home
                        </Link>
                        <Link to="/article" className={`py-2 px-0 text-white hover:text-green-300  border-b-2 pb-1 ${location.pathname === "/article" ? "border-white" : "border-transparent"}`}>
                            Article
                        </Link>
                        <Link to="/marketplace" className={`py-2 px-0 text-white hover:text-green-300 border-b-2 pb-1 ${location.pathname === "/marketplace" ? "border-white" : "border-transparent"}`}>
                            Marketplace
                        </Link>
                        <Link to="/recipe" className={`py-2 px-0 text-white hover:text-green-300 border-b-2 pb-1 ${location.pathname === "/recipe" ? "border-white" : "border-transparent"}`}>
                            Recipes
                        </Link>
                    </ul>
                </div>

                {/* Right */}
                <div className="relative order-3">
                    {/* Profile */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpens(!isOpens)}>
                        <img src="../public/assets/user-circle.svg" className="w-10 h-10" alt="user" />

                        <button className="hidden md:flex items-center text-white text-lg font-medium gap-1 bg-transparent px-1">
                            Hello, User
                            {isOpens ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    <div className={`${isOpens ? "block" : "hidden"}
                        absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 transition-all duration-300 
                    `}>
                        <ul className="flex flex-col text-sm text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100"><Link to="/profile" className="text-gray-700">Account</Link></li>
                            <li className="px-4 py-2 hover:bg-gray-100"><Link to="/favorite" className="text-gray-700">Favorite</Link></li>
                            <li className="px-4 py-2 hover:bg-gray-100"><Link to="/my-order" className="text-gray-700">My Order</Link></li>
                            <li className="px-4 py-2 hover:bg-red-100 font-semibold cursor-pointer">Log Out</li>
                        </ul>
                    </div>

                </div>

            </nav>
            
        </>
    )
}