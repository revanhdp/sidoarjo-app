import { Bookmark, CakeSliceIcon, Calendar, ChefHat, MessageSquareMore, Printer, Star } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// Include cookies
axios.defaults.withCredentials = true;

export default function RecipeDetail(){
const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const recipeId = searchParams.get("id");
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [newRating, setNewRating] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  // Ambil data resep
  useEffect(() => {
    if (recipeId) {
      axios
        .get(`http://localhost:3000/recipe/${recipeId}`)
        .then((res) => setRecipe(res.data))
        .catch((err) => console.error("Failed to fetch recipe:", err));
    }
  }, [recipeId]);

  // Ambil komentar resep
  useEffect(() => {
    if (recipeId) {
      axios
        .get(`http://localhost:3000/recipe-comment/recipe/${recipeId}`)
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Failed to fetch comments:", err));
    }
  }, [recipeId]);

  // Ambil related recipes
  useEffect(() => {
    if (recipe && recipe.category_id) {
      axios
        .get(`http://localhost:3000/recipe/category/${recipe.category_id}`)
        .then((res) => {
          const filtered = res.data.filter((item) => item.id !== recipe.id);
          setRelatedRecipes(filtered.slice(0, 3));
        })
        .catch((err) => console.error("Failed to fetch related recipes:", err));
    }
  }, [recipe]);

  // Fungsi posting komentar
  const handlePostComment = async () => {
    if (!newComment.trim()) {
      setErrorMessage("Komentar tidak boleh kosong.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/recipe-comment", {
        recipe_id: recipeId,
        comment: newComment,
        rating: newRating
      });

      // Kosongkan field komentar setelah posting
      setNewComment('');
      setNewRating(0)
      setErrorMessage('');

      // Ambil ulang komentar untuk update tampilan
      const res = await axios.get(`http://localhost:3000/recipe-comment/recipe/${recipeId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Gagal posting komentar:", err);
      setErrorMessage("Gagal posting komentar. Pastikan Anda sudah login.");
    }
  };

  if (!recipeId) {
    return <p className="mt-20 text-center text-slate-500">Loading...</p>;
  }




useEffect(() => {
    axios.get(`http://localhost:3000/recipe-favorite/me`)
        .then(res => {
        const found = res.data.find(item => item.recipe_id === parseInt(recipeId));
        if (found) setIsFavorited(true);
        })
        .catch(err => console.error("Failed to check favorite", err));
    }, [recipeId]);

    const handleToggleFavorite = async () => {
    try {
        if (isFavorited) {
        await axios.delete("http://localhost:3000/recipe-favorite", {
            data: { recipe_id: recipeId }
        });
        setIsFavorited(false);
        } else {
        await axios.post("http://localhost:3000/recipe-favorite", {
            recipe_id: recipeId
        });
        setIsFavorited(true);
        }
    } catch (err) {
        console.error("Favorite error:", err);
        alert("Gagal menyimpan. Pastikan Anda sudah login.");
    }
    };

    return(
    <>
      <Navbar />
      <main className="bg-white w-full min-h-screen">
        <div className="container mx-auto">
          {recipe ? (
            <>
              {/* Section 1 */}
              <section className="pt-28">
                <h1 className="text-slate-700">{recipe.title}</h1>
                <div className="flex p-3 items-center gap-3">
                  <div className="flex items-center gap-3 border-r pr-3 border-slate-300">
                    <img
                      src="../public/assets/batik.jpg"
                      alt=""
                      className="w-9 h-9 object-cover rounded-full"
                    />
                    <p className="text-slate-700">Revan admin 1</p>
                  </div>
                  <div className="border-r pr-3 border-slate-300">
                    <p className="flex items-center gap-1 text-slate-700">
                      <Calendar /> Published on{" "}
                      <span>
                        {new Date(recipe.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  <div className="border-r pr-3 border-slate-300">
                    <p className="flex items-center gap-1 text-slate-700">
                      <MessageSquareMore />
                      <span>{recipe.recipe_comments.length}</span> Comment
                    </p>
                  </div>
                  <div className="border-r pr-3 border-slate-300">
                    <p className="flex items-center gap-1 text-slate-700">
                      <Bookmark />
                      <span>{recipe.recipe_favorites.length}</span> Save
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <img
                    src={recipe.img_url}
                    className="w-full h-[500px] object-cover"
                    alt={recipe.title}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-3">
                    <button
                    onClick={handleToggleFavorite}
                    className={`flex items-center gap-1 py-2 px-4 rounded-full border ${isFavorited ? 'bg-[#0C4834]  text-white' : 'bg-transparent text-slate-700 border-slate-700'}`}
                    >
                    <Bookmark /> {isFavorited ? "SAVED" : "SAVE"}
                    </button>
                    <button className="flex items-center gap-1 py-2 px-4 rounded-full bg-transparent text-slate-700 border border-slate-700">
                        <Star /> RATE
                    </button>
                    <button className="flex items-center gap-1 py-2 px-4 rounded-full bg-transparent text-slate-700 border border-slate-700">
                        <Printer /> PRINT
                    </button>
                </div>
              </section>

              {/* Section 2 */}
              <section className="flex mt-10 gap-6">
                {/* Left Content */}
                <section className="w-2/3 text-slate-700">
                  <div>
                    <h2 className="font-semibold text-2xl">Overview</h2>
                    <p>{recipe.overview}</p>
                  </div>

                  <div>
                    <h2 className="font-semibold text-2xl mt-10">Ingredients</h2>
                    <p>{recipe.ingredients}</p>
                  </div>

                  <div className="flex p-6 rounded-lg bg-gray-200 mt-8 justify-center items-center mb-8">
                    <div className="flex flex-col border-r border-slate-500 w-1/4">
                      <p className="flex flex-col items-center px-8">
                        <ChefHat size={50} /> Waktu Persiapan{" "}
                        <span className="text-slate-400">
                          {recipe.prep_time} Menit
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col border-r border-slate-500 w-1/4">
                      <p className="flex flex-col items-center px-8">
                        <ChefHat size={50} /> Waktu Memasak{" "}
                        <span className="text-slate-400">
                          {recipe.cook_time} Menit
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col border-r border-slate-500 w-1/4 text-center">
                      <p className="flex flex-col items-center">
                        <ChefHat size={50} /> Total Waktu{" "}
                        <span className="text-slate-400">
                          {recipe.prep_time + recipe.cook_time} Menit
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <p className="flex flex-col items-center px-8">
                        <ChefHat size={50} /> Porsi{" "}
                        <span className="text-slate-400">{recipe.serving}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h2 className="font-semibold text-2xl">How To Make</h2>
                    <p className="text-slate-700">{recipe.how_to_make}</p>
                  </div>

                  {/* Review Section */}
                  <div className="flex gap-3 bg-[#D9E8BD] p-7 ">
                    <div className="flex self-start">
                      <img
                        src="../public/assets/user-circle.svg"
                        className="w-10"
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-5">Peringkat Anda</p>

                      {/* Rating Stars */}
                      <div className="flex gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <svg
                            key={val}
                            onClick={() => setNewRating(val)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={val <= newRating ? "#facc15" : "none"}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className="w-8 h-8 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.75.75 0 011.04 0l2.613 2.643 3.671.537a.75.75 0 01.416 1.279l-2.654 2.67.627 3.692a.75.75 0 01-1.1.788L12 13.926l-3.093 1.182a.75.75 0 01-1.1-.788l.627-3.692-2.654-2.67a.75.75 0 01.416-1.279l3.671-.537 2.613-2.643z"
                            />
                          </svg>
                        ))}
                      </div>

                      <p className="font-semibold">Ulasan Anda:</p>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-white border p-3"
                        placeholder="Bagikan cintamu! Ceritakan kepada kami..."
                      ></textarea>
                      <button
                        onClick={handlePostComment}
                        className="bg-[#FDDE6C] font-semibold mt-5 px-4 py-2"
                      >
                        Posting Ulang
                      </button>
                    </div>
                  </div>

                  {/* Show Comments */}
                  <div className="flex flex-col">
                    {comments.map((comment, idx) => (
                      <div
                        key={idx}
                        className="p-7 flex gap-3 border-b border-slate-300"
                      >
                        <div className="flex self-start">
                          <img
                            src="../public/assets/user-circle.svg"
                            className="w-10"
                            alt=""
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-2">
                            {comment.user?.name || "Anonymous"}
                          </p>

                          {/* Show rating stars */}
                          <div className="flex mb-2">
                            {[1, 2, 3, 4, 5].map((val) => (
                              <svg
                                key={val}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={val <= comment.rating ? "#facc15" : "none"}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.75.75 0 011.04 0l2.613 2.643 3.671.537a.75.75 0 01.416 1.279l-2.654 2.67.627 3.692a.75.75 0 01-1.1.788L12 13.926l-3.093 1.182a.75.75 0 01-1.1-.788l.627-3.692-2.654-2.67a.75.75 0 01.416-1.279l3.671-.537 2.613-2.643z"
                                />
                              </svg>
                            ))}
                          </div>

                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Right Content: Related */}
                <section className="w-1/3 h-fit text-slate-700 shadow-lg p-8">
                  <h2 className="text-xl font-semibold">Related Recipe</h2>
                  <div className="flex flex-col gap-5">
                    {relatedRecipes.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-5 hover:bg-slate-100 cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/recipe/detail?id=${item.id}`)
                        }
                      >
                        <div className="w-1/2">
                          <img
                            src={item.img_url}
                            className="w-full h-32 object-cover"
                            alt={item.title}
                          />
                        </div>
                        <div className="flex flex-col w-1/2 justify-center">
                          <p className="font-semibold">{item.title}</p>
                          <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </section>
            </>
          ) : (
            <div className="text-center py-40 text-slate-500 text-xl">
              Loading recipe...
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
    )
}