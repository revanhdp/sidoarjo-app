
import Navbar from "../../components/Navbar";
import { Camera } from "lucide-react";
import Sidebar from "./components/Sidebar";

export default function Profile(){
    return(
        <>
            <Navbar/>
            <main className=" bg-white min-h-screen pt-24">
                <div className=" container mx-auto justify-between p-5 flex gap-10">

                    <Sidebar/>

                    <div className="w-full max-w-sm mx-auto shadow-md rounded-2xl overflow-hidden">
                    <div className="relative w-full h-48 bg-slate-100">
                        <img
                        src=""
                        alt="Profile"
                        className="object-cover w-full h-full"
                        />
                        <button className="absolute bottom-2 right-2 bg-white px-3 py-1 text-black text-sm rounded-full flex items-center gap-1 shadow">
                            <Camera className="w-4 h-4" />
                            Change Photo
                        </button>
                    </div>
                    <div className="p-4 text-center">
                        <p className="text-xl font-semibold text-slate-700">My Profile</p>
                        {/* Tambahkan data profil lain di sini jika perlu */}
                    </div>
                    </div>
                    
                    <div className="w-full shadow-lg border p-10 rounded-lg ">
                        <form className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-slate-600">Full Name</label>
                                <input type="text" className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-slate-600">Email</label>
                                <input type="email" className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-slate-600">Address</label>
                                <input type="text" className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-slate-600">Interest</label>
                                <input type="text" className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-slate-600">Joined Since</label>
                                <input type="text" className="bg-white border rounded-lg text-slate-800 border-slate-400 py-1 pl-1" />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}