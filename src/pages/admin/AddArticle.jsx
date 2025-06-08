import NavbarAdmin from "../../components/NavbarAdmin";
import { Upload } from "lucide-react";

export default function AddArticle(){
    return(
        <>
            <NavbarAdmin/>
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="flex gap-14 container mx-auto pt-6">
                    <div className="flex flex-col gap-2 w-1/3 text-black bg-white rounded-xl p-7 h-fit">
                        <p>Article Image</p>
                        <div className="flex flex-col">
                            <div>
                                <img src="../public/assets/batik.jpg" className="w-full h-56 object-cover rounded-xl" alt="" />
                            </div>
                            <div className="flex gap-4 mt-8">
                                {[1,2].map((img) => (
                                    <div className="">
                                        <img src="../public/assets/batik.jpg" className="w-28 h-20 object-cover rounded-xl" alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="w-fit flex gap-2 bg-transparent border border-slate-400 text-black mt-10"><Upload/> Add other Image</button>

                    </div>
                    <div className="bg-white text-black flex flex-col w-2/3 rounded-lg">
                        <p className="p-4 border-b border-slate-200">Article Information</p>
                        <div className="p-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="">Article Title</label>
                                <input type="text" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Enter Article Title"/>  
                            </div>
                            <div className="mt-5 flex">
                                <select name="" id="" className="w-1/2 bg-transparent border-2 border-slate-300 p-2 rounded-lg ">
                                    <option value="" disabled>Article Category</option>
                                    <option value="">Herbs</option>
                                    <option value="">Food & Meals</option>
                                    <option value="">Batik</option>
                                    <option value="">Handmade</option>
                                </select>
                            </div>
                            <div className="flex flex-col mt-5">
                                <label htmlFor="">Article Description</label>
                                <textarea rows={8} name="" className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Description" id=""></textarea>
                            </div>


                        </div>
                        <button className="bg-[#789A48] hover:bg-[#3e5221] text-white w-fit self-end px-7 py-1 mr-8 mb-4">Save</button>
                    </div>
                    
                </div>
            </main>
        </>
    )
}