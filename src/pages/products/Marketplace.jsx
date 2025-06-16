import { useEffect, useState } from "react";
import { Heart, Search, ShoppingCart } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Marketplace() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    { id: 1, name: "Herbs" },
    { id: 2, name: "Food & Meals" },
    { id: 3, name: "Batik" },
    { id: 4, name: "Handmade" },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const fetchByCategory = (categoryId) => {
    setCurrentPage(1); // reset ke halaman pertama
    fetch(`http://localhost:3000/api/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch by category:", err));
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="pt-24">
          <div className="container mx-auto flex gap-9">
            <div className="w-[65%] bg-red-500 h-96 items rounded-lg bg-[url(../public/assets/bg-marketplace.jpg)] bg-cover bg-center bg-no-repeat relative flex flex-col justify-between">
              <div className="absolute w-full h-full bg-black opacity-40 z-10 rounded-lg"></div>
              <div className="p-5 z-20">
                <p>asdasdasd</p>
              </div>
              <div className="flex justify-between z-20 items-center">
                <p className="p-5">asdasdasd</p>
                <button className="m-5 flex justify-center items-center gap-2 rounded-full text-sm">
                  <ShoppingCart />
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="w-[35%] bg-red-800 h-96 rounded-lg bg-[url(../public/assets/batik.jpg)] bg-cover bg-center bg-no-repeat hover:scale-110 relative flex">
              <div className="bg-black absolute w-full h-full opacity-40 z-10 rounded-lg"></div>
              <div className="self-end m-5 w-full z-20">
                <div className="flex justify-between items-center z-20">
                  <p>adasd</p>
                  <button className="flex justify-center items-center gap-2 rounded-full text-sm">
                    <ShoppingCart />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container w-full mx-auto pt-20">
          <div className="flex justify-between">
            <h1 className="text-slate-700 text-2xl">Popular Product</h1>
            <div className="flex items-center gap-2">
              <div className="w-96 bg-white rounded-full border border-black flex items-center px-2">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  className="flex-grow outline-none rounded-full bg-white text-slate-600 py-1"
                  placeholder="Search"
                />
              </div>
              <p className="text-black hover:bg-slate-300 p-2 rounded-full">
                <ShoppingCart />
              </p>
            </div>
          </div>
        </section>

        <div className="container w-full mx-auto mt-10 pb-2">
          <div className="flex justify-self-end gap-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => fetchByCategory(cat.id)}
                className="px-3 py-1 rounded-full bg-white border border-black text-black"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <section className="container flex mx-auto w-full gap-10 mt-5 flex-wrap justify-center">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/detail-product/${product.id}`)}
              className="w-[20%] min-h-5 flex flex-col rounded-lg relative hover:bg-slate-100 cursor-pointer"
            >
              <div className="absolute right-6 top-6 z-30">
                <button className="bg-[#bdbdbd3c] rounded-full p-1">
                  <Heart fill="#ffffff" />
                </button>
              </div>
              <div className="bg-[#FDDE6C] rounded-lg">
                <img
                  src={product.images[0]?.img_url || "../public/assets/batik.jpg"}
                  className="h-64 p-6 rounded-lg object-cover"
                  alt={product.name}
                />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Rp.{product.price}</p>
                <p className="text-slate-600 font-bold">{product.name}</p>
              </div>
            </div>
          ))}
        </section>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 mb-20 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-1 rounded-full border ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
