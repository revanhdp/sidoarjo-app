import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ReactMarkdown from "react-markdown";

export default function DetailProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
  });
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleBuyNow = () => {
    // ... (kode Anda tidak berubah)
    // if (product.sizes?.length > 0 && !selectedSize) {
    //   alert("Please select a size");
    //   return;
    // }
    
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

 const fetchReviews = async (limit = 3) => { // Tambahkan parameter limit
    if (!id) return;

    try {
      // Tambahkan query parameter limit ke URL
      const response = await fetch(`http://localhost:3000/api/reviews/${id}/reviews?limit=${limit}`);
      if (!response.ok) { // Cek jika respons tidak OK (e.g., 400, 401, 500)
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success) {
        setReviews(data.data.reviews);
        setReviewStats({
          averageRating: data.data.averageRating,
          totalReviews: data.data.totalReviews,
        });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // alert("Error fetching reviews: " + error.message); // Opsional: tampilkan alert jika fetching reviews gagal
    }
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const submitReview = async () => {
    if (userRating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const response = await fetch(`http://localhost:3000/api/reviews/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: userRating,
          comment: userComment,
        }),
        credentials: "include", 
      });

      // PENTING: Periksa `response.ok` sebelum mencoba `response.json()`
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUserRating(0);
        setUserComment("");
        fetchReviews(); // Refresh reviews, akan ambil 3 terbaru secara default
        alert("Review submitted successfully!"); // Ini akan muncul jika `data.success` true
      } else {
        // Ini seharusnya tidak terpicu jika backend mengirim success: true pada 201
        alert(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.message || "Failed to submit review"); // Tampilkan pesan error spesifik jika ada
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStars = (rating, interactive = false, size = "w-4 h-4") => {
    return [...Array(5)].map((_, i) => {
      const starNumber = i + 1;
      const isActive = interactive
        ? (hoveredRating || userRating) >= starNumber
        : rating >= starNumber;

      return (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`${size} ${interactive ? "cursor-pointer" : ""} ${
            isActive ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"
          }`}
          viewBox="0 0 20 20"
          onClick={() => interactive && handleStarClick(starNumber)}
          onMouseEnter={() => interactive && handleStarHover(starNumber)}
          onMouseLeave={() => interactive && handleStarLeave()}
        >
          <path d="M10 15l-5.878 3.09L5.5 12.6.5 8.41l6.096-.89L10 2l3.404 5.52L19.5 8.41 14.5 12.6l1.378 5.49z" />
        </svg>
      );
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

    fetchReviews(); // Panggil fetchReviews saat komponen dimuat
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
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {renderStars(Math.round(reviewStats.averageRating))}
              </div>
              <span className="font-semibold">
                {reviewStats.averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {reviewStats.totalReviews} Reviews
            </p>
          </div>

          {/* Middle */}
          <div className="sm:w-1/3 flex flex-col">
            <div className="py-2 px-9 flex flex-col text-black">
              <h2 className="text-black text-3xl font-medium">
                {product.name}
              </h2>
              <div className="flex text-black gap-10 mt-2">
                <p>{reviewStats.averageRating.toFixed(1)}</p>
                <p>{reviewStats.totalReviews}+ Reviews</p>
                <p>{product.sold} Sold</p>
              </div>

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mt-7">
                  <p>Choose Variant</p>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size, idx) => (
                      <div className="mt-4" key={idx}>
                        <button
                          onClick={() => setSelectedSize(size.name)}
                          className={`px-4 bg-[#f0f0f0] text-black  py-1 rounded border ${
                            selectedSize === size.name
                              ? "bg-blue-100 text-black"
                              : "bg-transparent border-slate-300"
                          }`}
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
                      className={`px-4 py-1 bg-[#f0f0f0] text-black  rounded border ${
                        selectedVariant === variant.name
                          ? "bg-blue-100 text-black"
                          : "bg-transparent border-slate-300"
                      }`}
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
                  className={`pb-3 rounded-none bg-transparent font-semibold ${
                    activeTab === "description"
                      ? "border-b border-b-[#BD9034] text-[#BD9034]"
                      : ""
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`pb-3 rounded-none bg-transparent font-semibold ${
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
                  <div className="text-slate-700 prose w-full break-words ">
                    <ReactMarkdown>
                      {product.description}
                    </ReactMarkdown>
                  </div>
                  <p className=""></p>
                </div>
              )}

              {/* Review */}
              {activeTab === "review" && (
                <div className="flex flex-col mt-5">
                  {/* Existing Reviews - Display max 3 */}
                  {reviews.length > 0 ? (
                    reviews.slice(0, 3).map((review, index) => ( // Batasi hingga 3 komentar
                      <div
                        key={review.id || index}
                        className="border-b border-gray-200 pb-4 mb-4"
                      >
                        <div className="flex gap-3 items-center mb-2">
                          <img
                            src={
                              review.User?.img_url ||
                              "../public/assets/user-circle.svg"
                            }
                            className="w-10 h-10 rounded-full object-cover"
                            alt="User"
                          />
                          <div>
                            <p className="font-medium">
                              {review.User?.first_name || "Anonymous"}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-gray-700 ml-13">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 mb-4">No reviews yet.</p>
                  )}

                  {/* Add Review Form */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3">Write a Review</h4>

                    {/* Rating Stars */}
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Rating</p>
                      <div className="flex gap-1">
                        {renderStars(userRating, true, "w-6 h-6")}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">
                        Comment (Optional)
                      </p>
                      <textarea
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        className="w-full p-3 border bg-[#f0f0f0] border-gray-300 rounded-md resize-none"
                        rows="4"
                        placeholder="Share your experience with this product..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={submitReview}
                      disabled={isSubmittingReview || userRating === 0}
                      className="bg-[#BD9034] text-white px-6 py-2 rounded hover:bg-[#a67c2a] disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSubmittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>

                  {/* Button to view all reviews if more than 3 */}
                  {reviewStats.totalReviews > 3 && (
                    <button
                      onClick={() => navigate(`/product/${id}/all-reviews`)} // Contoh rute ke halaman semua review
                      className="text-[#BD9034] hover:underline mt-4 self-center"
                    >
                      View All {reviewStats.totalReviews} Reviews
                    </button>
                  )}
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
                  Selected Size: <span>{selectedSize || "-"}</span>
                </p>
                {selectedVariant && (
                  <p>
                    Selected Variant: <span>{selectedVariant}</span>
                  </p>
                )}
                <p className="font-semibold text-lg mt-2">
                  Rp {product.price?.toLocaleString("id-ID") || "0"}
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
                  onClick={() =>
                    quantity < product.stock && setQuantity(quantity + 1)
                  }
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
                Total: Rp{" "}
                {(product.price * quantity)?.toLocaleString("id-ID") || "0"}
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
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}