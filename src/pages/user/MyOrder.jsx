import Navbar from "../../components/Navbar";
import Sidebar from "./components/Sidebar";

export default function MyOrder(){
    return(
        <>
            <Navbar/>
            <main className="flex pt-24 bg-white">
                <div className="min-h-screen container mx-auto flex gap-10">
                    <div className="w-1/3">
                        <Sidebar/>
                    </div>
                    <div className="w-2/3">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-3xl text-[#0C4834]">Favorite</p>
                            <div className="flex gap-6">
                                <button className="bg-white text-slate-700 border border-[#0C4834] rounded-full">All</button>
                                <button className="bg-white text-slate-700 border border-[#0C4834] rounded-full">Article</button>
                                <button className="bg-white text-slate-700 border border-[#0C4834] rounded-full">Recipe</button>
                            </div>
                        </div>

                        <div className="flex mt-5 border border-slate-300 rounded-lg gap-3 relative">
                            <div className="w-1/3">
                                <img src="../public/assets/batik.jpg" className="w-full rounded-lg" alt="" />
                            </div>
                            <div className="w-2/3 self-center gap-3 flex flex-col">
                                <p className="text-slate-700 font-semibold">Article</p>
                                <p className="text-slate-700">Perang Sungai: Konflik Wilayah Air</p>
                            </div>
                            <button className="absolute right-1 bottom-1 p-2 bg-red-500 rounded-full hover:bg-red-700 border-none"><Trash/></button>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}