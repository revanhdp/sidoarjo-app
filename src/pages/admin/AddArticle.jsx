import NavbarAdmin from "../../components/NavbarAdmin";
import { Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function AddArticle() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dataArticle, setDataArticle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imagePreview, setImagePreview] = useState([]);
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Hanya simpan 3 gambar
        if (files.length !== 3) {
            alert("Harap pilih tepat 3 gambar (1 utama, 2 fitur).");
            return;
        }

        setImages(files);
        setImagePreview(files.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async () => {
        if (images.length !== 3) {
            alert("Harap upload tepat 3 gambar terlebih dahulu.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("desc", desc);
            formData.append("data_article", dataArticle);
            formData.append("category_id", categoryId);
            formData.append("slug", title.toLowerCase().replace(/\s+/g, "-"));

            images.forEach((img) => formData.append("img_url", img));

            await axios.post("http://localhost:3000/articles/articles/full", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Article created successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to create article");
        }
    };

    return (
        <>
            <NavbarAdmin />
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="flex gap-14 container mx-auto pt-6">
                    <div className="flex flex-col gap-2 w-1/3 text-black bg-white rounded-xl p-7 h-fit">
                        <p>Article Image</p>
                        <div className="flex flex-col">
                            <div>
                                <img
                                    src={imagePreview[0] || "../public/assets/batik.jpg"}
                                    className="w-full h-56 object-cover rounded-xl"
                                    alt=""
                                />
                            </div>
                            <div className="flex gap-4 mt-8">
                                {imagePreview.map((img, index) => (
                                    <div key={index}>
                                        <img src={img} className="w-28 h-20 object-cover rounded-xl" alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <label className="w-fit flex gap-2 bg-transparent border border-slate-400 text-black mt-10 p-2 rounded cursor-pointer">
                            <Upload /> Add other Image
                            <input type="file" multiple className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>

                    <div className="bg-white text-black flex flex-col w-2/3 rounded-lg">
                        <p className="p-4 border-b border-slate-200">Article Information</p>
                        <div className="p-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="">Article Title</label>
                                <input
                                    type="text"
                                    className="bg-transparent border-2 border-slate-300 p-2 rounded-lg"
                                    placeholder="Enter Article Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="mt-5 flex">
                                <select
                                    className="w-1/2 bg-transparent border-2 border-slate-300 p-2 rounded-lg"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="" disabled>Article Category</option>
                                    <option value="1">Health</option>
                                    <option value="2">Culinary</option>
                                    <option value="3">Art & Craft</option>
                                    <option value="4">History</option>
                                    <option value="5">Cultural Sites</option>
                                </select>
                            </div>

                            <div className="flex flex-col mt-5">
                                <label htmlFor="">Article Description</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg"
                                    placeholder="Short description"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex flex-col mt-5">
                                <label htmlFor="">Article Content</label>
                                <textarea
                                    rows={8}
                                    className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg"
                                    placeholder="Full content of the article"
                                    value={dataArticle}
                                    onChange={(e) => setDataArticle(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="bg-[#789A48] hover:bg-[#3e5221] text-white w-fit self-end px-7 py-1 mr-8 mb-4"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
