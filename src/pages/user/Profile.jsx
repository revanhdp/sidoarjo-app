import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Profile(){
    return(
        <>
            <Navbar/>
            <main className=" bg-white min-h-screen pt-24">
                <div className=" container mx-auto justify-between p-5 flex gap-6">
                    <nav className="flex flex-col bg-green-500 w-full rounded-sm">
                        <Link className="p-8 bg-white border borded-black">loo</Link>
                        <Link className="p-8 bg-green text-white border borded-black">looyal</Link>
                        <Link className="p-8 bg-green-400 text-white border borded-black">looyell</Link>
                        <Link className="p-8 bg-green-400 text-white border borded-black">looyell</Link>

                    </nav>
                    <div className="w-full bg-red-500">
                        <p className="text-slate-700">asadasd</p>
                    </div>
                    <div className="w-full bg-blue-500">
                        <p className="text-slate-700">adasdasd</p>
                    </div>
                </div>
            </main>
        </>
    )
}