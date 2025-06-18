import NavbarAdmin from "../../components/NavbarAdmin";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecipeManager() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/recipe");
      setRecipes(response.data);
    } catch (error) {
      console.error("Gagal mengambil data resep", error);
    }
  };

  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const displayedRecipes = recipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus resep ini?")) return;
    try {
      await axios.delete(`http://localhost:3000/recipe/${id}`);
      fetchRecipes();
    } catch (err) {
      console.error("Gagal menghapus resep", err);
    }
  };

  const handleEditClick = (recipe) => {
    setEditRecipe(recipe);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRecipe({ ...editRecipe, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/recipe/${editRecipe.id}`, editRecipe);
      setEditModalOpen(false);
      fetchRecipes();
    } catch (error) {
      console.error("Gagal memperbarui resep", error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <main className="bg-[#F0F0F0] min-h-screen">
        <div className="container mx-auto pt-10 flex flex-col">
          <section className=" bg-white text-slate-700 rounded-lg mt-6 mb-6">
            <p className="p-6 border-b-2 border-slate-200">Recipe Manager</p>

            {/* Header Table */}
            <div className="grid grid-cols-5 gap-7 px-6 mt-8 font-semibold items-center">
              <p></p>
              <p>Title</p>
              <p>Added at</p>
              <p>Category</p>
              <p>Actions</p>
            </div>

            {/* Data */}
            <div className="flex flex-col">
              {displayedRecipes.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 gap-7 px-6 py-4 items-center border-b"
                >
                  <div>
                    <input type="checkbox" />
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img_url}
                      className="w-14 h-14 rounded-full object-cover"
                      alt="recipe"
                    />
                    <p>{item.title}</p>
                  </div>
                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  <p>{item.category?.name || "-"}</p>
                  <div className="flex gap-2">
                    <button
                      className="text-white bg-blue-600 px-3 py-1 rounded"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white bg-red-600 px-3 py-1 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2 pb-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === i + 1
                      ? "bg-[#789A48] text-white"
                      : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* MODAL */}
      {editModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white rounded-lg p-6 w-11/12 max-w-xl"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Recipe</h2>

            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={editRecipe.title}
              onChange={handleEditChange}
              className="border w-full mb-4 p-2 rounded"
            />

            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              name="img_url"
              value={editRecipe.img_url}
              onChange={handleEditChange}
              className="border w-full mb-4 p-2 rounded"
            />

            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              rows={3}
              value={editRecipe.description}
              onChange={handleEditChange}
              className="border w-full mb-4 p-2 rounded"
            />

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
