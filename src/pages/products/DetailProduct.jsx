import { useState } from "react";
import Navbar from "../../components/Navbar";
import { ShoppingCartIcon } from "lucide-react";

export default function DetailProduct(){
    
    const [activeTab, setActiveTab] = useState('description')

    return(
        <>
            <Navbar/>
            <main className="bg-white min-h-screen ">
                <div className="pt-24 container mx-auto flex gap-5 flex-col sm:flex-row">
                    {/* Left */}
                    <div className="sm:w-1/3 flex flex-col gap-2">
                        <div className="">
                            <img src="../public/assets/batik.jpg" className="h-96 object-cover w-full rounded-xl" alt="" />
                        </div>
                        <div className="flex gap-4">
                            {[1,2,3,4].map((img) => (
                                <div>
                                    <img src="../public/assets/batik.jpg" className="rounded-xl w-28 h-20 object-cover" alt="" />
                                </div>
                            ))}
                        </div>

                        <p className="text-slate-700 font-semibold mt-16">Rating & Review</p>
                    </div>

                    {/* Middle */}
                    <div className="sm:w-1/3 flex flex-col">
                        <div className="py-2 px-9 flex flex-col text-black">
                            <h2 className="text-black text-3xl font-medium">Blouse Batik Kombinasi</h2>
                            <div className="flex text-black gap-10 mt-2">
                                <p>4.9</p>
                                <p>2.5K+ Reviews</p>
                                <p>100 Sold</p>
                            </div>
                            
                            <div className="mt-7">
                                <p>Choose Size</p>
                                <div className="flex gap-3">
                                    {[1,2,3,4].map((size) => (
                                        <div className="mt-4">
                                            <button className="bg-transparent border border-slate-300">L</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    {[1,2].map((size) => (
                                        <div className="mt-4">
                                            <button className="bg-transparent border border-slate-300">Merah Motif</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-7 text-black flex gap-9 border-b border-slate-200">
                                <button onClick={() => setActiveTab('description')} className={`pb-3 bg-transparent ${activeTab === 'description' ? 'border-b border-b-[#BD9034] text-[#BD9034]' : '' }`}>Description</button>
                                <button onClick={() => setActiveTab('review')} className={`pb-3 bg-transparent ${activeTab === 'review' ? 'border-b border-b-[#BD9034] text-[#BD9034]' : '' } `}>Review</button>
                            </div>

                            {/* Description */}
                            {activeTab === 'description' && (
                                <div className="mt-2 ">
                                    <p className="text-slate-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illo harum beatae. Dolorem ducimus aperiam, vero nemo aliquid sed nobis saepe, officiis exercitationem praesentium voluptate repellendus laboriosam commodi. Iusto, molestiae.</p>
                                </div>
                            )}

                            {/* Review */}
                            {activeTab === 'review' && (
                                <div className="flex flex-col mt-5 ">
                                <div className="flex gap-3 items-center">
                                    <img src="../public/assets/batik.jpg" className="w-10 h-10 rounded-full object-cover" alt="" />
                                    <p>Revan</p>
                                </div>
                                <div className="flex mt-2 text-yellow-500">
                                    {/* SVG Bintang */}
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09L5.5 12.6.5 8.41l6.096-.89L10 2l3.404 5.52L19.5 8.41 14.5 12.6l1.378 5.49z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, corrupti maxime repudiandae sint rem iusto! Dolor eligendi quidem fuga, voluptatem quod consequuntur, dicta, tempore iste hic quam unde at eius.</p>
                            </div>
                            )}

                        </div>
                    </div>

                    {/* Right */}
                    <div className="sm:w-fit h-fit text-black flex flex-col p-8 border shadow-lg rounded-lg">
                        <p>Set Order</p>
                        <div className="flex gap-4 mt-5">
                            <img src="public/assets/batik.jpg" className="w-24 h-24 object-cover" alt="" />
                            <p>Selected Size: <span></span></p>
                        </div>
                        <div className="flex gap-8 mt-6 items-center">
                            <div className="flex items-center gap-3">
                                <button
                                    className="w-8 h-8 flex items-center justify-center text-xl border border-slate-400 bg-transparent rounded"
                                >
                                    -
                                </button>

                                <span className="text-lg font-medium">850</span>

                                <button
                                    className="w-8 h-8 flex items-center justify-center text-xl border border-slate-400 bg-transparent rounded"
                                >
                                    +
                                </button>
                            </div>
                        <p>Stock: <span>850</span></p>
                        </div>
                        <div className="flex flex-col gap-2 mt-20">
                            <button className="bg-[#FDDE6C] hover:bg-[#fdd64a] font-semibold">Buy Now</button>
                            <button className="flex bg-transparent items-center justify-center border-2 gap-2 hover:bg-[#789A48]  hover:text-white text-[#789A48] border-[#789A48]"><ShoppingCartIcon/> Add to Cart</button>
                        </div>
                    </div>

                </div>

            </main>
        </>
    )
}