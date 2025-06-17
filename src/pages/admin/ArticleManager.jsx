import { useEffect, useState } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    slug: "",
    category_id: "",
    data_article: ""
  });    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:3000/articles");
    setArticles(res.data);
  };

  const handleEditClick = (article) => {
    setSelectedArticle(article);
    setFormData(article);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/articles/${selectedArticle.id}`, formData);
      setShowModal(false);
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus artikel ini?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:3000/articles/${id}`);
        fetchArticles(); 
    } catch (err) {
        console.error("Gagal menghapus artikel:", err);
    }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (
    <>
      <NavbarAdmin/>
      <main className="bg-[#F0F0F0] min-h-screen">
        <div className="container mx-auto pt-10 flex flex-col ">
          <section className=" bg-white text-slate-700 rounded-lg mt-6 mb-6">
            <p className="p-6 border-b-2 border-slate-200">Article Manager</p>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-7 px-6 mt-8 font-semibold items-center">

              <p>Article Title</p>
              <p>Added at</p>
              <p>Category</p>
              <p>Description</p>
              <p>Action</p>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
                {currentItems.map((article, index) => (
                    <div key={index} className="grid grid-cols-5 gap-7 px-6 py-4 items-center border-b">
                    <div className="flex items-center gap-3">
                        <img
                        src={article.images[0]?.img_url}
                        className="w-14 h-14 rounded-full object-cover"
                        />
                        <p>{article.title}</p>
                    </div>
                    <p>{new Date(article.createdAt).toLocaleString()}</p>
                    <p>{article.category?.name}</p>
                    <p className="line-clamp-2">{article.desc}</p>
                    <div className="flex gap-2">
                        <button
                        onClick={() => handleEditClick(article)}
                        className="text-white bg-[#5347F3] px-4 py-1 rounded"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(article.id)}
                        className="text-white bg-red-500 px-4 py-1 rounded"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                ))}
            </div>
          </section>
            <div className="flex justify-center my-4">
                {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 mx-1 border rounded ${currentPage === i + 1 ? 'bg-black text-white' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
            </div>
        </div>
        

        {/* Modal Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[500px]">
              <h2 className="text-xl font-bold mb-4">Edit Article</h2>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full mb-2 p-2 border"
                placeholder="Title"
              />
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="w-full mb-2 p-2 border"
                placeholder="Description"
              ></textarea>
              <textarea
                value={formData.data_article}
                onChange={(e) => setFormData({ ...formData, data_article: e.target.value })}
                className="w-full mb-2 p-2 border"
                placeholder="Full Article"
              ></textarea>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full mb-2 p-2 border"
                placeholder="Slug"
              />
              <input
                type="number"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full mb-4 p-2 border"
                placeholder="Category ID"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300">Cancel</button>
                <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white">Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
