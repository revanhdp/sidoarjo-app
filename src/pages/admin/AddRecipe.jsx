import NavbarAdmin from "../../components/NavbarAdmin";
import { Upload } from "lucide-react";

export default function AddRecipe(){
    return(
        <>
            <NavbarAdmin/>
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 container mx-auto pt-6">
                    {/* Left */}
                    <div className="flex flex-col gap-2 w-full h-fit sm:w-1/3 text-black bg-white rounded-xl p-7">
                        <p>Recipe Image</p>
                        <div className="flex flex-col">
                            <div>
                                <img src="../public/assets/batik.jpg" className="w-full h-56 object-cover rounded-xl" alt="" />
                            </div>
                            <div className="flex gap-4 mt-8">
                                {[1,2,3,4].map((img) => (
                                    <div className="">
                                        <img src="../public/assets/batik.jpg" className="w-28 h-20 object-cover rounded-xl" alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="w-fit flex gap-2 bg-transparent border border-slate-400 text-black mt-10"><Upload/> Add other Image</button>
                    
                    </div>

                    {/* Right */}
                    <div className="bg-white text-black flex flex-col w-full sm:w-2/3 rounded-lg">
                        <p className="p-4 border-b border-slate-200">Recipe Information</p>
                        <div className="p-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="">Recipe Name</label>
                                <input type="text" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Enter Recipe Name"/>  
                            </div>
                            <div className="mt-5 flex">
                                <select name="" id="" className="w-1/2 bg-transparent border-2 border-slate-300 p-2 rounded-lg ">
                                    <option value="" disabled>Select Category</option>
                                    <option value="">Herbs</option>
                                    <option value="">Food & Meals</option>
                                    <option value="">Batik</option>
                                    <option value="">Handmade</option>
                                </select>
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="">Description</label>
                                <textarea name="" rows={6} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Describe your recipe in a way that makes mouths water." id=""></textarea>
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="">Ingredients</label>
                                <textarea name="" rows={6} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="What's the Ingredients" id=""></textarea>
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="">How To Make It</label>
                                <textarea name="" rows={6} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Share your kitchen secrets! Oven hacks, swaps, or any tips for ultimate recipe success." id=""></textarea>
                            </div>

                            <div className="flex items-center gap-3 mt-8">
                                <label htmlFor="">Serving</label>
                                <input type="text" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="e.g.,4" />
                            </div>

                            <div className="flex items-center gap-3 mt-8">
                                <label htmlFor="">Prep Time</label>
                                <input type="number" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Hours" />
                                <input type="number" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Minute" />
                            </div>

                            <div className="flex items-center gap-3 mt-8">
                                <label htmlFor="">Cook Time</label>
                                <input type="number" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Hours" />
                                <input type="number" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Minute" />
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="">Tag</label>
                                <textarea name="" rows={3} className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" id=""></textarea>
                            </div>

                            <button className="bg-[#789A48] text-white flex justify-self-center mt-9 px-12 py-2"> Save</button>

                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}