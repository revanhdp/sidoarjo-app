import { Trash } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Favorite(){
    const [favorite, setFavorite] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/recipe-favorite/me", {withCredentials: true})
        .then(res => {
            setFavorite(res.data);
        })
        .catch(err => {
            console.error("Gagal mengambil data favorite", err)
        })
    }, []);

    const handleRemoveFavorite = async (recipe_id) => {
        try {
            await axios.delete("http://localhost:3000/recipe-favorite", {
                data: { recipe_id },
                withCredentials: true
            });
            setFavorite(favorite.filter(item => item.recipe_id !== recipe_id));
        } catch (error) {
            console.error("Gagal menghapus favorite:", err)
        }
    }
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

                         {/* List Recipe Favorites */}
                        <div className="flex flex-col gap-5 mt-5">
                            {favorite.map((item) => (
                                <div key={item.id} className="flex border border-slate-300 cursor-pointer rounded-lg gap-3 relative" 
                                onClick={() => navigate(`/detail-recipe?id=${item.recipe_id}`)}>
                                    <div className="w-1/3">
                                        <img
                                            src={item.recipe?.img_url || "../public/assets/batik.jpg"}
                                            className="w-full rounded-lg object-cover h-48"
                                            alt={item.recipe?.title}
                                        />
                                    </div>
                                    <div className="w-2/3 self-center gap-2 flex flex-col">
                                        <p className="text-slate-700 font-semibold">Recipe</p>
                                        <p className="text-slate-700">{item.recipe?.title}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // ✅ agar klik tombol tidak trigger navigasi
                                            const confirmDelete = window.confirm("Yakin ingin menghapus dari favorit?");
                                            if (confirmDelete) {
                                            handleRemoveFavorite(item.recipe_id);
                                            }
                                        }}
                                        className="absolute right-1 bottom-1 p-2 bg-red-500 rounded-full hover:bg-red-700 border-none"
                                        >
                                        <Trash />
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>


            </main>
        </>
    )
}