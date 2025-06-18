import NavbarAdmin from "../../components/NavbarAdmin";
import { Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function AddRecipe() {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category_id: "",
    overview: "",
    description: "",
    how_to_make: "",
    ingredients: "",
    prep_time: "",
    cook_time: "",
    serving: "",
    tag: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (!image) return alert("Gambar harus diunggah!");

      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });
      payload.append("img_url", image); 

      await axios.post("http://localhost:3000/recipe", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resep berhasil ditambahkan!");
      // Reset
      setFormData({
        title: "",
        slug: "",
        category_id: "",
        overview: "",
        description: "",
        how_to_make: "",
        ingredients: "",
        prep_time: "",
        cook_time: "",
        serving: "",
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan resep.");
    }
  };

  return (
    <>
      <NavbarAdmin />
      <main className="bg-[#F0F0F0] min-h-screen">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 container mx-auto pt-6">
          {/* Left */}
          <div className="flex flex-col gap-2 w-full h-fit sm:w-1/3 text-black bg-white rounded-xl p-7">
            <p>Upload Recipe Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
            {preview && (
              <img src={preview} className="w-full h-56 object-cover rounded-xl mt-4" alt="Preview" />
            )}
          </div>

          {/* Right */}
          <div className="bg-white text-black flex flex-col w-full sm:w-2/3 rounded-lg">
            <p className="p-4 border-b border-slate-200">Recipe Information</p>
            <div className="p-8">
              <div className="flex flex-col gap-2">
                <label>Recipe Name</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="mt-5 flex">
                <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-1/2 bg-transparent border-2 border-slate-300 p-2 rounded-lg">
                  <option value="" disabled>Select Category</option>
                  <option value="1">Appatizer</option>
                  <option value="2">Main Course</option>
                  <option value="3">Dessert</option>
                  <option value="4">Snack</option>
                </select>
              </div>

              <div className="mt-5 flex flex-col">
                <label>Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="mt-5 flex flex-col">
                <label>Overview</label>
                <input type="text" name="overview" value={formData.overview} onChange={handleChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col mt-8">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col mt-8">
                <label>Ingredients</label>
                <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} rows={4} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col mt-8">
                <label>How To Make It</label>
                <textarea name="how_to_make" value={formData.how_to_make} onChange={handleChange} rows={4} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="flex items-center gap-3 mt-8">
                <label>Serving</label>
                <input type="text" name="serving" value={formData.serving} onChange={handleChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="flex items-center gap-3 mt-8">
                <label>Prep Time</label>
                <input type="text" name="prep_time" value={formData.prep_time} onChange={handleChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <div className="flex items-center gap-3 mt-8">
                <label>Cook Time</label>
                <input type="text" name="cook_time" value={formData.cook_time} onChange={handleChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" />
              </div>

              <button onClick={handleSubmit} className="bg-[#789A48] text-white mt-9 px-12 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
