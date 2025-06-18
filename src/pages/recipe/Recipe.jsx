import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ArrowRightIcon } from "lucide-react";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Recipe(){

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [trendingRecipes, setTrendingRecipes] = useState([]); // State baru untuk resep trending
    const [loadingTrending, setLoadingTrending] = useState(true); // State loading untuk trending recipes
    const [errorTrending, setErrorTrending] = useState(null); // State error untuk trending recipes

    useEffect(() => {
        // Fetch categories
        axios.get("http://localhost:3000/recipe/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Failed to fetch categories:", err));

        // Fetch trending recipes
        const fetchTrending = async () => {
            setLoadingTrending(true);
            setErrorTrending(null);
            try {
                const res = await axios.get("http://localhost:3000/recipe/recipes/trending?limit=3");
                console.log("Trending recipes fetched:", res.data); // Untuk debugging
                setTrendingRecipes(res.data);
            } catch (err) {
                console.error("Failed to fetch trending recipes:", err);
                setErrorTrending("Gagal memuat resep populer.");
            } finally {
                setLoadingTrending(false);
            }
        };

        fetchTrending();
    }, []); // Efek ini hanya berjalan sekali saat komponen mount

    return(
        <>
            <Navbar/>
            <main className="bg-white">
                {/* Hero BG */}
                <div
                    className="w-full h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-white px-4 text-center"
                    style={{ backgroundImage: "url('/assets/bg_recipe.png')" }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                        Fuel your body & soul – <br className="hidden sm:block" />
                        find recipes that taste amazing!
                    </h1>

                    <div className="bg-white w-full max-w-xl rounded-full px-5 py-2 flex items-center shadow-md mt-2">
                        <svg
                            className="w-5 h-5 text-gray-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2a7 7 0 010 14z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by dish, ingredient, ……"
                            className="flex-grow outline-none bg-white text-gray-700 placeholder:text-gray-400"
                        />
                    </div>
                </div>
                {/* Section 2 - Popular Category */}
                <section className="container mx-auto w-full mt-20">
                    <p className="text-slate-800 text-2xl font-bold">Popular Category</p>
                    <div className="flex justify-center gap-40 mt-8">
                        {categories.map((cat) => (
                            <div
                                key={cat.id} // Gunakan cat.id sebagai key
                                className="flex flex-col gap-3 items-center cursor-pointer"
                                onClick={() => navigate(`/recipe-categories?category_id=${cat.id}`)}
                            >
                                <img src={cat.img_url} className="w-72 object-cover rounded-full border shadow-lg" alt={cat.name} />
                                <p className="text-slate-800">{cat.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3 - Explore Recipes */}
                <section className="container mx-auto w-full mt-20">
                    <p className="text-slate-800 text-2xl font-bold">Explore Recipes</p>
                    <div className="flex gap-10 mt-8 shadow-sm">
                        <img src="../assets/bg-home.jpg" className="w-1/3 h-64 object-cover" alt="Explore background" /> {/* Tambah object-cover, alt */}
                        <div className="w-2/3 flex flex-col gap-6">
                            <p className="text-5xl text-slate-700">Delicious, Cultural, and balanced for Modern Living</p>
                            <p className="text-lg text-slate-700">Experience the warmth of East Javanese culture through flavorful, nutritious dishes from Sidoarjo. These traditional recipes are easy to prepare and great for maintaining a balanced lifestyle.</p>
                            <Link to="/recipe-categories?category_id=1" className={`py-2 px-0 text-slate-700 flex gap-3`}>
                                Recipes <ArrowRightIcon/>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section 4 - Trending Recipes*/}
                <section className="container mx-auto w-full mt-20 pb-20">
                    <p className="text-slate-800 text-2xl font-bold">Trending Recipes</p>
                    <div className="flex gap-3 flex-row flex-wrap md:flex-nowrap mt-6">
                        {loadingTrending ? (
                            <p className="text-gray-500 w-full text-center">Loading trending recipes...</p>
                        ) : errorTrending ? (
                            <p className="text-red-500 w-full text-center">{errorTrending}</p>
                        ) : trendingRecipes.length > 0 ? (
                            trendingRecipes.map((recipe) => (
                                <Link
                                    key={recipe.id}
                                    to={`/detail-recipe/${recipe.id}`} 
                                    className="flex flex-col border rounded-sm overflow-hidden basis-[calc(50%-0.5rem)] md:basis-[calc(33%-0.75rem)] cursor-pointer hover:shadow-md transition-shadow duration-200"
                                >
                                    <img src={recipe.img_url} className="w-full h-60 object-cover" alt={recipe.title} />
                                    <div className="p-5 flex flex-col gap-3">
                                        <p className="text-slate-600 font-semibold">{recipe.title}</p>
                                        <p className="text-slate-600 line-clamp-3">{recipe.desc}</p>
                                        {/* Tampilkan jumlah favorit jika ada */}
                                        {recipe.favoriteCount !== undefined && (
                                            <p className="text-sm text-gray-500">{recipe.favoriteCount} Favorites</p>
                                        )}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500 w-full text-center">Tidak ada resep populer yang ditemukan.</p>
                        )}
                    </div>
                </section>
            <Footer/>
            </main>
        </>
    );
}