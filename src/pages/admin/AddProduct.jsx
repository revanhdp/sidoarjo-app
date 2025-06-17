import { Upload } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    sold: 0,
    slug: "",
    category_id: "",
  });

  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const [addVariant, setAddVariant] = useState(false);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleAddField = (setFunc, data) => {
    setFunc([...data, ""]);
  };

  const handleFieldChange = (index, value, setFunc, data) => {
    const updated = [...data];
    updated[index] = value;
    setFunc(updated);
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Create Product
      const productRes = await axios.post("http://localhost:3000/api/products", productData);
      const productId = productRes.data.id;

      // Step 2: Upload Images
      if (images.length > 0) {
        const imgFormData = new FormData();
        images.forEach((image) => imgFormData.append("images", image));
        imgFormData.append("product_id", productId);
        await axios.post("http://localhost:3000/api/images", imgFormData);
      }

      // Step 3: Add Variants
      for (const variant of variants) {
        if (variant.trim() !== "") {
          await axios.post("http://localhost:3000/api/products/variants", {
            product_id: productId,
            name: variant,
          });
        }
      }

      // Step 4: Add Sizes
        for (const size of sizes) {
        await axios.post("http://localhost:3000/api/products/sizes", {
            product_id: productId,
            name: size,
        });
        }

        alert("Product created successfully!");
        } catch (err) {
        console.error(err);
        alert("Failed to create product.");
        }
    };

  return (
    <>
      <NavbarAdmin />
      <main className="bg-[#F0F0F0] min-h-screen">
        <div className="flex gap-2 sm:gap-14 container mx-auto pt-6 flex-col sm:flex-row">
          {/* Left */}
          <div className="flex flex-col gap-2 sm:w-1/3 text-black bg-white rounded-xl p-7 h-fit">
            <p>Product Image</p>
            <div className="flex flex-col">
              <div>
                <img src="../public/assets/batik.jpg" className="w-full h-56 object-cover rounded-xl" alt="" />
              </div>
              <div className="flex gap-4 mt-8">
                {[1, 2, 3, 4].map((img, idx) => (
                  <div key={idx}>
                    <img src="../public/assets/batik.jpg" className="w-28 h-20 object-cover rounded-xl" alt="" />
                  </div>
                ))}
              </div>
            </div>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} hidden id="upload" />
            <label htmlFor="upload" className="w-fit flex gap-2 cursor-pointer bg-transparent border border-slate-400 text-black mt-10 p-2 rounded">
              <Upload /> Add other Image
            </label>
          </div>

          {/* Right */}
          <div className=" text-black flex flex-col gap-2 w-full sm:w-2/3 mb-5">
            <div className="bg-white rounded-lg">
              <p className="p-4 border-b border-slate-200">Product Information</p>
              <div className="p-8">
                <div className="flex flex-col gap-2">
                  <label>Product Name</label>
                  <input name="name" value={productData.name} onChange={handleInputChange} type="text" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Enter Product Name" />
                </div>
                <div className="mt-5 flex">
                  <select name="category_id" value={productData.category_id} onChange={handleInputChange} className="w-1/2 bg-transparent border-2 border-slate-300 p-2 rounded-lg ">
                    <option value="" disabled>Select Category</option>
                    <option value="1">Herbs</option>
                    <option value="2">Food & Meals</option>
                    <option value="3">Batik</option>
                    <option value="4">Handmade</option>
                  </select>
                  <div className="self-center ml-10 flex gap-2">
                    <label>Add Variant</label>
                    <input type="checkbox" onChange={(e) => setAddVariant(e.target.checked)} />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-20 mt-16">
                  <div className="flex w-1/2 flex-col gap-1">
                    <label>Price</label>
                    <input name="price" value={productData.price} onChange={handleInputChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Rp." type="number" />
                  </div>
                  <div className="flex w-1/2 flex-col gap-1">
                    <label>Enter Slug Product</label>
                    <input name="slug" value={productData.slug} onChange={handleInputChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Enter Product Key" type="text" />
                  </div>
                </div>
                <div className="flex flex-col mt-5 w-1/2">
                    <label>Stock</label>
                    <input name="stock" value={productData.stock} onChange={handleInputChange} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="0" type="number" />
                </div>
                <div className="flex flex-col mt-5">
                  <label>Product Description</label>
                  <textarea name="description" value={productData.description} onChange={handleInputChange} rows={5} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Description"></textarea>
                </div>
                {addVariant && (
                  <>
                    <div className="mt-5">
                      <label>Variants</label>
                      {variants.map((v, idx) => (
                        <input key={idx} value={v} onChange={(e) => handleFieldChange(idx, e.target.value, setVariants, variants)} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg mt-1 w-full" placeholder={`Variant ${idx + 1}`} />
                      ))}
                      <button type="button" className="mt-2 text-sm text-slate-200" onClick={() => handleAddField(setVariants, variants)}>+ Add More Variant</button>
                    </div>
                    <div className="mt-5">
                      <label>Sizes</label>
                      {sizes.map((s, idx) => (
                        <input key={idx} value={s} onChange={(e) => handleFieldChange(idx, e.target.value, setSizes, sizes)} className="bg-transparent border-2 border-slate-300 p-2 rounded-lg mt-1 w-full" placeholder={`Size ${idx + 1}`} />
                      ))}
                      <button type="button" className="mt-2 text-sm text-slate-200 " onClick={() => handleAddField(setSizes, sizes)}>+ Add More Size</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button onClick={handleSubmit} className="bg-[#789A48] mt-5 px-8 hover:bg-[#3b4f1f] mr-4 mb-4 sm:mb-0 sm:mr-0 py-2 w-fit text-white flex justify-self-end self-end">Save</button>
          </div>
        </div>
      </main>
    </>
  );
}
