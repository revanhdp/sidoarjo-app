import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowRightIcon } from "lucide-react";
import Footer from "../components/Footer";

export default function Recipe(){
    return(
        <>
            <Navbar/>
            <main className="bg-white"> 
                {/* Hero BG */}
                <div
                    className="w-full h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-white px-4 text-center"
                    style={{ backgroundImage: "url('/assets/bg_recipe.png')" }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    Fuel your body & soul – <br className="hidden sm:block" />
                    find recipes that taste amazing!
                    </h1>

                    <div className="bg-white w-full max-w-xl rounded-full px-5 py-2 flex items-center shadow-md mt-2">
                    <svg
                        className="w-5 h-5 text-gray-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2a7 7 0 010 14z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by dish, ingredient, ……"
                        className="flex-grow outline-none bg-white text-gray-700 placeholder:text-gray-400"
                    />
                    </div>
                </div>
                {/* Section 2 - Popular Category */}
                <section className="container mx-auto w-full mt-20">
                    <p className="text-slate-800 text-2xl font-bold">Popular Category</p>
                    <div className="flex justify-center gap-40 mt-8">
                        {[1,2,3,4].map((x) => (
                            <div key={x} className="flex flex-col gap-3 items-center cursor-pointer " >
                                <img src="../assets/tofu.jpg" className="w-72 object-cover rounded-full border shadow-lg" alt="" />
                                <p className="text-slate-800">Dessert</p>
                            </div>
                        ))}

                    </div>
                </section>

                {/* Section 3 - Explore Recipes */}
                <section className="container mx-auto w-full mt-20">
                    <p className="text-slate-800 text-2xl font-bold">Explore Recipes</p>
                    <div className="flex gap-10 mt-8 shadow-sm">
                        <img src="../assets/bg-home.jpg" className="w-1/3" alt="" />
                        <div className="w-2/3 flex flex-col gap-6">
                            <p className="text-5xl text-slate-700">Delicious, Cultural, and balanced for Modern Living</p>
                            <p className="text-lg text-slate-700">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus vel velit hic amet consequatur sequi sint pariatur. Praesentium voluptates possimus debitis quia modi recusandae in? Architecto amet cumque inventore. Officiis!</p>
                            <Link to="/recipe-categories" className={`py-2 px-0 text-slate-700 flex gap-3`}>
                                Recipes <ArrowRightIcon/>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section 4 - Trending Recipes*/}
                <section className="container mx-auto w-full mt-20 pb-20">
                    <p className="text-slate-800 text-2xl font-bold">Trending Recipes</p>
                    <div className="flex gap-3 flex-row flex-wrap md:flex-nowrap mt-6">
                        {[1, 2, 3].map((x) => (
                            <div key={x} className="flex flex-col border rounded-sm overflow-hidden basis-[calc(50%-0.5rem)] md:basis-[calc(33%-0.75rem)]">
                                <img src="../assets/tofu.jpg" className="w-full" alt="" />
                                <div className="p-5 flex flex-col gap-3">
                                    <p className="text-slate-600 font-semibold">Jamu Kunyit asam</p>
                                    <p className="text-slate-600 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptas, consectetur quo nihil magnam veniam expedita impedit tempora vel est, perspiciatis vitae pariatur temporibus sit quas corporis suscipit. Nulla, pariatur?</p>
                                </div>
                            </div>
                            ))}
                        </div>
                </section>
            <Footer/>
            </main>
            
            
        </>
    )
}