import { Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
            <footer className="bg-[#0C4834] w-full mt-8">
                <section className=" flex flex-col sm:flex-row justify-between p-6 px-12 border-b border-b-white">
                    <div className="flex items-center gap-4">
                        <img src="../public/assets/logo-sidoarjo.png" className="w-10 sm:w-12" alt="" />
                        <p className="font-serif text-xl">Sidoarjo</p>
                    </div>
                    <div className="flex sm:items-center sm:gap-12 flex-col sm:flex-row gap-2 items-start ">
                        <Link to="/" className="text-white text-lg">Home</Link>
                        <Link to="/" className="text-white text-lg">Article</Link>
                        <Link to="/" className="text-white text-lg">Marketplace</Link>
                        <Link to="/" className="text-white text-lg">Recipes</Link>
                    </div>
                </section>

                <section className="w-full p-6 flex justify-center items-center gap-4">
                        <Link to="/" className="text-white text-lg border rounded-full p-3"><Instagram/></Link>
                        <Link to="/" className="text-white text-lg border rounded-full p-3"><Youtube/></Link>
                        <Link to="/" className="text-white text-lg border rounded-full p-3"><Mail /></Link>
                </section>

                <section className="w-full bg-[#093526]">
                    <p className="text-center p-3">Copyright ©️ 2025 Pixel Pioneers. All right reserved.</p>
                </section>
            </footer>
        </>
    )
}