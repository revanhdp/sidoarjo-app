import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ShoppingCartIcon } from "lucide-react";

export default function DetailProduct() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Validasi sebelum melanjutkan ke checkout
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    
    if (product.variants?.length > 0 && !selectedVariant) {
      alert("Please select a variant");
      return;
    }

    if (quantity > product.stock) {
      alert("Quantity exceeds available stock");
      return;
    }

    navigate("/checkout", {
      state: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0]?.img_url,
          size: selectedSize,
          variant: selectedVariant,
          stock: product.stock
        },
        quantity: quantity,
        totalPrice: product.price * quantity
      }
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // Set default size dan variant jika ada
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0].name);
        }
        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0].name);
        }
      })
      .catch((err) => console.error("Error fetching product detail:", err));
  }, [id]);

  if (!product) return <p className="pt-24 text-center">Loading...</p>;

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <div className="pt-24 container mx-auto flex gap-5 flex-col sm:flex-row">
          {/* Left */}
          <div className="sm:w-1/3 flex flex-col gap-2">
            <img
              src={product.images[0]?.img_url || "../public/assets/batik.jpg"}
              className="h-96 object-cover w-full rounded-xl"
              alt={product.name}
            />
            <div className="flex gap-4">
              {product.images.map((img, i) => (
                <div key={i}>
                  <img
                    src={img.img_url}
                    className="rounded-xl w-28 h-20 object-cover"
                    alt={`img-${i}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-slate-700 font-semibold mt-16">
              Rating & Review
            </p>
          </div>

          {/* Middle */}
          <div className="sm:w-1/3 flex flex-col">
            <div className="py-2 px-9 flex flex-col text-black">
              <h2 className="text-black text-3xl font-medium">{product.name}</h2>
              <div className="flex text-black gap-10 mt-2">
                <p>4.9</p>
                <p>2.5K+ Reviews</p>
                <p>{product.sold} Sold</p>
              </div>

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mt-7">
                  <p>Choose Size</p>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size, idx) => (
                      <div className="mt-4" key={idx}>
                        <button
                          onClick={() => setSelectedSize(size.name)}
                          className={`px-4 py-1 rounded border ${selectedSize === size.name ? "bg-black text-white" : "bg-transparent border-slate-300"}`}
                        >
                          {size.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mt-4 flex gap-3 flex-wrap">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(variant.name)}
                      className={`px-4 py-1 rounded border ${selectedVariant === variant.name ? "bg-black text-white" : "bg-transparent border-slate-300"}`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Tab Switch */}
              <div className="mt-7 text-black flex gap-9 border-b border-slate-200">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 rounded-none bg-transparent ${
                    activeTab === "description"
                      ? "border-b border-b-[#BD9034] text-[#BD9034]"
                      : ""
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`pb-3 rounded-none bg-transparent ${
                    activeTab === "review"
                      ? "border-b border-b-[#BD9034] text-[#BD9034]"
                      : ""
                  }`}
                >
                  Review
                </button>
              </div>

              {/* Description */}
              {activeTab === "description" && (
                <div className="mt-2">
                  <p className="text-slate-700">{product.description}</p>
                </div>
              )}

              {/* Review */}
              {activeTab === "review" && (
                <div className="flex flex-col mt-5">
                  <div className="flex gap-3 items-center">
                    <img
                      src="../public/assets/batik.jpg"
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                    <p>Revan</p>
                  </div>
                  <div className="flex mt-2 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09L5.5 12.6.5 8.41l6.096-.89L10 2l3.404 5.52L19.5 8.41 14.5 12.6l1.378 5.49z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="sm:w-fit h-fit text-black flex flex-col p-8 border shadow-lg rounded-lg">
            <p>Set Order</p>
            <div className="flex gap-4 mt-5">
              <img
                src={product.images[0]?.img_url}
                className="w-24 h-24 object-cover"
                alt=""
              />
              <div className="flex flex-col">
                <p>
                  Selected Size: <span>{selectedSize || '-'}</span>
                </p>
                {selectedVariant && (
                  <p>
                    Selected Variant: <span>{selectedVariant}</span>
                  </p>
                )}
                <p className="font-semibold text-lg mt-2">
                  Rp {product.price?.toLocaleString('id-ID') || '0'}
                </p>
              </div>
            </div>
            <div className="flex gap-8 mt-6 items-center">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)} 
                  className="w-8 h-8 flex items-center justify-center text-xl border border-slate-400 bg-transparent rounded"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button 
                  onClick={() => quantity < product.stock && setQuantity(quantity + 1)} 
                  className="w-8 h-8 flex items-center justify-center text-xl border border-slate-400 bg-transparent rounded"
                >
                  +
                </button>
              </div>
              <p>
                Stock: <span>{product.stock}</span>
              </p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Total: Rp {(product.price * quantity)?.toLocaleString('id-ID') || '0'}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              <button 
                onClick={handleBuyNow} 
                className="bg-[#FDDE6C] hover:bg-[#fdd64a] font-semibold py-2 px-4 rounded"
              >
                Buy Now
              </button>
              <button className="flex bg-transparent items-center justify-center border-2 gap-2 hover:bg-[#789A48] hover:text-white text-[#789A48] border-[#789A48] py-2 px-4 rounded">
                <ShoppingCartIcon size={16} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}