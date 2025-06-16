import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Article() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchAllArticles();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/articles/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchAllArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/articles");
      setArticles(res.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  const fetchArticlesByCategory = async (id) => {
    try {
      setSelectedCategory(id);
      const res = await axios.get(`http://localhost:3000/articles/category/${id}`);
      setArticles(res.data);
    } catch (error) {
      console.error("Failed to fetch articles by category:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <div
          className="w-full h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-white px-4 text-center"
          style={{ backgroundImage: "url('/assets/hero-article.png')" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Explore our Articles – <br className="hidden sm:block" />
            Discover interesting things
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
              placeholder="Search articles"
              className="flex-grow outline-none bg-white text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Categories */}
        <section className="mt-10 flex gap-4 flex-wrap container mx-auto justify-center">
          {categories.map((ctg) => (
            <button
              key={ctg.id}
              onClick={() => fetchArticlesByCategory(ctg.id)}
              className={`border text-black py-1 px-3 rounded-md border-[#0C4834] bg-transparent hover:bg-[#0C4834] hover:text-white ${
                selectedCategory === ctg.id ? "bg-[#0C4834] text-white" : ""
              }`}
            >
              {ctg.name}
            </button>
          ))}
        </section>

        {/* Card Articles */}
        <section className="flex gap-9 flex-wrap container mx-auto w-full mt-10 justify-center items-center">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col rounded-sm w-96 cursor-pointer shadow-lg bg-white"
              onClick={() => navigate(`/detail-article/${article.id}`)}
            >
              <div className="h-1/2 bg-red-600">
                <img
                  src={article.images?.[0]?.img_url || "/assets/batik.jpg"}
                  className="w-full h-60 object-cover"
                  alt=""
                />
              </div>
              <div className="h-1/2 flex flex-col gap-2 p-2">
                <p className="text-slate-700 font-semibold">{article.category?.name || "Uncategorized"}</p>
                <p className="text-slate-700 font-light">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-slate-700 line-clamp-2 font-semibold">{article.title}</p>
                <p className="text-slate-700 line-clamp-2">{article.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Highlights
        <section className="bg-[#EFEEE8] mt-10 py-6">
          <h1 className="text-center font-medium text-slate-700 text-3xl">Highlights</h1>
          <div className="flex flex-col gap-6 container mx-auto mt-5">
            {articles.slice(0, 5).map((article) => (
              <div
                key={article.id}
                className="flex border shadow-lg bg-white cursor-pointer"
                onClick={() => navigate(`/detail-article/${article.id}`)}
              >
                <div className="w-1/3">
                  <img
                    src={article.images?.[0]?.url || "/assets/batik.jpg"}
                    className="object-cover h-60 w-96"
                    alt=""
                  />
                </div>
                <div className="w-2/3 self-center">
                  <div className="flex flex-col gap-4 p-9 justify-center">
                    <p className="text-slate-700 text-2xl font-semibold">{article.title}</p>
                    <p className="text-slate-700">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-slate-700 line-clamp-3">{article.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Duplicate Card Articles
        <section className="flex gap-9 flex-wrap container mx-auto w-full mt-10 justify-center items-center">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col rounded-sm w-96 shadow-lg bg-white cursor-pointer"
              onClick={() => navigate(`/detail-article/${article.id}`)}
            >
              <div className="h-1/2 bg-red-600">
                <img
                  src={article.images?.[0]?.url || "/assets/batik.jpg"}
                  className="w-full h-60 object-cover"
                  alt=""
                />
              </div>
              <div className="h-1/2 flex flex-col gap-2 p-2">
                <p className="text-slate-700 font-semibold">{article.category?.name || "Uncategorized"}</p>
                <p className="text-slate-700 font-light">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-slate-700 line-clamp-2 font-semibold">{article.title}</p>
                <p className="text-slate-700 line-clamp-2">{article.desc}</p>
              </div>
            </div>
          ))}
        </section> */}

        <Footer />
      </main>
    </>
  );
}
