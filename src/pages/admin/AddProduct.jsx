import { Upload } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function AddProduct(){
    return(
        <>
            <NavbarAdmin/>
            <main className="bg-[#F0F0F0] min-h-screen">
                <div className="flex gap-14 container mx-auto pt-6">
                    <div className="flex flex-col gap-2 w-1/3 text-black bg-white rounded-xl p-7">
                        <p>Product Image</p>
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
                    <div className="bg-white text-black flex flex-col w-2/3 rounded-lg">
                        <p className="p-4 border-b border-slate-200">Product Information</p>
                        <div className="p-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="">Product Name</label>
                                <input type="text" className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Enter Product Name"/>  
                            </div>
                            <div className="mt-5 flex">
                                <select name="" id="" className="w-1/2 bg-transparent border-2 border-slate-300 p-2 rounded-lg ">
                                    <option value="" disabled>Select Category</option>
                                    <option value="">Herbs</option>
                                    <option value="">Food & Meals</option>
                                    <option value="">Batik</option>
                                    <option value="">Handmade</option>
                                </select>
                                <div className="self-center ml-10 flex gap-2">
                                    <label className="" htmlFor="">Add Variant</label>
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>

                            <div className="flex gap-20 mt-16">
                                <div className="flex w-1/2 flex-col gap-1">
                                    <label htmlFor="">Price</label>
                                    <input className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Rp." type="number" />
                                </div>
                                <div className="flex w-1/2 flex-col gap-1">
                                    <label htmlFor="">Enter Id Product</label>
                                    <input className="bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Enter Product Key" type="text" />
                                </div>
                            </div>
                            
                            <div className="flex flex-col mt-5">
                                <label htmlFor="">Product Description</label>
                                <textarea name="" className="w-full bg-transparent border-2 border-slate-300 p-2 rounded-lg" placeholder="Description" id=""></textarea>
                            </div>


                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}