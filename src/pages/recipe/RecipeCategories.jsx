import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function RecipeCategories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const query = useQuery();;
  const categoryIdFromQuery = query.get("category_id");

  const categories = [
    { id: 1, name: "Appatizer" },
    { id: 2, name: "Main Course" },
    { id: 3, name: "Dessert" },
    { id: 4, name: "Snack" }
  ];

  useEffect(() => {
      if (categoryIdFromQuery) {
        const categoryId = parseInt(categoryIdFromQuery);
        setSelectedCategory(categoryId);

        axios
          .get(`http://localhost:3000/recipe/category/${categoryId}`)
          .then((res) => setRecipes(res.data))
          .catch((err) =>
            console.error("Failed to fetch recipe by category:", err)
          );
      } else {
        setRecipes([]); 
        setSelectedCategory(null);
      }
    }, [categoryIdFromQuery]);

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-[90vh]">
        <div className="w-full mt-14 py-20 bg-[#D9E8BD] bg-center flex flex-col items-center justify-center text-white px-4 text-center">
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
              placeholder="Search recipe"
              className="flex-grow outline-none bg-white text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        <section className="container mx-auto mt-10 ">
          <div className="flex gap-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  navigate(`/recipe-categories?category_id=${cat.id}`);
                }}
                className={`rounded-full text-slate-700 border py-1 px-4 ${
                  selectedCategory === cat.id
                    ? "bg-[#0C4834] text-white"
                    : "bg-white border-[#0C4834] hover:bg-[#0C4834] hover:text-white"
                }`}
              >
                {cat.name}
            </button>

            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-8 justify-center">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="w-full sm:w-[48%] lg:w-[30%] bg-white rounded-md shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(`/detail-recipe?id=${recipe.id}`)}
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={recipe.img_url}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-md font-semibold text-slate-700">
                    {recipe.recipe_category.name}
                  </p>
                  <p className="text-xs text-slate-700">
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </p>
                  <h2 className="text-lg text-slate-600 mt-1 font-semibold">
                    {recipe.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {recipe.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      <Footer />
      </main>
    </>
  );
}
